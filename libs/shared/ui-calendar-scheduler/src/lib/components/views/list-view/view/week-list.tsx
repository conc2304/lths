import { FunctionComponent, useMemo } from 'react';
import { endOfWeek, isSameWeek, startOfWeek } from 'date-fns';
import { DateLocalizer, Navigate, NavigateAction, ViewStatic } from 'react-big-calendar';

import { useListViewContext } from '../../../../context';
import { ListView, ListViewProps } from '../list-view';

export const WeekList: FunctionComponent<ListViewProps> & ViewStatic = (props): JSX.Element => {
  const { date, events = [] } = props;

  const eventsInScope = useMemo(
    () =>
      events?.filter((event) => {
        if (!event.start || !date) return false;
        return isSameWeek(date as Date, event.start);
      }),
    [date, events]
  );

  const { headerCells, rowBuilder, headerToEventValueMap } = useListViewContext();

  return (
    <ListView
      {...props}
      events={eventsInScope}
      headerCells={headerCells}
      rowBuilder={rowBuilder}
      headerToEventValueMap={headerToEventValueMap}
    />
  );
};

export const NavigateWeek = (date: Date, action: NavigateAction, { localizer }: { localizer: DateLocalizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, 'week');

    case Navigate.NEXT:
      return localizer.add(date, 1, 'week');

    default:
      return date;
  }
};

export const RangeWeek = (date: Date) => {
  const start = startOfWeek(date);
  const end = endOfWeek(date);

  return { start, end };
};

WeekList.navigate = NavigateWeek;
WeekList.range = RangeWeek;
// RBC Requires this class property to be set but we don't use it
export const TitleWeek = () => '';
WeekList.title = TitleWeek;
