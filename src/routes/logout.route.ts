/**
 * Express route file
 * For routing express application requests
 *
 * /routes/logout.route.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { Router, Request, Response } from "express";
import { serviceConfig } from "../config";
import { Login } from "../models";
import { logError } from "../common";

const router = Router( { mergeParams: true } );

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
    if ( ! req.cookies?.VB_REFRESH ) {
        return res.status( 204 ).json( { response: "No refresh token" } );
    }

    // Get refresh token
    const refreshToken : string = req.cookies.VB_REFRESH;

    // Get user login
    const login = await Login.findOne( {
        where: { refreshToken }, include: [
            { model: Login.associations.User.target, as: Login.associations.User.as, required: true }
        ]
    } ).catch( logError );

    // Verify login
    if ( ! login || ! login.User ) {
        clearCookie( res );
        return res.status( 205 ).json( { response: "Invalid refresh cookie" } );
    }

    // Update user login
    const updatedLogin = await login.update( { invalidated: true } ).catch( logError );
    if ( ! updatedLogin ) {
        return res.status( 500 ).json( { response: "Failed to invalidate refresh token" } );
    }

    // Return success response
    clearCookie( res );
    return res.status( 200 ).json( { response: "Logged out" } );

} );

/**
 * Clear the refresh cookie
 * @param res The response object
 */
const clearCookie = ( res : Response ) => {

    // Clear the cookie
    res.clearCookie( "VB_REFRESH", {
        httpOnly: true,
        expires: new Date,
        secure: serviceConfig.secureRequests
    } );

};
