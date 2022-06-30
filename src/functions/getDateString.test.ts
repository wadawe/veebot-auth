/**
 * Test file
 * Contains tests relevant to specific functionality
 *
 * /functions/getDateString.test.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { expect } from "chai";
import { getDateString } from "./getDateString.function";

/**
 * Test the related file contents
 */
describe( "GIVEN: /functions/getDateString.function", () => {

    describe( "WHEN: getDateString()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( getDateString ).to.be.a( "function" );
        } );

        it( "THEN: expect to return a 'string' with parameters ()", () => {
            expect( getDateString() ).to.be.a( "string" );
        } );

        it( "THEN: expect to return a 'string' with parameters ( new Date() )", () => {
            expect( getDateString( new Date() ) ).to.be.a( "string" );
        } );

        it( "THEN: expect to return a 'string' with parameters ( null, \"-\" )", () => {
            expect( getDateString( null, "-" ) ).to.be.a( "string" );
        } );

        it( "THEN: expect to return '20211101' with parameters ( new Date( 2021, 10 ) )", () => {
            expect( getDateString( new Date( 2021, 10 ) ) ).to.equal( "20211101" );
        } );

        it( "THEN: expect to return '20211111' with parameters ( new Date( 2021, 10, 11 ) )", () => {
            expect( getDateString( new Date( 2021, 10, 11 ) ) ).to.equal( "20211111" );
        } );

        it( "THEN: expect to return '2021-11-01' with parameters ( new Date( 2021, 10 ), \"-\" )", () => {
            expect( getDateString( new Date( 2021, 10 ), "-" ) ).to.equal( "2021-11-01" );
        } );

        it( "THEN: expect to return '2021-11-10' with parameters ( new Date( 2021, 10, 10 ), \"-\" )", () => {
            expect( getDateString( new Date( 2021, 10, 10 ), "-" ) ).to.equal( "2021-11-10" );
        } );

    } );

} );
