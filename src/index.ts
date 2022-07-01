/**
 * Root File
 * For starting the client application
 *
 * /index.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { serviceConfig } from "./config";
import { getLogger, getConnection, getApp, logInfo, logFatal } from "./common";

// Create the logger instance
getLogger( `${ serviceConfig.env }` );
logInfo( `STARTING SERVER : ${ serviceConfig.env }` );

// Connect to the data store
getConnection().then( async () => {

    // Start express server
    getApp();

} ).catch( logFatal );
