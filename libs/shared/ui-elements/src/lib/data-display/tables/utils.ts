import { TableCellType } from './types';

export const formatDate = (date: Date | string) => {
  const formattedDate = new Date(date).toLocaleDateString();
  return formattedDate;
};

export const formatNumber = (number: number) => {
  const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  const formattedNumber = new Intl.NumberFormat('en-US', options).format(number);
  return formattedNumber;
};
//type predicate that tells TypeScript that if the function returns true, the type of the value argument is narrowed to string.
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};
export const formatObject = (obj: Record<string, unknown>): string => {
  if (!obj) return '';
  else if (obj.value) return obj.value + (obj.unit ? ` ${obj.unit}` : '');
  else if (isString(obj)) return String(obj);
  else return JSON.stringify(obj);
};
export const formatCell = (data: any, type?: TableCellType, unit?: string) => {
  switch (type) {
    case 'string':
      return data + (unit ? ` ${unit}` : '');
    case 'number':
      return formatNumber(data) + (unit ? ` ${unit}` : '');
    case 'boolean':
      return data ? 'Yes' : 'No';
    case 'date':
      return formatDate(data);
    case 'object':
      //  case typeof data:
      return formatObject(data);
    default:
      return formatObject(data);
  }
};
