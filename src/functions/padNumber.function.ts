/**
 * Function file
 * For executing a defined function
 * New functions need to be added to the functions/index.ts file
 *
 * /functions/padNumber.function.ts
 *
 * Copyright (C) 2022 wadawe
 */

/**
 * Pad a number with leading zeros
 * @param number A number to pad
 * @param length A target length to pad until
 * @returns A padded number as a string
 */
export const padNumber = ( number : number, length : number ) : string => {

    // Convert the provided number to a string value
    let numberString : string = number.toString();

    // Pad number until it reaches the defined length
    while ( numberString.length < length ) {
        numberString = `0${ numberString }`;
    }

    // Return the padded number
    return numberString;

};
