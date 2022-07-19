/**
 * Typing File
 * For storing relevant TypeScript types
 *
 * /types/DiscordsUserResponse.d.ts
 *
 * Copyright (C) 2022 wadawe
 */

export interface DiscordsUserResponse {
    id : string;
    username : string;
    discriminator : string;
    avatar : string;
    locale ?: string;
}
