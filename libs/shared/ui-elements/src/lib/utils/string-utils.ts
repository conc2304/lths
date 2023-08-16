//usgae StringFormat("Hello {0} {1}", "beautiful", "World!")

import { ObjectIteratee } from 'cypress/types/lodash';

/**
 * Converts the value of objects to strings based on the formats specified and inserts them into another string. Example usage: String.Format("Hello {0} {1}.", fname,lname);
 * @param format  A composite format string consists of zero or more runs of fixed text intermixed with one or more format items.
 * @param b The object to format.
 * @returns A copy of format in which any format items are replaced by the string representation of arg0
 */
export const formatString = (format: string, ...args: string[]) =>
  !format ? '' : format.replace(/{(\d+)}/g, (match, index) => args[index] || '');

export const ordinalifyNumber = (number: number) => {
  const ordinals = [
    'Zeroth',
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth',
    'Ninth',
    'Tenth',
    'Eleventh',
    'Twelfth',
    'Thirteenth',
    'Fourteenth',
    'Fifteenth',
    'Sixteenth',
    'Seventeenth',
    'Eighteenth',
    'Nineteenth',
  ];
  const prefixes = ['Twent', 'Thirt', 'Fort', 'Fift', 'Sixt', 'Sevent', 'Eight', 'Ninet'];
  if (number < 20) return ordinals[number];
  else if (number % 10 === 0) return prefixes[Math.floor(number / 10) - 2] + 'ieth';
  else return prefixes[Math.floor(number / 10) - 2] + 'y-' + ordinals[number % 10];
};
