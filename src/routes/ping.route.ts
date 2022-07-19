/**
 * Express route file
 * For routing express application requests
 *
 * /routes/ping.route.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { Router, Request, Response } from "express";

const router = Router();

/**
 * Get the router for this endpoint
 * @returns The endpoint router
 */
export const getRouter = () : Router => {
    return router;
};

/**
 * Handle ALL requests : /ping
 */
router.all( "/", [ /* middleware functions */ ], ( req : Request, res : Response ) => {
    return res.status( 200 ).send( { response: "Pong" } );
} );
