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

export type ProjectEnvironment = "production" | "development" | "test";

export type DatabaseModelName = keyof typeof databaseModelList;

export type ExpressRouteName = keyof typeof expressRouteList;

export type MiddlewareName = keyof typeof middlewareList;

export type FunctionName = keyof typeof functionList;

export type TokenData = {
    scope : string;
    access_token : string;
    refresh_token : string;
    expires_in : number;
    token_type : string;
}

export type TokenContent = {
    id : string;
};

export type AccessResponse = {
    id : string;
    accessToken : string;
};
