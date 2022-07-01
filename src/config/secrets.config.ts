/**
 * Secrets config file
 * For storing secret configuration details
 * New configs need to be added to the config/index.ts file
 *
 * /config/secrets.config.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { getDateString, getTimeString } from "../functions";
import { ProjectEnvironment } from "../global-types";

type SecretsConfig = {
    production : SecretsConfigStructure;
    development : Partial<SecretsConfigStructure>;
    test : Partial<SecretsConfigStructure>;
};

type SecretsConfigStructure = {
    ENV_BOT_CLIENT_ID : string;
    ENV_BOT_CLIENT_SECRET : string;
    ENV_DATABASE_HOST : string;
    ENV_DATABASE_USER : string;
    ENV_DATABASE_PASS : string;
    ENV_DATABASE_DIALECT : string;
    ENV_DATABASE_TABLE : string;
    ENV_DATABASE_PORT : number;
    ENV_DATABASE_CONNS : number;
    ENV_DATABASE_FILE : string;
    ENV_ACCESS_SECRET : string;
    ENV_REFRESH_SECRET : string;
};

/**
 * The secrets configuration
 */
const config : SecretsConfig = {

    production: {

        ENV_BOT_CLIENT_ID: process.env.ENV_BOT_CLIENT_ID || "",
        ENV_BOT_CLIENT_SECRET: process.env.ENV_BOT_CLIENT_SECRET || "",

        ENV_DATABASE_HOST: process.env.ENV_DATABASE_HOST || "localhost",
        ENV_DATABASE_USER: process.env.ENV_DATABASE_USER || "user",
        ENV_DATABASE_PASS: process.env.ENV_DATABASE_PASS || "pass",
        ENV_DATABASE_TABLE: process.env.ENV_DATABASE_TABLE || "rcbot",
        ENV_DATABASE_DIALECT: process.env.ENV_DATABASE_DIALECT || "sqlite",
        ENV_DATABASE_PORT: parseInt( process.env.ENV_DATABASE_PORT || "3306" ),
        ENV_DATABASE_CONNS: parseInt( process.env.ENV_DATABASE_CONNS || "10" ),
        ENV_DATABASE_FILE: process.env.ENV_DATABASE_FILE || "./.sql",

        ENV_ACCESS_SECRET: process.env.ENV_ACCESS_SECRET || "1234567890",
        ENV_REFRESH_SECRET: process.env.ENV_REFRESH_SECRET || "0987654321"

    },

    development: {},

    test: {
        ENV_DATABASE_FILE: process.env.ENV_DATABASE_FILE || `./sql/.sql_${ getDateString() }_${ getTimeString() }`
    }

};

// Generate the exported config
// Based on the current environment
const env = process.env.NODE_ENV as ProjectEnvironment || "production";
export const secretsConfig : SecretsConfigStructure = {
    ... config.production,
    ... config[ env ]
};
