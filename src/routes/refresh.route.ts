/**
 * Express route file
 * For routing express application requests
 * New routes need to be added to the routes/index.ts file
 *
 * /routes/ping.route.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { Router, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { logError } from "../common";
import { secretsConfig } from "../config";
import { AccessResponse, TokenContent } from "../global-types";
import { Login } from "../models";

const router = Router();

/**
 * Get the router for this endpoint
 * @returns The endpoint router
 */
export const getRouter = () : Router => {
    return router;
};

/**
 * Handle GET requests : /refresh
 */
router.get( "/", [ /* middleware functions */ ], async ( req : Request, res : Response ) => {

    // Verify refresh cookie
    if ( ! req.cookies?.refresh ) {
        return res.status( 401 ).json( { response: "Missing refresh cookie." } );
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
        return res.status( 401 ).json( { response: "Invalid refresh cookie." } );
    }

    // Verify refresh token
    verify( refreshToken, secretsConfig.ENV_REFRESH_SECRET, ( error, result ) => {

        // Verify error
        if ( error ) {
            return res.status( 403 ).json( { response: "Invalid refresh token." } );
        }

        // Compare refresh token to login
        const resultContent = result as TokenContent;
        if ( resultContent.id !== login.User?.userId ) {
            return res.status( 403 ).json( { response: "Invalid user login." } );
        }

        // Create access token
        const accessToken = sign(
            { id: resultContent.id } as TokenContent,
            secretsConfig.ENV_ACCESS_SECRET,
            { expiresIn: "30m" }
        );

        // Return access token
        return res.status( 200 ).json( { id: resultContent.id, accessToken } as AccessResponse );

    } );

} );