import { addMonths, isToday, subMonths } from 'date-fns';

import { SerializableMMSEvent } from '@lths/features/mms/data-access';
import { MMSEvent } from '@lths/features/mms/ui-event-schedule';
import { LTHSView, ViewMode } from '@lths/shared/ui-calendar-scheduler';

import { BasePath } from './paths';

/**
 * Constructs a range based on a center date and a specified padding in months.
 *
 * This function generates a range, as mongoDB query string, where the `start` is the date obtained by
 * subtracting the `monthsPadding` from the `centerDate`, and the `end` is the date
 * obtained by adding the `monthsPadding` to the `centerDate`.
 * Both the start and end dates are then converted to a specific string format.
 *
 * @function
 * @param {Date | string} centerDate - The central date used as a reference to calculate the range.
 * @param {number} [monthsPadding=3] - The number of months to subtract/add from the center date. Default is 3 months.
 * @returns {Object} The constructed range with `start` and `end` properties as mongoDB queries.
 *
 * @example
 * const range = constructRange(new Date('2022-01-15'));
 * // Expected: range.start will be the date three months before 2022-01-15
 * // Expected: range.end will be the date three months after 2022-01-15
 */
export const constructRange = (centerDate: Date | string, monthsPadding = 3): { start: string; end: string } => {
  const start = `{"$gt": "${subMonths(new Date(centerDate), monthsPadding).toISOString()}"}`;
  const end = `{"$lt": "${addMonths(new Date(centerDate), monthsPadding).toISOString()}"}`;

  return { start, end };
};

/**
 * Converts event date properties from serializable format to `Date` objects.
 *
 * Processes an array of events in serializable format, and for each event,
 * converts its `start`, `end`, and `createdOn` properties to JavaScript `Date` objects.
 * Also processes the event's `eventStates` property, if present, and converts its `start`
 * and `end` properties to `Date` objects.
 *
 * @function
 * @param {SerializableMMSEvent[]} events - An array of events in serializable format.
 * @returns {MMSEvent[]} - An array of events with date properties converted to `Date` objects.
 *
 */
export const convertEventDates = (events: SerializableMMSEvent[]): MMSEvent[] => {
  const datedEvents = events.map((event) => ({
    ...event,
    start: event.start ? new Date(event.start) : undefined,
    end: event.end ? new Date(event.end) : undefined,
    createdOn: event.createdOn ? new Date(event.createdOn) : undefined,
  }));

  return datedEvents;
};

export const getCalendarStateFromPath = (
  path: string
): {
  isIndex: boolean;
  matched: boolean;
  viewMode: ViewMode;
  view: LTHSView;
  year: number;
  month: number;
  day: number;
} => {
  console.log('getCalendarStateFromPath');
  const regex = /vm\/([^/]+)\/v\/([^/]+)\/(\d{4})\/(\d{1,2})\/(\d{1,2})/;
  const isIndex = path.indexOf('schedule') >= 0 || path === '/';
  const match = path.match(regex);

  if (match) {
    const [, viewMode, view, year, month, day] = match;
    return {
      isIndex,
      matched: true,
      viewMode: viewMode as ViewMode,
      view: view as LTHSView,
      year: parseInt(year, 10),
      month: parseInt(month, 10) - 1, // url is 1 indexed
      day: parseInt(day, 10),
    };
  } else {
    const today = new Date();
    return {
      isIndex,
      matched: false,
      viewMode: 'calendar',
      view: 'month',
      year: today.getFullYear(),
      month: today.getMonth(), // get month is 0 indexed
      day: today.getDate(),
    };
  }
};

export const buildCalendarPath = ({
  view = 'month',
  viewMode = 'calendar',
  date,
}: {
  viewMode?: ViewMode;
  view?: LTHSView;
  date: Date;
}) => {
  if (isToday(date)) return `${BasePath}/vm/${viewMode}/v/${view}`;
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${BasePath}/vm/${viewMode}/v/${view}/${year}/${month + 1}/${day}`;
};
