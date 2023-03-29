import { subDays, subHours, subMonths } from 'date-fns';

export const now = new Date('December 17, 1995 03:24:00');
export const ButtonGroupConf = [
  {
    label: '1 Hour',
    value: subHours(now, 1),
  },
  {
    label: '1 Day',
    value: subDays(now, 1),
  },
  {
    label: '7 Days',
    value: subDays(now, 7),
  },
  {
    label: '30 Days',
    value: subDays(now, 30),
  },
  {
    label: '3 Months',
    value: subMonths(now, 3),
  },
  {
    label: '6 Months',
    value: subMonths(now, 6),
  },
  {
    label: '12 Months',
    value: subMonths(now, 12),
  },
];