/**
 * Typing File
 * For storing relevant TypeScript types
 *
 * /global-types.d.ts
 *
 * Copyright (C) 2022 wadawe
 */

import * as databaseModelList from "./models";
import * as expressRouteList from "./routes";
import * as middlewareList from "./middleware";
import * as functionList from "./functions";

// Auth | Client | Server | Website
export type ProjectEnvironment = "production" | "development" | "test";

// Auth | Client | Server
export type DatabaseModelName = keyof typeof databaseModelList;

// Auth | Client | Server
export type ExpressRouteName = keyof typeof expressRouteList;

// Auth | Client | Server
export type MiddlewareName = keyof typeof middlewareList;

// Auth | Client | Server
export type FunctionName = keyof typeof functionList;

// Auth
export interface DiscordTokenResponse {
    scope : string;
    access_token : string;
    refresh_token : string;
    expires_in : number;
    token_type : string;
}

// Auth | Server | Website
export interface DiscordUserResponse {
    id : string;
    username : string;
    discriminator : string;
    avatar : string;
    locale ?: string;
}

// Auth | Server | Website
export interface AuthTokenContent extends DiscordUserResponse {
    locale : string;
    discordToken : string;
}

// Auth | Website
export interface UserAuthResponse extends AuthTokenContent {
    accessToken : string;
}
