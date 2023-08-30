import { ChangeEvent, FunctionComponent, MouseEvent, cloneElement, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { visuallyHidden } from '@mui/utils';
import { CalendarProps, Event } from 'react-big-calendar';

import { getComparator } from './utils';
import { ListViewColumnHeader, RowBuilderFn, SortDirection } from '../../../types';

export type ListViewProps<TEvent extends object = Event> = CalendarProps & {
  headerCells: ListViewColumnHeader[];
  rowBuilder: RowBuilderFn;
  headerToEventValueMap: (event: TEvent, column: string) => Date | string | number | undefined;
};

export const ListView: FunctionComponent<ListViewProps> = (props): JSX.Element => {
  const { events = [], headerCells, rowBuilder, headerToEventValueMap } = props;

  const [order, setOrder] = useState<SortDirection>('asc');
  const [orderBy, setOrderBy] = useState<string>(headerCells[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // On calendar navigation: reset the pagination to the start
    // Events are updated when user clicks navigates calendar ie.('next day/week/month/today')
    // So we key off of that change
    setPage(0);
  }, [events]);

  const tableRows = useMemo(() => {
    if (!events) return [];
    const visibleEvents = events
      ?.sort((a, b) => getComparator(order)(headerToEventValueMap(a, orderBy), headerToEventValueMap(b, orderBy)))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return visibleEvents.length > 0
      ? visibleEvents.map((event) => {
          return rowBuilder({ event, headerCells });
        })
      : [
          <TableRow key={0}>
            <TableCell colSpan={headerCells.length}>No events found for selected time range and/or filters</TableCell>
          </TableRow>,
        ];
  }, [order, orderBy, page, rowsPerPage, events]);

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box data-testid="Calendar-List-View--root">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headerCells.map((column) => (
                <TableCell key={`th-${column.id}`} align="left">
                  <TableSortLabel
                    active={column.id === orderBy}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleSort(column.id)}
                    IconComponent={KeyboardArrowDownIcon}
                    role="columnheader"
                    sx={{
                      color: (theme) => theme.palette.grey[500],
                      fontsize: '0.75rem',
                    }}
                  >
                    {column.label.toUpperCase()}
                    {orderBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row, i) => {
              return cloneElement(row, { key: `tr-${i}` });
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={events.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
