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

export const myPlaceholderUtil = (date: Date) => {
  return date.toISOString();
};

/**
 * Date Range/Interval Getters
 */

export const getPrevFullHourRange = (date: Date = new Date()) => {
  return { start: subHours(date, 1), end: date };
};

/**
 *  @desc 00:00 - 23:59 of the previous day
 */
export const getPrevFullDayRange = (date: Date = new Date()) => {
  const yesterday = subDays(date, 1);
  const start = startOfDay(yesterday);
  const end = endOfDay(yesterday);

  return { start, end };
};

/**
 *  @desc Start and End dateTime Previous full week: Sunday 00:00 - Saturday 23:59
 */
export const getPrevFullWeekRange = (date: Date = new Date()) => {
  // WORKS
  const isLastDayOfWeek = isSameDay(date, lastDayOfWeek(date));
  const prevSunday = previousSunday(subWeeks(date, 1));
  const followingSaturday = endOfDay(nextSaturday(prevSunday));

  const start = isLastDayOfWeek ? startOfWeek(date) : prevSunday;
  const end = isLastDayOfWeek ? date : followingSaturday;

  return { start, end };
};

/**
 * @desc Start and End dateTime of previous full month
 */
export const getPrevFullMonthRange = (date: Date = new Date()) => {
  const start = isLastDayOfMonth(date) ? startOfMonth(date) : startOfDay(subMonths(startOfMonth(date), 1));
  const end = isLastDayOfMonth(date) ? endOfDay(date) : endOfMonth(start);

  return {
    start,
    end,
  };
};

/**
 * @desc Start and End dateTime of previous full quarter. Starts of Jan, April, July, Oct. Ends of March, June, Sept, Dec.
 */
export const getPrevFullQuarterRange = (date: Date = new Date()) => {
  const isEndOfQuarter = isSameDay(date, endOfQuarter(date));
  const start = isEndOfQuarter ? startOfQuarter(date) : startOfQuarter(subQuarters(date, 1));
  const end = isEndOfQuarter ? endOfDay(date) : endOfQuarter(subQuarters(date, 1));

  return {
    start,
    end,
  };
};

/**
 * @desc Start and End dateTime of previous full half year: start of Jan or July to end of June or Dec.
 */
export const getPrevFullHalfYearRange = (date: Date = new Date()) => {
  const endQ2 = endOfQuarter(addQuarters(startOfYear(date), 1));
  const endQ4 = endOfQuarter(addQuarters(startOfYear(date), 3));

  // check if we are at the end of either q2 or q4
  const isEndOfQ2 = isSameDay(date, endQ2);
  const isEndOfQ4 = isSameDay(date, endQ4);
  const isHalfYear = isEndOfQ2 || isEndOfQ4;

  let start: Date;
  let end: Date;

  if (isHalfYear) {
    start = startOfQuarter(isEndOfQ2 ? subQuarters(endQ2, 1) : subQuarters(endQ4, 1));
    end = isEndOfQ2 ? endQ2 : endQ4;
  } else {
    // find the nearest half year in the past (quarters 2 or 4)
    const currQuarter = getQuarter(date); // 1,2,3,4

    if ([1, 2].includes(currQuarter)) {
      // then we want quarters 3-4 of last year
      end = endOfQuarter(subDays(startOfYear(date), 5));
      start = startOfQuarter(subQuarters(end, 1));
    } else {
      // then we want quarters 1-2 of this year
      start = startOfYear(date);
      end = endQ2;
    }
  }

  return {
    start,
    end,
  };
};

/**
 * @desc Start and End dateTime of previous full year start of Jan to end of Dec
 */
export const getPrevFullYearRange = (date: Date = new Date()) => {
  const isEndOfYear = isSameDay(date, lastDayOfYear(date));

  let start: Date;
  let end: Date;

  if (isEndOfYear) {
    start = startOfYear(date);
    end = date;
  } else {
    start = startOfYear(subYears(date, 1));
    end = endOfYear(subYears(date, 1));
  }

  return {
    start,
    end,
  };
};
