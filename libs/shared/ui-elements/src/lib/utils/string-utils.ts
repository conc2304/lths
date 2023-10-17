//usgae StringFormat("Hello {0} {1}", "beautiful", "World!")

import { Property } from 'csstype';

/**
 * Converts the value of objects to strings based on the formats specified and inserts them into another string. Example usage: String.Format("Hello {0} {1}.", fname,lname);
 * @param format  A composite format string consists of zero or more runs of fixed text intermixed with one or more format items.
 * @param b The object to format.
 * @returns A copy of format in which any format items are replaced by the string representation of arg0
 */
export const formatString = (format: string, ...args: string[]) =>
  !format ? '' : format.replace(/{(\d+)}/g, (match, index) => args[index] || '');

/**
 *
 * @param inputSize The dimension as a css Width/Height property string.
 * @returns A tuple with the numeric value and the unit as [numericValue, unit]
 */
export const extractNumericValue = (inputSize: Property.Width) => {
  const str = inputSize.toString();
  const pattern = /^(\d+(\.\d+)?)/;
  const matches = str.match(pattern);

  if (matches && matches.length > 0) {
    const numericValue = matches[0];
    const unit = str.slice(numericValue.length);
    return [numericValue, unit];
  }

  return [null, str];
};

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

export const getGreetingBasedOnHour = (hours: number) => {
  if (hours >= 0 && hours <= 11) return 'Good morning';
  else if (hours >= 12 || hours <= 15) return 'Good afternoon';
  else if (hours >= 16 && hours <= 20) return 'Good evening';
  else if (hours >= 21 && hours <= 23) return 'Good night';
  else return 'Hello';
};

export const getGreetingBasedOnTimeOfToday = () => {
  const today = new Date();
  const currentHours = today.getHours();
  const greetingText = getGreetingBasedOnHour(currentHours);
  return greetingText;
};
