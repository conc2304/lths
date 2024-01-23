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

import { ListViewColumnHeader, RowBuilderFn, SortDirection } from './types';
import { BaseColumnValue, getComparator } from './utils';
import { TableTitleRow } from 'libs/shared/ui-elements/src/lib/data-display/tables/table-title-row';

export type ListViewProps<TData extends object = Record<any, any>> = {
  headerCells: ListViewColumnHeader[];
  rowBuilder: RowBuilderFn<TData>;
  headerToCellValueMap?: (data: TData, column: string) => Date | string | number | undefined;
  title?: string;
  data: TData[];
  page?: number;
  onPageChange?: (page: number) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
  sortOrder?: SortDirection;
  orderBy?: string;
  onSortChange?: ({ sortOrder, orderBy }: { sortOrder: SortDirection; orderBy: string }) => void;
  total?: number;
  loading?: boolean;
  fetching?: boolean;
  onExport?: () => void;
  userSettingsStorageKey?: string;
};

const DEFAULT_ROWS_PER_PAGE = 25;
const DEFAULT_TABLE_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE_OPTIONS = [25, 50, 100];

export const ListView = (props: ListViewProps<Record<any, any>>): JSX.Element => {
  const {
    data = [],
    headerCells,
    rowBuilder,
    headerToCellValueMap = BaseColumnValue,
    title,
    page: pageProp,
    onPageChange,
    rowsPerPage: rowsPerPageProp = DEFAULT_ROWS_PER_PAGE,
    onRowsPerPageChange,
    rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
    sortOrder,
    onSortChange,
    orderBy: orderByProp,
    total,
    loading,
    fetching,
    userSettingsStorageKey,
    onExport,
  } = props;

  const [order, setOrder] = useState<SortDirection>(sortOrder ?? 'asc');
  const [orderBy, setOrderBy] = useState<string>(orderByProp ?? headerCells[0].id);
  const [page, setPage] = useState(pageProp ?? 0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalItems = total ?? data.length ?? 0;

  const tableRows = useMemo(() => {
    if (!data) return [];

    const visibleData = data
      ? pageProp !== undefined && rowsPerPage !== undefined // Check if both page and rowsPerPage are defined
        ? sortOrder && orderByProp // Check if order and orderBy are also defined
          ? data
              .slice() // Create a shallow copy of the data array to avoid mutating the original
              .sort((a, b) => getComparator(order)(headerToCellValueMap(a, orderBy), headerToCellValueMap(b, orderBy)))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : data
      : [];

    return visibleData.length > 0
      ? visibleData.map((data) => {
          return rowBuilder({ data, headerCells });
        })
      : [
          <TableRow key={0}>
            <TableCell colSpan={headerCells.length}>No data found for selected time range and/or filters</TableCell>
          </TableRow>,
        ];
  }, [order, orderBy, page, rowsPerPage, data]);

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === 'asc';
    const nextSortOrder = isAsc ? 'desc' : 'asc';

    // controlled component
    if (onSortChange) {
      onSortChange({ sortOrder: nextSortOrder, orderBy: columnId });
      return;
    }
    // uncontrolled component
    setOrder(nextSortOrder);
    setOrderBy(columnId);
  };

  const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box data-testid="Table-List-View--root">
      {totalItems !== 0 && title && (
        <TableTitleRow title={title} loading={!!loading} total={totalItems} onExportClick={onExport} />
      )}
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
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
