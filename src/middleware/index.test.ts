/**
 * Test file
 * Contains tests relevant to specific functionality
 *
 * /middleware/index.test.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { expect } from "chai";
import { readdirSync } from "fs";
import * as middlewareList from "../middleware";
import { MiddlewareName } from "../global-types";

/**
 * Test the related file contents
 */
describe( "GIVEN: /middleware/index", () => {

    describe( "WHEN: export", () => {

        it( "THEN: expect to export all middleware files", () => {
            const exportKeys = Object.keys( middlewareList );
            readdirSync( `${ __dirname }/` ).filter( ( fileName ) => {
                return fileName.endsWith( ".middleware.ts" );
            } ).forEach( ( fileName ) => {
                const middlewareFunction : MiddlewareName = fileName.replace( ".middleware.ts", "" ) as MiddlewareName;
                expect( exportKeys ).to.contain( middlewareFunction );
            } );
        } );

    } );

} );
