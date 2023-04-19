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
  return { startDate: subHours(date, 1), endDate: date };
};

/**
 *  @desc 00:00 - 23:59 of the previous day
 */
export const getPrevFullDayRange = (date: Date = new Date()) => {
  const yesterday = subDays(date, 1);
  const startDate = startOfDay(yesterday);
  const endDate = endOfDay(yesterday);

  return { startDate, endDate };
};

/**
 *  @desc Start and End dateTime Previous full week: Sunday 00:00 - Saturday 23:59
 */
export const getPrevFullWeekRange = (date: Date = new Date()) => {
  // WORKS
  const isLastDayOfWeek = isSameDay(date, lastDayOfWeek(date));
  const prevSunday = previousSunday(subWeeks(date, 1));
  const followingSaturday = endOfDay(nextSaturday(prevSunday));

  const startDate = isLastDayOfWeek ? startOfWeek(date) : prevSunday;
  const endDate = isLastDayOfWeek ? date : followingSaturday;

  return { startDate, endDate };
};

/**
 * @desc Start and End dateTime of previous full month
 */
export const getPrevFullMonthRange = (date: Date = new Date()) => {
  const startDate = isLastDayOfMonth(date) ? startOfMonth(date) : startOfDay(subMonths(startOfMonth(date), 1));
  const endDate = isLastDayOfMonth(date) ? endOfDay(date) : endOfMonth(startDate);

  return {
    startDate,
    endDate,
  };
};

/**
 * @desc Start and End dateTime of previous full quarter. Starts of Jan, April, July, Oct. Ends of March, June, Sept, Dec.
 */
export const getPrevFullQuarterRange = (date: Date = new Date()) => {
  const isEndOfQuarter = isSameDay(date, endOfQuarter(date));
  const startDate = isEndOfQuarter ? startOfQuarter(date) : startOfQuarter(subQuarters(date, 1));
  const endDate = isEndOfQuarter ? endOfDay(date) : endOfQuarter(subQuarters(date, 1));

  return {
    startDate,
    endDate,
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

  let startDate: Date;
  let endDate: Date;

  if (isHalfYear) {
    startDate = startOfQuarter(isEndOfQ2 ? subQuarters(endQ2, 1) : subQuarters(endQ4, 1));
    endDate = isEndOfQ2 ? endQ2 : endQ4;
  } else {
    // find the nearest half year in the past (quarters 2 or 4)
    const currQuarter = getQuarter(date); // 1,2,3,4

    if ([1, 2].includes(currQuarter)) {
      // then we want quarters 3-4 of last year
      endDate = endOfQuarter(subDays(startOfYear(date), 5));
      startDate = startOfQuarter(subQuarters(endDate, 1));
    } else {
      // then we want quarters 1-2 of this year
      startDate = startOfYear(date);
      endDate = endQ2;
    }
  }

  return {
    startDate,
    endDate,
  };
};

/**
 * @desc Start and End dateTime of previous full year start of Jan to end of Dec
 */
export const getPrevFullYearRange = (date: Date = new Date()) => {
  const isEndOfYear = isSameDay(date, lastDayOfYear(date));

  let startDate: Date;
  let endDate: Date;

  if (isEndOfYear) {
    startDate = startOfYear(date);
    endDate = date;
  } else {
    startDate = startOfYear(subYears(date, 1));
    endDate = endOfYear(subYears(date, 1));
  }

  return {
    startDate,
    endDate,
  };
};
