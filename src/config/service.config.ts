/**
 * Service config file
 * For storing service configuration details
 * New configs need to be added to the config/index.ts file
 *
 * /config/service.config.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { ProjectEnvironment } from "../global-types";

type ServiceConfig = {
    production : ServiceConfigStructure;
    development : Partial<ServiceConfigStructure>;
    test : Partial<ServiceConfigStructure>;
};

type ServiceConfigStructure = {
    websiteUrl : string;
    loginScope : string[];
    accessExpiry : number;
    refreshExpiry : number;
    logLevel : string;
    expressPort : number;
    secureRequests : boolean;
    forceDatabaseUpdate : boolean;
    forceDatabaseReset : boolean;
};

/**
 * The service configuration
 */
const config : ServiceConfig = {

    production: {

        websiteUrl: "https://veebot.app",
        loginScope: [ "guilds", "identify" ],

        accessExpiry: 600,
        refreshExpiry: 86400,

        logLevel: "INFO",
        expressPort: 3003,
        secureRequests: true,

        forceDatabaseUpdate: false,
        forceDatabaseReset: false

    },

    development: {
        websiteUrl: "http://localhost:3000",
        accessExpiry: 10,
        refreshExpiry: 30,
        logLevel: "ALL",
        secureRequests: false,
        forceDatabaseUpdate: true
    },

    test: {
        websiteUrl: "http://localhost:3000",
        logLevel: "ALL",
        secureRequests: false,
        forceDatabaseReset: true
    }

};

// Generate the exported config
// Based on the current environment
const env = process.env.NODE_ENV as ProjectEnvironment || "production";
export const serviceConfig : ServiceConfigStructure & { env : ProjectEnvironment } = {
    env: env,
    ... config.production,
    ... config[ env ]
};
