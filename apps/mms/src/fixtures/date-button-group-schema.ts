import {
  addQuarters,
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

const now = new Date();

export const ButtonGroupConf: DateFilterOption = [
  {
    label: '1 Hour',
    value: subHours(now, 1),
    onClick: () => {
      const now = new Date();
      return { startDate: subHours(now, 1), endDate: now };
    },
  },
  {
    // 12 am - 12am of the previous day
    label: '1 Day',
    value: subDays(now, 1),
    onClick: () => {
      const now = new Date();
      const yesterday = subDays(now, 1);
      const startDate = startOfDay(yesterday);
      const endDate = endOfDay(yesterday);

      return { startDate, endDate };
    },
  },
  {
    // Previous full wekk Sunday - Saturday 12 am - 12am
    label: '7 Days',
    value: subDays(now, 7),
    onClick: () => {
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
    value: subDays(now, 30),
    onClick: () => {
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
    value: subMonths(now, 3),
    onClick: () => {
      const now = new Date();
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
    value: subMonths(now, 6),
    onClick: () => {
      const now = new Date();

      const endQ2 = endOfQuarter(addQuarters(startOfYear(now), 2));
      const endQ4 = endOfQuarter(addQuarters(startOfYear(now), 4));
      // check if we are at the end of either q2 or q4
      const isEndOfQ2 = isSameDay(now, endQ2);
      const isEndOfQ4 = isSameDay(now, endQ4);

      const isHalfYear = isEndOfQ2 || isEndOfQ4;

      let startDate: Date;
      let endDate: Date;

      if (isHalfYear) {
        startDate = isEndOfQ2 ? subQuarters(endQ2, 2) : subQuarters(endQ4, 2);
        endDate = isEndOfQ2 ? endQ2 : endQ4;
      } else {
        // find the nearest half year in the past 2|4
        const currQuarter = getQuarter(now); // 1,2,3,4

        if ([1, 2].includes(currQuarter)) {
          // then we want 3-4 of last year
          endDate = endOfQuarter(subDays(startOfYear(now), 5));
          startDate = startOfQuarter(subQuarters(endDate, 2));
        } else if ([3, 4].includes(currQuarter)) {
          // then we want 1-2 of this year
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
    value: subMonths(now, 12),
    onClick: () => {
      const now = new Date();
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
