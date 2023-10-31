import { endOfYear, startOfYear } from 'date-fns';
import { DateLocalizer, Navigate, NavigateAction } from 'react-big-calendar';

// RBC Requires this class property to be set but we don't use it
export const TitleYear = () => '';

export const RangeYear = (date: Date) => {
  const start = startOfYear(date);
  const end = endOfYear(date);
  return { start, end };
};

export const NavigateYear = (date: Date, action: NavigateAction, { localizer }: { localizer: DateLocalizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, 'year');

    case Navigate.NEXT:
      return localizer.add(date, 1, 'year');

    default:
      return date;
  }
};
