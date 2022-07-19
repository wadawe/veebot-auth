/**
 * Typing File
 * For storing relevant TypeScript types
 *
 * /types/AuthTokenContents.d.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { DiscordsUserResponse } from "./DiscordsUserResponse";

export interface AuthTokenContents extends DiscordsUserResponse {
    locale : string;
    discordToken : string;
}
