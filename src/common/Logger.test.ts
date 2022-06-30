/**
 * Test file
 * Contains tests relevant to specific functionality
 *
 * /common/Logger.test.ts
 *
 * Copyright (C) 2022 wadawe
 */

import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { stub, restore } from "sinon";
import { enableLogger, disableLogger, getLogger, logInfo, logDebug, logTrace, logWarn, logError, logFatal } from "./Logger";
import { authConfig } from "../config";

chai.use( sinonChai );

/**
 * Test the related file contents
 */
describe( "GIVEN: /common/Logger", () => {

    before( () => {
        getLogger( `${ authConfig.env }` );
    } );

    after( () => {
        enableLogger();
    } );

    describe( "WHEN: getLogger()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( getLogger ).to.be.a( "function" );
        } );

        it( "THEN: expect to resolve the same 'Logger' with parameters ( \"test\" )", () => {
            expect( getLogger( "test" ) ).to.deep.equal( getLogger( "test" ) );
        } );

    } );

    describe( "WHEN: enableLogger()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( enableLogger ).to.be.a( "function" );
        } );

        it( "THEN: expect to return a 'string' with parameters ()", () => {
            expect( enableLogger() ).to.be.a( "string" );
        } );

        it( `THEN: expect to return '${ authConfig.logLevel }' with parameters ()`, () => {
            expect( enableLogger() ).to.equal( authConfig.logLevel );
        } );

    } );

    describe( "WHEN: disableLogger()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( disableLogger ).to.be.a( "function" );
        } );

        it( "THEN: expect to return a 'string' with parameters ()", () => {
            expect( disableLogger() ).to.be.a( "string" );
        } );

        it( "THEN: expect to return 'OFF' with parameters ()", () => {
            expect( disableLogger() ).to.equal( "OFF" );
        } );

    } );

    describe( "WHEN: logInfo()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( logInfo ).to.be.a( "function" );
        } );

        it( "THEN: expect to return 'undefined' with parameters ( \"Test String\" )", () => {
            expect( logInfo( "Test string" ) ).to.equal( undefined );
        } );

    } );

    describe( "WHEN: logDebug()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( logDebug ).to.be.a( "function" );
        } );

        it( "THEN: expect to return 'undefined' with parameters ( \"Test String\" )", () => {
            expect( logDebug( "Test string" ) ).to.equal( undefined );
        } );

    } );

    describe( "WHEN: logTrace()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( logTrace ).to.be.a( "function" );
        } );

        it( "THEN: expect to return 'undefined' with parameters ( \"Test String\" )", () => {
            expect( logTrace( "Test string" ) ).to.equal( undefined );
        } );

    } );

    describe( "WHEN: logWarn()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( logWarn ).to.be.a( "function" );
        } );

        it( "THEN: expect to return 'undefined' with parameters ( \"Test String\" )", () => {
            expect( logWarn( "Test string" ) ).to.equal( undefined );
        } );

    } );

    describe( "WHEN: logError()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( logError ).to.be.a( "function" );
        } );

        it( "THEN: expect to return 'undefined' with parameters ( new Error( \"Test string\" ) )", () => {
            expect( logError( new Error( "Test string" ) ) ).to.equal( undefined );
        } );

    } );

    describe( "WHEN: logFatal()", () => {

        it( "THEN: expect to be a 'function'", () => {
            expect( logFatal ).to.be.a( "function" );
        } );

        it( "THEN: expect to return a 'promise' with parameters ( new Error( \"Test string\" ) )", () => {
            expect( logFatal( new Error( "Test string" ) ) ).to.be.a( "promise" );
        } );

        it( "THEN: expect to resolve 'undefined' with parameters ( new Error( \"Test string\" ) )", async () => {
            stub( process, "exit" );
            expect( await logFatal( new Error( "Test string" ) ) ).to.equal( undefined );
            restore();
        } );

    } );

} );
