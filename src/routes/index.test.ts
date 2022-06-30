/**
 * Test file
 * Contains tests relevant to specific functionality
 *
 * /routes/index.test.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { expect } from "chai";
import { readdirSync } from "fs";
import * as expressRouteList from "../routes";
import { ExpressRouteName } from "../global-types";

/**
 * Test the related file contents
 */
describe( "GIVEN: /routes/index", () => {

    describe( "WHEN: export", () => {

        it( "THEN: expect to export all route files", () => {
            const exportKeys = Object.keys( expressRouteList );
            readdirSync( `${ __dirname }/` ).filter( ( fileName ) => {
                return fileName.endsWith( ".route.ts" );
            } ).forEach( ( fileName ) => {
                const routeName : ExpressRouteName = fileName.replace( ".route.ts", "" ) as ExpressRouteName;
                expect( exportKeys ).to.contain( routeName );
            } );
        } );

    } );

} );
