/**
 * Test file
 * Contains tests relevant to specific functionality
 *
 * /functions/index.test.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { expect } from "chai";
import { readdirSync } from "fs";
import * as functionList from ".";
import { FunctionName } from "../types/FunctionName";

/**
 * Test the related file contents
 */
describe( "GIVEN: /functions/index", () => {

    describe( "WHEN: export", () => {

        it( "THEN: expect to export all function files", () => {
            const exportKeys = Object.keys( functionList );
            readdirSync( `${ __dirname }/` ).filter( ( fileName ) => {
                return fileName.endsWith( ".function.ts" );
            } ).forEach( ( fileName ) => {
                const functionName : FunctionName = fileName.replace( ".function.ts", "" ) as FunctionName;
                expect( exportKeys ).to.contain( functionName );
            } );
        } );

    } );

} );
