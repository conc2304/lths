import {
  addMonths,
  addQuarters,
  eachQuarterOfInterval,
  endOfDay,
  endOfMonth,
  endOfQuarter,
  endOfYear,
  getQuarter,
  isLastDayOfMonth,
  isSameDay,
  lastDayOfWeek,
  lastDayOfYear,
  nextSaturday,
  previousSunday,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
  subHours,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
} from 'date-fns';
import { DateFilterOption } from 'libs/shared/ui-elements/src/lib/inputs/date-range-selector/types';

export const ButtonGroupConf: DateFilterOption = [
  {
    label: '1 Hour',
    dateRangeFn: () => {
      // WORKS
      const now = new Date();
      return { startDate: subHours(now, 1), endDate: now };
    },
  },
  {
    // 12 am - 12am of the previous day
    label: '1 Day',
    dateRangeFn: () => {
      // WORKS
      const now = new Date();
      const yesterday = subDays(now, 1);
      const startDate = startOfDay(yesterday);
      const endDate = endOfDay(yesterday);

      return { startDate, endDate };
    },
  },
  {
    // Previous full week Sunday - Saturday 12 am - 12am
    label: '7 Days',
    dateRangeFn: () => {
      // WORKS
      const now = new Date();
      const isLastDayOfWeek = isSameDay(now, lastDayOfWeek(now));
      const prevSunday = previousSunday(subWeeks(now, 1));
      const followingSaturday = endOfDay(nextSaturday(prevSunday));

      const startDate = isLastDayOfWeek ? startOfWeek(now) : prevSunday;
      const endDate = isLastDayOfWeek ? now : followingSaturday;

      return { startDate, endDate };
    },
  },
  {
    // Previous full Month
    label: '30 Days',
    dateRangeFn: () => {
      // Works
      const now = new Date();
      const startDate = isLastDayOfMonth(now) ? startOfMonth(now) : startOfDay(subMonths(startOfMonth(now), 1));
      const endDate = isLastDayOfMonth(now) ? endOfDay(now) : endOfMonth(startDate);

      return {
        startDate,
        endDate,
      };
    },
  },
  {
    // Previous Quarter
    label: '3 Months',
    dateRangeFn: () => {
      // const now = new Date();
      const now = new Date('06/30/2023');

      const isEndOfQuarter = isSameDay(now, endOfQuarter(now));
      const startDate = isEndOfQuarter ? startOfQuarter(now) : startOfQuarter(subQuarters(now, 1));
      const endDate = isEndOfQuarter ? endOfDay(now) : endOfQuarter(subQuarters(now, 1));

      return {
        startDate,
        endDate,
      };
    },
  },
  {
    // Previous full half year
    label: '6 Months',
    dateRangeFn: () => {
      // const now = new Date();
      const now = new Date('6/30/2023');
      console.log('N: ', now);
      console.log('Quarter Interval');

      console.log(eachQuarterOfInterval({ start: subQuarters(startOfYear(now), 2), end: endOfYear(now) }));

      const endQ2 = endOfQuarter(addQuarters(startOfYear(now), 1));
      const endQ4 = endOfQuarter(addQuarters(startOfYear(now), 3));
      // check if we are at the end of either q2 or q4
      const isEndOfQ2 = isSameDay(now, endQ2);
      const isEndOfQ4 = isSameDay(now, endQ4);

      const isHalfYear = isEndOfQ2 || isEndOfQ4;

      let startDate: Date;
      let endDate: Date;

      if (isHalfYear) {
        startDate = startOfQuarter(isEndOfQ2 ? subQuarters(endQ2, 1) : subQuarters(endQ4, 1));
        endDate = isEndOfQ2 ? endQ2 : endQ4;
      } else {
        // find the nearest half year in the past (quarters 2 or 4)
        const currQuarter = getQuarter(now); // 1,2,3,4

        if ([1, 2].includes(currQuarter)) {
          // then we want quarters 3-4 of last year
          endDate = endOfQuarter(subDays(startOfYear(now), 5));
          startDate = startOfQuarter(subQuarters(endDate, 1));
        } else if ([3, 4].includes(currQuarter)) {
          // then we want quarters 1-2 of this year
          startDate = startOfYear(now);
          endDate = endQ2;
        }
      }

      return {
        startDate,
        endDate,
      };
    },
  },
  {
    // Previous full year
    label: '12 Months',
    dateRangeFn: () => {
      // const now = new Date();
      const now = new Date('12/31/2023');
      console.log('N: ', now);
      const isEndOfYear = isSameDay(now, lastDayOfYear(now));

      let startDate: Date;
      let endDate: Date;

      if (isEndOfYear) {
        startDate = startOfYear(now);
        endDate = now;
      } else {
        startDate = startOfYear(subYears(now, 1));
        endDate = endOfYear(subYears(now, 1));
      }

      return {
        startDate,
        endDate,
      };
    },
  },
];
