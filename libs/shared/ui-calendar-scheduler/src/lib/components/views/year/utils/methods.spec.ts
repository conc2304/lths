import { addYears, endOfYear, format, getDay, parse, startOfWeek, startOfYear, subYears } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Navigate, NavigateAction, dateFnsLocalizer } from 'react-big-calendar';

import { TitleYear, RangeYear, NavigateYear } from './methods';

const mockLocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

describe('Calendar Utility Functions', () => {
  it('TitleYear always returns an empty string', () => {
    expect(TitleYear()).toBe('');
  });

  it('RangeYear returns the first and last visible days of a year', () => {
    const mockDate = new Date('2023-02-15');
    const mockStart = startOfYear(mockDate);
    const mockEnd = endOfYear(mockDate);

    const range = RangeYear(mockDate);
    expect(range.start).toEqual(mockStart);
    expect(range.end).toEqual(mockEnd);
  });

  it('NavigateYear adjusts the date based on the given action', () => {
    const mockDate = new Date('2023-02-15');
    const mockPrevYear = subYears(mockDate, 1);
    const mockNextYear = addYears(mockDate, 1);

    expect(NavigateYear(mockDate, Navigate.PREVIOUS, { localizer: mockLocalizer })).toEqual(mockPrevYear);
    expect(NavigateYear(mockDate, Navigate.NEXT, { localizer: mockLocalizer })).toEqual(mockNextYear);
    expect(NavigateYear(mockDate, 'someOtherAction' as NavigateAction, { localizer: mockLocalizer })).toEqual(mockDate);
  });
});
