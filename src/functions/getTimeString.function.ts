/**
 * Function file
 * For executing a defined function
 * New functions need to be added to the functions/index.ts file
 *
 * /functions/getTimeString.function.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { padNumber } from "./padNumber.function";

/**
 * Generate a time string from a Date object
 * @param date A date to generate from
 * @param separator A separator string to place inbetween numerical values
 * @returns A generated time string
 */
export const getTimeString = ( date : Date | null = null, separator = "" ) : string => {

    // Get the current date if not provided
    if ( date === null ) {
        date = new Date();
    }

    // Generate the time string
    return `${ padNumber( date.getHours(), 2 ) }${ separator }${ padNumber( date.getMinutes() + 1, 2 ) }${ separator }${ padNumber( date.getSeconds(), 2 ) }`;

};
