/**
 * Function file
 * For executing a defined function
 * New functions need to be added to the functions/index.ts file
 *
 * /functions/getDateDifference.function.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { padNumber } from "./padNumber.function";

/**
 * Generate a string dipicting the difference between two dates
 * @param firstDate A date to calculate from
 * @param secondDate A date to calculate until
 * @returns A generated date time string
 */
export const getDateDifference = ( firstDate = new Date(), secondDate = new Date() ) : string => {

    // Create the data difference
    const dateDifference = new Date( Math.abs( firstDate.getTime() - secondDate.getTime() ) );

    // Deconstruct the date difference
    let seconds = dateDifference.getTime() / 1000;
    const hours = Math.floor( seconds / ( 60 * 60 ) );
    seconds = seconds - hours * ( 60 * 60 );
    const minutes = Math.floor( seconds / 60 );
    seconds = Math.floor( seconds - minutes * 60 );

    // Format the date difference
    return `${ padNumber( hours, 2 ) }h ${ padNumber( minutes, 2 ) }m ${ padNumber( seconds, 2 ) }s`;

};
