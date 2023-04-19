import { subDays, subHours, subMonths } from 'date-fns';

const now = new Date();

export const ButtonGroupConf = [
  {
    label: '1 Hour',
    value: subHours(now, 1),
    onClick: (value: Date) => {
      console.log(value);
    },
  },
  {
    label: '1 Day',
    value: subDays(now, 1),
    onClick: (value: Date) => {
      console.log(value);
    },
  },
  {
    label: '7 Days',
    value: subDays(now, 7),
    onClick: (value: Date) => {
      console.log(value);
    },
  },
  {
    label: '30 Days',
    value: subDays(now, 30),
    onClick: (value: Date) => {
      console.log(value);
    },
  },
  {
    label: '3 Months',
    value: subMonths(now, 3),
    onClick: (value: Date) => {
      console.log(value);
    },
  },
  {
    label: '6 Months',
    value: subMonths(now, 6),
    onClick: (value: Date) => {
      console.log(value);
    },
  },
  {
    label: '12 Months',
    value: subMonths(now, 12),
    onClick: (value: Date) => {
      console.log(value);
    },
  },
];
