/**
 * Test file
 * Contains tests relevant to specific functionality
 *
 * /functions/getDateDifference.test.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { expect } from "chai";
import { getDateDifference } from "./getDateDifference.function";

/**
 * Test the related file contents
 */
describe( "GIVEN: /functions/getDateDifference.function", () => {

    describe( "WHEN: getDateDifference()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( getDateDifference ).to.be.a( "function" );
        } );

        it( "THEN: expect to return a 'string' with example parameters []", () => {
            expect( getDateDifference() ).to.be.a( "string" );
        } );

        it( "THEN: expect to return '720h 00m 00s' with example parameters [ new Date( 2021, 10 ), new Date( 2021, 11 ) ]", () => {
            expect( getDateDifference( new Date( 2021, 10 ), new Date( 2021, 11 ) ) ).to.equal( "720h 00m 00s" );
        } );

        it( "THEN: expect to return '8784h 00m 00s' with example parameters [ new Date( 2020, 1, 1 ), new Date( 2021, 1, 1 ) ]", () => {
            expect( getDateDifference( new Date( 2020, 1, 1 ), new Date( 2021, 1, 1 ) ) ).to.equal( "8784h 00m 00s" );
        } );

    } );

} );
