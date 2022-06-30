/**
 * Test file
 * Contains tests relevant to specific functionality
 *
 * /common/Database.test.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { expect } from "chai";
import { getConnection } from "./Database";

/**
 * Test the related file contents
 */
describe( "GIVEN: /common/Database", () => {

    describe( "WHEN: getConnection()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( getConnection ).to.be.a( "function" );
        } );

        it( "THEN: expect to resolve the same 'Connection' with parameters ()", async () => {
            expect( await getConnection() ).to.deep.equal( await getConnection() );
        } );

    } );

} );
