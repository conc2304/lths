import { FunctionComponent, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { CalendarProps, Event } from 'react-big-calendar';

import { RowBuilderFn, TableColumnHeader, Table } from '@lths/shared/ui-elements';

export type ListViewProps<TEvent extends object = Event> = CalendarProps & {
  headerCells: TableColumnHeader[];
  rowBuilder: RowBuilderFn<TEvent>;
  headerToEventValueMap: (event: TEvent, column: string) => Date | string | number | undefined;
};

export const ListView: FunctionComponent<ListViewProps> = (props): JSX.Element => {
  const { events = [], headerCells, rowBuilder, headerToEventValueMap } = props;

  const [page, setPage] = useState(0);

  useEffect(() => {
    // On calendar navigation: reset the pagination to the start
    // Events are updated when user clicks navigates calendar ie.('next day/week/month/today')
    // So we key off of that change
    setPage(0);
  }, [events]);

  return (
    <Box data-testid="Calendar-List-View--root">
      <Table
        data={events as Record<string, unknown>[]}
        headerCells={headerCells}
        headerToCellValueMap={headerToEventValueMap}
        rowBuilder={rowBuilder}
        page={page}
      />
    </Box>
  );
};
