/**
 * Typing File
 * For storing relevant TypeScript types
 *
 * /types/UserLoginResponse.d.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { AuthTokenContents } from "./AuthTokenContents";

export interface UserLoginResponse extends AuthTokenContents {
    accessToken : string;
}
