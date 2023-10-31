import { FunctionComponent, useMemo } from 'react';
import { isSameYear } from 'date-fns';
import { ViewStatic } from 'react-big-calendar';

import { useListViewContext } from '../../../../context';
import { NavigateYear, RangeYear, TitleYear } from '../../year/utils/methods';
import { ListView, ListViewProps } from '../list-view';

export const YearList: FunctionComponent<ListViewProps> & ViewStatic = (props): JSX.Element => {
  const { date, events = [] } = props;

  const eventsInScope = useMemo(
    () =>
      events?.filter((event) => {
        if (!event.start || !date) return false;
        return isSameYear(date as Date, event.start);
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

YearList.range = RangeYear;
YearList.navigate = NavigateYear;
YearList.title = TitleYear;
