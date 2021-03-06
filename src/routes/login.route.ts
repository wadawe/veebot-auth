/**
 * Express route file
 * For routing express application requests
 *
 * /routes/login.route.ts
 *
 * Copyright (C) 2022 wadawe
 */

import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { sign } from "jsonwebtoken";
import { Router, Request, Response } from "express";
import { secretsConfig, serviceConfig } from "../config";
import { Login, User } from "../models";
import { logError } from "../common";
import { DiscordsTokenResponse } from "../types/DiscordsTokenResponse";
import { UserLoginResponse } from "../types/UserLoginResponse";
import { DiscordsUserResponse } from "../types/DiscordsUserResponse";
import { AuthTokenContents } from "../types/AuthTokenContents";

const router = Router( { mergeParams: true } );

/**
 * Get the router for this endpoint
 * @returns The endpoint router
 */
export const getRouter = () : Router => {
    return router;
};

/**
 * Handle POST requests : /login
 */
router.post( "/", [ /* middleware functions */ ], ( req : Request, res : Response ) => {

    // Verify auth code
    if ( ! req.body.code ) {
        return res.status( 400 ).json( { response: "Missing authorisation code" } );
    }

    // Make token request
    axios.post( "https://discord.com/api/oauth2/token", new URLSearchParams( {
        client_id: secretsConfig.ENV_BOT_CLIENT_ID,
        client_secret: secretsConfig.ENV_BOT_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: req.body.code,
        redirect_uri: `${ serviceConfig.websiteUrl }/login`
    } ), { headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    } } ).then( ( tokenResponse : AxiosResponse<DiscordsTokenResponse> ) => {

        // Verify scope
        const tokenScope = tokenResponse.data.scope.split( " " );
        for ( const loginScope in serviceConfig.loginScope ) {
            if ( ! ( loginScope in tokenScope ) ) {
                return res.status( 400 ).json( { response: `Login missing scope: ${ loginScope }` } );
            }
        }

        // Make identfy request
        axios.get( "https://discordapp.com/api/users/@me", { headers: {
            Authorization: `Bearer ${ tokenResponse.data.access_token }`
        } } ).then( async ( userResponse : AxiosResponse<DiscordsUserResponse> ) => {

            // Get user data
            const tokenContent : AuthTokenContents = {
                id: userResponse.data.id,
                username: userResponse.data.username.length > 32 ? `${ userResponse.data.username.substring( 0, 30 ) }...` : userResponse.data.username,
                discriminator: userResponse.data.discriminator,
                avatar: userResponse.data.avatar,
                locale: userResponse.data.locale || "en-GB",
                discordToken: tokenResponse.data.access_token
            };

            // Get stored user
            const user = await getUser( userResponse.data.id );
            if ( ! user ) {
                return res.status( 500 ).json( { response: "Failed to retrieve user from database" } );
            }

            // Create access token
            const accessToken = sign(
                tokenContent,
                secretsConfig.ENV_USER_ACCESS_SECRET,
                { expiresIn: `${ serviceConfig.accessExpiry }s` }
            );

            // Create refresh token
            const refreshToken = sign(
                tokenContent,
                secretsConfig.ENV_USER_REFRESH_SECRET,
                { expiresIn: `${ serviceConfig.refreshExpiry }s` }
            );

            // Save refresh token
            const expiresAt = moment( new Date() ).add( serviceConfig.refreshExpiry, "seconds" ).toDate();
            const login = Login.create( { userId: user.id, refreshToken, expiresAt } ).catch( logError );
            if ( ! login ) {
                return res.status( 500 ).json( { response: "Failed to store refresh token" } );
            }

            // Set refresh token cookie
            res.cookie( "VB_REFRESH", refreshToken, {
                httpOnly: true,
                maxAge: serviceConfig.refreshExpiry * 1000,
                secure: serviceConfig.secureRequests
            } );

            // Create and send response
            const responseContent : UserLoginResponse = {
                id: tokenContent.id,
                username: tokenContent.username,
                discriminator: tokenContent.discriminator,
                avatar: tokenContent.avatar,
                locale: tokenContent.locale,
                discordToken: tokenContent.discordToken,
                accessToken
            };
            return res.status( 200 ).json( responseContent );

        } ).catch( () => {
            return res.status( 500 ).json( { response: "Failed to identify user with Discord" } );
        } );

    } ).catch( () => {
        return res.status( 400 ).json( { response: "Invalid login code, please try again" } );
    } );

} );

/**
 * Get a saved user data
 * @param userId The id of the user
 * @returns The saved user data
 */
const getUser = async ( userId : string ) : Promise<User | void> => {

    // Get saved user
    let savedUser = await User.findOne( { where: { userId } } ).catch( logError );

    // Verify saved user
    if ( ! savedUser ) {

        // Create saved channel
        savedUser = await User.create( { userId } ).catch( logError );

    }

    // Return saved user
    return savedUser;

};
