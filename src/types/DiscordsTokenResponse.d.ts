/**
 * Typing File
 * For storing relevant TypeScript types
 *
 * /types/DiscordsTokenResponse.d.ts
 *
 * Copyright (C) 2022 wadawe
 */

export interface DiscordsTokenResponse {
    scope : string;
    access_token : string;
    refresh_token : string;
    expires_in : number;
    token_type : string;
}
