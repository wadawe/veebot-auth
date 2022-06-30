/**
 * Test file
 * Contains tests relevant to specific functionality
 *
 * /functions/getTimeString.test.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { expect } from "chai";
import { getTimeString } from "./getTimeString.function";

/**
 * Test the related file contents
 */
describe( "GIVEN: /functions/getTimeString.function", () => {

    describe( "WHEN: getTimeString()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( getTimeString ).to.be.a( "function" );
        } );

        it( "THEN: expect to return a 'string' with parameters ()", () => {
            expect( getTimeString() ).to.be.a( "string" );
        } );

        it( "THEN: expect to return a 'string' with parameters ( new Date() )", () => {
            expect( getTimeString( new Date() ) ).to.be.a( "string" );
        } );

        it( "THEN: expect to return a 'string' with parameters ( null, \"-\" )", () => {
            expect( getTimeString( null, "-" ) ).to.be.a( "string" );
        } );

        it( "THEN: expect to return '100100' with parameters ( new Date( 2021, 0, 1, 10 ) )", () => {
            expect( getTimeString( new Date( 2021, 0, 1, 10 ) ) ).to.equal( "100100" );
        } );

        it( "THEN: expect to return '101100' with parameters ( new Date( 2021, 0, 1, 10, 10 ) )", () => {
            expect( getTimeString( new Date( 2021, 0, 1, 10, 10 ) ) ).to.equal( "101100" );
        } );

        it( "THEN: expect to return '101110' with parameters ( new Date( 2021, 0, 1, 10, 10, 10 ) )", () => {
            expect( getTimeString( new Date( 2021, 0, 1, 10, 10, 10 ) ) ).to.equal( "101110" );
        } );

        it( "THEN: expect to return '10:01:00' with parameters ( new Date( 2021, 0, 1, 10 ), \":\" )", () => {
            expect( getTimeString( new Date( 2021, 0, 1, 10 ), ":" ) ).to.equal( "10:01:00" );
        } );

        it( "THEN: expect to return '10:11:00' with parameters ( new Date( 2021, 0, 1, 10, 10 ), \":\" )", () => {
            expect( getTimeString( new Date( 2021, 0, 1, 10, 10 ), ":" ) ).to.equal( "10:11:00" );
        } );

        it( "THEN: expect to return '10:11:10' with parameters ( new Date( 2021, 0, 1, 10, 10, 10 ), \":\" )", () => {
            expect( getTimeString( new Date( 2021, 0, 1, 10, 10, 10 ), ":" ) ).to.equal( "10:11:10" );
        } );

    } );

} );
