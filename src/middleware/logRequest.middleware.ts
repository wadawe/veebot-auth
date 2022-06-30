/**
 * Middleware file
 * For defining an express Middleware function
 * New middleware functions need to be added to the middleware/index.ts file
 *
 * /middleware/logRequest.middleware.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { Request, Response, NextFunction } from "express";
import { logDebug, logTrace } from "../common";

/**
 * Log an express request
 * @param req An express request object
 * @param res An express response object
 * @param next The express callback function
 */
export const logRequest = ( req : Request, res : Response, next : NextFunction ) => {

    // Log the request
    const route = `${ req.method } ( ${ req.headers.host }${ req.path } )`;
    logDebug( `REQUEST > ${ route } query : ${ JSON.stringify( req.query, null, 2 ) }, body : ${ JSON.stringify( req.body, null, 2 ) }` );

    // Log the response
    res.on( "finish", () => {
        logTrace( `REQUEST > ${ route } response : ${ res.statusCode }` );
    } );

    // Continue the route
    next();

};
