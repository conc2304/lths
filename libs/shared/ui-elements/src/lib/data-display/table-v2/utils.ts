import { SortDirection } from './types';

export const getComparator = (
  order: SortDirection
): ((a: number | string | Date | undefined, b: number | string | Date | undefined) => number) => {
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

export const BaseColumnValue = (data: Record<string, unknown>, column: string) => {
  return data[column] || false;
};
