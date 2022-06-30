/**
 * Function file
 * For executing a defined function
 * New functions need to be added to the functions/index.ts file
 *
 * /functions/getDateString.function.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { padNumber } from "./padNumber.function";

/**
 * Generate a date string from a Date object
 * @param date A date to generate from
 * @param separator A separator string to place inbetween numerical values
 * @returns A generated date string
 */
export const getDateString = ( date : Date | null = null, separator = "" ) : string => {

    // Get the current date if not provided
    if ( date === null ) {
        date = new Date();
    }

    // Generate the date string
    return `${ date.getFullYear() }${ separator }${ padNumber( date.getMonth() + 1, 2 ) }${ separator }${ padNumber( date.getDate(), 2 ) }`;

};
