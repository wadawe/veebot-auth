/**
 * Test file
 * Contains tests relevant to specific functionality
 *
 * /functions/padNumber.test.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { expect } from "chai";
import { padNumber } from "./padNumber.function";

/**
 * Test the related file contents
 */
describe( "GIVEN: /functions/padNumber.function", () => {

    describe( "WHEN: padNumber()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( padNumber ).to.be.a( "function" );
        } );

        it( "THEN: expect to return a 'string' with parameters ( 1, 1 )", () => {
            expect( padNumber( 1, 1 ) ).to.be.a( "string" );
        } );

        it( "THEN: expect to return '1' with parameters ( 1, 1 )", () => {
            expect( padNumber( 1, 1 ) ).to.equal( "1" );
        } );

        it( "THEN: expect to return '01' with parameters ( 1, 2 )", () => {
            expect( padNumber( 1, 2 ) ).to.equal( "01" );
        } );

        it( "THEN: expect to return '001' with parameters ( 1, 3 )", () => {
            expect( padNumber( 1, 3 ) ).to.equal( "001" );
        } );

        it( "THEN: expect to return '99' with parameters ( 99, 1 )", () => {
            expect( padNumber( 99, 1 ) ).to.equal( "99" );
        } );

    } );

} );
