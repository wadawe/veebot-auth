/**
 * Root File
 * For starting the client application
 *
 * /index.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { authConfig } from "./config";
import { getLogger, getConnection, getApp, logInfo, logFatal } from "./common";

// Create the logger instance
getLogger( `${ authConfig.env }` );
logInfo( `STARTING SERVER : ${ authConfig.env }` );

// Connect to the data store
getConnection().then( async () => {

    // Start express server
    getApp();

} ).catch( logFatal );
