/**
 * App server file
 * For starting the express application
 *
 * /common/App.ts
 *
 * Copyright (C) 2022 wadawe
 */

import express, { Express, Router } from "express";
import cors, { CorsOptions } from "cors";
import { json } from "body-parser";
import { logRequest } from "../middleware";
import { logInfo, logDebug } from "../common";
import { serviceConfig } from "../config";
import { Server } from "http";
import cookieParser from "cookie-parser";
import { lstatSync, readdirSync } from "fs";

type ExpressApplication = {
    app : Express;
    connection : Server;
};

/**
 * Get and start the express application
 * @returns An express application and connection
 */
export const getApp = () : ExpressApplication => {

    const app = express();
    const corsOptions = {
        credentials: true,
        origin: [ serviceConfig.websiteUrl ]
    } as CorsOptions;

    app.set( "json spaces", 2 );
    app.use( logRequest );
    app.use( cors( corsOptions ) );
    app.use( json() );
    app.use( cookieParser() );
    app.use( getDirRouter( `${ __dirname }/../routes`, "/api" ) );

    const connection = app.listen( serviceConfig.expressPort, () => {
        logInfo( `API > Ready : ${ serviceConfig.expressPort }` );
        app.emit( "app_started" );
    } );

    return { app, connection };

};

/**
 * Get and assign all of the defined Express routes
 * @param directory The directory to iterate through
 * @param startingRoute The route path to start from
 * @returns An express router
 */
const getDirRouter = ( directory : string, startingRoute : string ) : Router => {

    // List contents of directory
    const router = Router( { mergeParams: true } );
    const dirFiles = readdirSync( directory );

    // Iterate directory contents
    for ( const fileName of dirFiles ) {

        const filePath = `${ directory }/${ fileName }`;
        const fileStats = lstatSync( filePath );

        // Iterate sub-directory
        if ( fileStats.isDirectory() ) {
            const routeName = fileName.replaceAll( "_", ":" );
            const nextRoute = `${ startingRoute }/${ routeName }`;
            router.use( getDirRouter( filePath, nextRoute ) );
        }

        // Load route files
        else if ( fileStats.isFile() && fileName.endsWith( ".route.ts" ) ) {
            const routeName = fileName.replaceAll( "_", ":" ).replace( ".route.ts", "" );
            const nextRoute = `${ startingRoute }/${ routeName }`;
            const routeContents = require( filePath );
            logDebug( `API > Registering route : ${ nextRoute }` );
            router.use( nextRoute, routeContents.getRouter() );
        }

    }

    // Return loaded router
    return router;

};
