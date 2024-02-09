import { format, setMonth } from 'date-fns';

export const getMonthFullName = (monthNum: number) => {
  const month = setMonth(new Date(), monthNum)
  return format(month, "LLLL");
}