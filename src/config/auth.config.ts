/**
 * Auth config file
 * For storing auth configuration details
 * New configs need to be added to the config/index.ts file
 *
 * /config/auth.config.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { ProjectEnvironment } from "../global-types";

type AuthConfig = {
    production : AuthConfigStructure;
    development : Partial<AuthConfigStructure>;
    test : Partial<AuthConfigStructure>;
};

type AuthConfigStructure = {
    logLevel : string;
    expressPort : number;
    forceDatabaseUpdate : boolean;
    forceDatabaseReset : boolean;
};

/**
 * The client configuration
 */
const config : AuthConfig = {

    production: {

        logLevel: "INFO",
        expressPort: 3002,

        forceDatabaseUpdate: false,
        forceDatabaseReset: false

    },

    development: {
        logLevel: "ALL",
        forceDatabaseUpdate: true
    },

    test: {
        logLevel: "ALL",
        forceDatabaseReset: true
    }

};

// Generate the exported config
// Based on the current environment
const env = process.env.NODE_ENV as ProjectEnvironment || "production";
export const authConfig : AuthConfigStructure & { env : ProjectEnvironment } = {
    env: env,
    ... config.production,
    ... config[ env ]
};
