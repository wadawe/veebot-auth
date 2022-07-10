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
import { secretsConfig, serviceConfig } from "../config";
import { LoginResponse, TokenContent } from "../global-types";
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
 * Handle GET requests : /refresh/:userId
 */
router.get( "/:userId", [ /* middleware functions */ ], async ( req : Request, res : Response ) => {

    // Verify user id
    if ( ! req.params.userId || isNaN( Number( req.params.userId ) ) ) {
        return res.status( 400 ).json( { response: "Invalid user id" } );
    }

    // Verify refresh cookie
    if ( ! req.cookies?.VB_REFRESH ) {
        return res.status( 400 ).json( { response: "Missing refresh cookie" } );
    }

    // Get refresh token
    const refreshToken : string = req.cookies.VB_REFRESH;
    const userId : string = req.params.userId;

    // Get user login
    const login = await Login.findOne( {
        where: {
            refreshToken,
            invalidated: false
        }, include: [
            { model: Login.associations.User.target, as: Login.associations.User.as, required: true }
        ]
    } ).catch( logError );

    // Verify login
    if ( ! login || ! login.User ) {
        return res.status( 400 ).json( { response: "Invalid refresh cookie" } );
    }

    // Verify refresh token
    verify( refreshToken, secretsConfig.ENV_REFRESH_SECRET, ( error, result ) => {

        // Verify error
        if ( error ) {
            return res.status( 403 ).json( { response: "Invalid refresh token" } );
        }

        // Compare refresh token to login
        const resultContent = result as TokenContent;
        if ( resultContent.id !== userId ) {
            return res.status( 400 ).json( { response: "Invalid user login" } );
        }

        // Define access token contents
        const tokenContent : TokenContent = {
            id: resultContent.id,
            username: resultContent.username,
            discriminator: resultContent.discriminator,
            avatar: resultContent.avatar,
            locale: resultContent.locale,
            discordToken: resultContent.discordToken
        };

        // Create access token
        const accessToken = sign(
            tokenContent as TokenContent,
            secretsConfig.ENV_ACCESS_SECRET,
            { expiresIn: `${ serviceConfig.accessExpiry }s` }
        );

        // Create and send response
        const responseContent : LoginResponse = {
            ... tokenContent,
            accessToken
        };
        return res.status( 200 ).json( responseContent );

    } );

} );
