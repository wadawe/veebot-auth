/**
 * Function file
 * For executing a defined function
 * New functions need to be added to the functions/index.ts file
 *
 * /functions/sleep.function.ts
 *
 * Copyright (C) 2022 wadawe
 */

/**
 * Sleep for a defined duration
 * @param ms A number of milliseconds to sleep for
 * @returns A promise, resolved after the defined duration
 */
export const sleep = ( ms : number ) : Promise<void> => {

    // Resolve the promise after X ms
    return new Promise( ( resolve ) => {
        setTimeout( resolve, ms );
    } );

};
