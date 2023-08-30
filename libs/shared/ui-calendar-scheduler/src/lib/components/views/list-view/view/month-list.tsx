import { FunctionComponent, useMemo } from 'react';
import { isSameMonth } from 'date-fns';
import { DateLocalizer, Navigate, NavigateAction, ViewStatic } from 'react-big-calendar';

import { useListViewContext } from '../../../../context';
import { ListView, ListViewProps } from '../list-view';

export const MonthList: FunctionComponent<ListViewProps> & ViewStatic = (props): JSX.Element => {
  const { date, events = [] } = props;

  const eventsInScope = useMemo(
    () =>
      events?.filter((event) => {
        if (!event.start || !date) return false;
        return isSameMonth(date as Date, event.start);
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

export const NavigateMonth = (date: Date, action: NavigateAction, { localizer }: { localizer: DateLocalizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, 'month');

    case Navigate.NEXT:
      return localizer.add(date, 1, 'month');

    default:
      return date;
  }
};

export const RangeMonth = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  const start = localizer.firstVisibleDay(date, localizer);
  const end = localizer.lastVisibleDay(date, localizer);
  return { start, end };
};

MonthList.range = RangeMonth;
MonthList.navigate = NavigateMonth;

// RBC Requires this class property to be set but we don't use it
export const TitleMonth = () => '';
MonthList.title = TitleMonth;
