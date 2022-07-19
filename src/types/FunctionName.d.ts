/**
 * Typing File
 * For storing relevant TypeScript types
 *
 * /types/FunctionName.d.ts
 *
 * Copyright (C) 2022 wadawe
 */

import * as functionList from "../functions";

export type FunctionName = keyof typeof functionList;
