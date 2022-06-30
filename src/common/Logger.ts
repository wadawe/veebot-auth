/**
 * Logger file
 * For handling all logging logic
 *
 * /common/Logger.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { Logger, configure, getLogger as getLog4js } from "log4js";
import { authConfig } from "../config";
import { sleep, getDateString, getTimeString } from "../functions";
import { ProjectEnvironment } from "../global-types";

type LoggerStructure = {
    instance ?: Logger;
};

type LoggerAppenders = {
    [ key in ProjectEnvironment ] : string[];
};

const logger : LoggerStructure = {};

/**
 * Create a logger
 * @param id The log identifier to use
 * @returns A logger instance
 */
export const getLogger = ( id : string ) : Logger => {

    if ( ! logger.instance ) {

        const appenders : LoggerAppenders = {
            production: [ "console", "file" ],
            development: [ "console", "file" ],
            test: [ "file" ]
        };

        configure( {
            appenders: {
                console: {
                    type: "stdout",
                    layout: { type: "pattern", pattern: "%[[%d{dd/MM/yy hh:mm:ss}] [%p]%] %m" }
                },
                file: {
                    type: "file",
                    layout: { type: "pattern", pattern: "[%d{dd/MM/yy hh:mm:ss}] [%p] %m" },
                    filename: `logs/${ getDateString() }_${ getTimeString() }_${ id }.log`
                }
            },
            categories: { default: { appenders: appenders[ authConfig.env ], level: authConfig.logLevel } }
        } );

        logger.instance = getLog4js();

    }

    return logger.instance;

};

/**
 * Enable the Log4js instance
 * @returns The logger level
 */
export const enableLogger = () : string => {
    let log = logger.instance;
    if ( ! log ) {
        log = getLogger( authConfig.env );
    }
    log.level = authConfig.logLevel;
    return authConfig.logLevel;
};

/**
 * Disable the Log4js instance
 * @returns The logger level
 */
export const disableLogger = () : string => {
    let log = logger.instance;
    if ( ! log ) {
        log = getLogger( authConfig.env );
    }
    log.level = "OFF";
    return "OFF";
};

/**
 * Log normal conditions such as services starting or stopping
 * @param message An info message to log
 */
export const logInfo = ( message : string ) : void => {
    let log = logger.instance;
    if ( ! log ) {
        log = getLogger( authConfig.env );
    }
    log.info( message );
};

/**
 * Log top level context messages to help understand top-level workings
 * @param message A debug message to log
 */
export const logDebug = ( message : string ) : void => {
    let log = logger.instance;
    if ( ! log ) {
        log = getLogger( authConfig.env );
    }
    log.debug( message );
};

/**
 * Log low level context messages to help understand lower-level workings
 * @param message A trace message to log
 */
export const logTrace = ( message : string ) : void => {
    let log = logger.instance;
    if ( ! log ) {
        log = getLogger( authConfig.env );
    }
    log.trace( message );
};

/**
 * Log a message when an issue occurs that is not fatal to a specific transaction
 * @param message A warning message to log
 */
export const logWarn = ( message : string ) : void => {
    let log = logger.instance;
    if ( ! log ) {
        log = getLogger( authConfig.env );
    }
    log.warn( message );
};

/**
 * Log a message when an issue occurs that is fatal to a specific transaction
 * @param error An error to log
 */
export const logError = ( error : Error ) : void => {
    let log = logger.instance;
    if ( ! log ) {
        log = getLogger( authConfig.env );
    }
    log.error( `${ error.name } > ${ error.message } : ${ error.stack }` );
};

/**
 * Log a message when an issue occurs that is fatal to the entire service
 * @param error An error to log
 */
export const logFatal = async ( error : Error ) : Promise<void> => {
    let log = logger.instance;
    if ( ! log ) {
        log = getLogger( authConfig.env );
    }
    log.fatal( `${ error.name } > ${ error.message } : ${ error.stack }` );
    await sleep( 100 );
    process.exit( 1 );
};
