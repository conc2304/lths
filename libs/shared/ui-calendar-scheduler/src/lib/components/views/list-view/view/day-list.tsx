import { FunctionComponent, useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { DateLocalizer, Navigate, NavigateAction, ViewStatic } from 'react-big-calendar';

import { useListViewContext } from '../../../../context';
import { ListView, ListViewProps } from '../list-view';

export const DayList: FunctionComponent<ListViewProps> & ViewStatic = (props): JSX.Element => {
  const { date, events = [] } = props;

  const eventsInScope = useMemo(
    () =>
      events?.filter((event) => {
        if (!event.start || !date) return false;
        return isSameDay(date as Date, event.start);
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

export const NavigateDay = (date: Date, action: NavigateAction, { localizer }: { localizer: DateLocalizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, 'day');

    case Navigate.NEXT:
      return localizer.add(date, 1, 'day');

    default:
      return date;
  }
};

export const RangeDay = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  return { start: localizer.startOf(date, 'day'), end: localizer.endOf(date, 'day') };
};

DayList.navigate = NavigateDay;
DayList.range = RangeDay;

// RBC Requires this class property to be set but we don't use it

export const TitleDay = () => '';
DayList.title = TitleDay;
