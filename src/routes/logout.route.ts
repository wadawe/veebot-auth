/**
 * Express route file
 * For routing express application requests
 * New routes need to be added to the routes/index.ts file
 *
 * /routes/logout.route.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { Router, Request, Response } from "express";
import { serviceConfig } from "../config";
import { Login } from "../models";
import { logError } from "../common";

const router = Router();

/**
 * Get the router for this endpoint
 * @returns The endpoint router
 */
export const getRouter = () : Router => {
    return router;
};

/**
 * Handle GET requests : /logout
 */
router.get( "/", [ /* middleware functions */ ], async ( req : Request, res : Response ) => {

    // Verify refresh cookie
    if ( ! req.cookies?.refresh ) {
        return res.status( 204 ).json( { response: "No refresh token." } );
    }

    // Get refresh token
    const refreshToken : string = req.cookies.refresh;

    // Get user login
    const login = await Login.findOne( {
        where: { refreshToken }, include: [
            { model: Login.associations.User.target, as: Login.associations.User.as, required: true }
        ]
    } ).catch( logError );

    // Verify login
    if ( ! login || ! login.User ) {
        res.clearCookie( "refresh", { httpOnly: true, maxAge: serviceConfig.refreshExpiry * 24 * 60 * 60 * 1000 } );
        return res.status( 401 ).json( { response: "Invalid refresh cookie." } );
    }

    // Update user login
    const updatedLogin = await login.update( { deleted: true } ).catch( logError );
    if ( ! updatedLogin ) {
        return res.status( 401 ).json( { response: "Failed to invalidate refresh token." } );
    }

    // Return success response
    res.clearCookie( "refresh", { httpOnly: true, maxAge: serviceConfig.refreshExpiry * 24 * 60 * 60 * 1000 } );
    return res.status( 200 ).json( { response: "Logged out." } );

} );
