/**
 * Test file
 * Contains tests relevant to specific functionality
 *
 * /functions/sleep.test.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { expect } from "chai";
import { sleep } from "./sleep.function";

/**
 * Test the related file contents
 */
describe( "GIVEN: /functions/sleep.function", () => {

    describe( "WHEN: sleep()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( sleep ).to.be.a( "function" );
        } );

        it( "THEN: expect to return a 'promise' with parameters ( 1 )", () => {
            expect( sleep( 1 ) ).to.be.a( "promise" );
        } );

        it( "THEN: expect to resolve as 'undefined' with parameters ( 1 )", async () => {
            expect( await sleep( 1 ) ).to.be.a( "undefined" );
        } );

    } );

} );
