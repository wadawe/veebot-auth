/**
 * Database utility file
 * For handling all database logic
 *
 * /common/Database.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { Sequelize, Options } from "sequelize";
import { secretsConfig, serviceConfig } from "../config";
import { logInfo, logFatal, logDebug, logTrace } from "../common";
import * as databaseModelList from "../models";
import { DatabaseModelName } from "../global-types";

/**
 * Global connection session
 */
let connection : Sequelize;

/**
 * Get a databse connection
 * @returns A database connection
 */
export const getConnection = async () : Promise<Sequelize> => {

    if ( connection ) { return connection; }

    connection = new Sequelize( {
        database: secretsConfig.ENV_DATABASE_TABLE,
        host: secretsConfig.ENV_DATABASE_HOST,
        username: secretsConfig.ENV_DATABASE_USER,
        password: secretsConfig.ENV_DATABASE_PASS,
        dialect: secretsConfig.ENV_DATABASE_DIALECT,
        port: secretsConfig.ENV_DATABASE_PORT,
        storage: secretsConfig.ENV_DATABASE_FILE,
        requestTimeout: 5000,
        logging: ( msg : string ) : void => {
            logTrace( `QUERY > ${ msg }` );
        },
        dialectOptions: {
            connectTimeout: 5000,
            charset: "utf8"
        },
        pool: {
            max: secretsConfig.ENV_DATABASE_CONNS,
            idle: 5000,
            acquire: 5000
        }
    } as Options );
    await connection.authenticate().catch( logFatal );
    await registerModels();

    logInfo( `DATABASE > Connected : ${ secretsConfig.ENV_DATABASE_DIALECT }` );
    return connection;

};

/**
 * Register all models and associations
 */
const registerModels = async () : Promise<void> => {

    // Register models
    for ( const modelName of Object.keys( databaseModelList ) ) {
        logDebug( `DATABASE > Registering model : ${ modelName }` );
        databaseModelList[ modelName as DatabaseModelName ].registerModel( connection );
    }

    // Register "has" associations
    for ( const modelName of Object.keys( databaseModelList ) ) {
        databaseModelList[ modelName as DatabaseModelName ].registerHas();
    }

    // Register "belongs" associations
    for ( const modelName of Object.keys( databaseModelList ) ) {
        databaseModelList[ modelName as DatabaseModelName ].registerBelongs();
    }

    // Sync the models to the database
    logDebug( "DATABASE > Syncing models" );
    await connection.sync( {
        alter: serviceConfig.forceDatabaseUpdate,
        force: serviceConfig.forceDatabaseReset
    } ).catch( logFatal );

};
