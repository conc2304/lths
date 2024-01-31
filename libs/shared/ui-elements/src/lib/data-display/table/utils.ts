import { SortDirection } from './types';

type ComparatorValueType = number | string | Date | boolean | undefined | unknown;

export const getComparator = (order: SortDirection): ((a: ComparatorValueType, b: ComparatorValueType) => number) => {
  return order === 'desc' ? (a, b) => descendingComparator(a, b) : (a, b) => -descendingComparator(a, b);
};

export const descendingComparator = <T>(a: T, b: T) => {
  if (b < a) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
};

export const BaseColumnValue = (data: Record<string, ComparatorValueType>, column: string) => {
  return data[column] || false;
};
