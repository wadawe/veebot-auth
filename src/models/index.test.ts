/**
 * Test file
 * Contains tests relevant to specific functionality
 *
 * /models/index.test.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { expect } from "chai";
import { readdirSync } from "fs";
import * as databaseModelList from "../models";
import { DatabaseModelName } from "../types/DatabaseModelName";

/**
 * Test the related file contents
 */
describe( "GIVEN: /models/index", () => {

    describe( "WHEN: export", () => {

        it( "THEN: expect to export all model files", () => {
            const exportKeys = Object.keys( databaseModelList );
            readdirSync( `${ __dirname }/` ).filter( ( fileName ) => {
                return fileName.endsWith( ".model.ts" );
            } ).forEach( ( fileName ) => {
                const modelName : DatabaseModelName = fileName.replace( ".model.ts", "" ) as DatabaseModelName;
                expect( exportKeys ).to.contain( modelName );
            } );
        } );

    } );

} );
