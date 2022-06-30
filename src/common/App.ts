/**
 * App server file
 * For starting the express application
 *
 * /common/App.ts
 *
 * Copyright (C) 2022 wadawe
 */

import express, { Express, Router } from "express";
import cors from "cors";
import { json } from "body-parser";
import { logRequest } from "../middleware";
import { logInfo, logDebug } from "../common";
import * as expressRouteList from "../routes";
import { ExpressRouteName } from "../global-types";
import { authConfig } from "../config";
import { Server } from "http";
import cookieParser from "cookie-parser";

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

    app.set( "json spaces", 2 );
    app.use( logRequest );
    app.use( cors() );
    app.use( json() );
    app.use( cookieParser() );
    app.use( "/api", getRouter() );

    const connection = app.listen( authConfig.expressPort, () => {
        logInfo( `API > Ready : ${ authConfig.expressPort }` );
        app.emit( "app_started" );
    } );

    return { app, connection };

};

/**
 * Get and assign all of the defined Express routes
 * @returns An express router
 */
const getRouter = () : Router => {

    const router = Router();

    for ( const routeName of Object.keys( expressRouteList ) ) {
        logDebug( `API > Registering route : ${ routeName }` );
        router.use( `/${ routeName }`, expressRouteList[ routeName as ExpressRouteName ].getRouter() );
    }

    return router;

};
