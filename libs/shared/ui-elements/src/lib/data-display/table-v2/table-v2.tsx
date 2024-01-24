import { ChangeEvent, FunctionComponent, MouseEvent, cloneElement, useEffect, useMemo, useState } from 'react';
import {
  Box,
  LinearProgress,
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
import { TableRowSkeleton } from 'libs/shared/ui-elements/src/lib/feedback';

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
  showRowNumber?: boolean;
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
    rowsPerPage: rowsPerPageProp,
    onRowsPerPageChange,
    rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
    sortOrder: sortOrderProp,
    onSortChange,
    orderBy: orderByProp,
    total,
    loading,
    fetching,
    userSettingsStorageKey,
    onExport,
    showRowNumber = true,
  } = props;

  const [order, setOrder] = useState<SortDirection>(sortOrderProp ?? 'asc');
  const [orderBy, setOrderBy] = useState<string>(orderByProp ?? headerCells[0].id);
  const [page, setPage] = useState(pageProp ?? 0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp ?? DEFAULT_ROWS_PER_PAGE);

  const totalItems = total ?? data.length ?? 0;

  const tableRows = useMemo(() => {
    if (!data) return [];

    const dataCopy = data.slice();

    // if we have sortOrder & orderByProp then its a controlled/server side component
    // otherwise its an un(internally)controlled component
    const sortingIsControlled = sortOrderProp && orderByProp;
    const sortedData = sortingIsControlled
      ? dataCopy
      : dataCopy.sort((a, b) =>
          getComparator(order)(headerToCellValueMap(a, orderBy), headerToCellValueMap(b, orderBy))
        );

    const paginationIsControlled = pageProp && rowsPerPageProp;
    const paginatedData = paginationIsControlled
      ? sortedData
      : sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const visibleData = paginatedData;

    return visibleData.length > 0
      ? visibleData.map((data, i) => {
          const rowContent = rowBuilder({ data, headerCells });

          return (
            <TableRow>
              {showRowNumber && <TableCell>{page * rowsPerPage + i + 1}</TableCell>}
              {rowContent}
            </TableRow>
          );
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
    console.log('handleSort');
    // controlled component
    if (onSortChange) {
      console.log('controlled sort');
      onSortChange({ sortOrder: nextSortOrder, orderBy: columnId });
      return;
    }

    console.log('UNcontrolled sort');
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
            <TableRowSkeleton id="head" loading={!!loading} cells={headerCells?.length} />

            <TableRow>
              {showRowNumber && (
                <TableCell
                  align="center"
                  sx={{
                    color: (theme) => theme.palette.grey[500],
                    fontsize: '0.75rem',
                  }}
                >
                  #
                </TableCell>
              )}
              {headerCells.map((column) => (
                <TableCell
                  key={`th-${column.id}`}
                  align="left"
                  sx={{
                    color: (theme) => theme.palette.grey[500],
                    fontsize: '0.75rem',
                  }}
                >
                  {column.sortable && (
                    <TableSortLabel
                      active={column.id === orderBy}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
                      IconComponent={KeyboardArrowDownIcon}
                      role="columnheader"
                    >
                      {column.label.toUpperCase()}
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  )}
                  {!column.sortable && column.label.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!loading && fetching && (
            <TableCell
              sx={{
                p: 0,
              }}
              colSpan={headerCells.length}
            >
              <LinearProgress />
            </TableCell>
          )}
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
