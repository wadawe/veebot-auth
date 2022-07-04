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
import * as expressRouteList from "../routes";
import { ExpressRouteName } from "../global-types";
import { serviceConfig } from "../config";
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
    const corsOptions = {
        credentials: true,
        origin: [ serviceConfig.websiteUrl ]
    } as CorsOptions;

    app.set( "json spaces", 2 );
    app.use( logRequest );
    app.use( cors( corsOptions ) );
    app.use( json() );
    app.use( cookieParser() );
    app.use( "/api", getRouter() );

    const connection = app.listen( serviceConfig.expressPort, () => {
        logInfo( `API > Ready : ${ serviceConfig.expressPort }` );
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
