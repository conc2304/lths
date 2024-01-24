import { ChangeEvent, MouseEvent, cloneElement, useMemo, useState } from 'react';
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

import { ListViewColumnHeader, OnTableChangeOptions, RowBuilderFn, SortDirection } from './types';
import { BaseColumnValue, getComparator } from './utils';
import { TableRowSkeleton } from '../../feedback';
import { TableTitleRow } from '../tables/table-title-row';

export type ListViewProps<TData extends object = Record<any, any>> = {
  headerCells: ListViewColumnHeader[];
  rowBuilder: RowBuilderFn<TData>;
  headerToCellValueMap?: (data: TData, column: string) => Date | string | number | undefined;
  title?: string;
  onChange?: (options: OnTableChangeOptions) => void;
  data: TData[];
  page?: number;
  onPageChange?: (options: OnTableChangeOptions) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (options: OnTableChangeOptions) => void;
  rowsPerPageOptions?: number[];
  sortOrder?: SortDirection;
  orderBy?: string;
  onSortChange?: (options: OnTableChangeOptions) => void;
  total?: number;
  loading?: boolean;
  fetching?: boolean;
  onExport?: () => void;
  userSettingsStorageKey?: string;
  showRowNumber?: boolean;
};

const DEFAULT_ROWS_PER_PAGE = 25;
const DEFAULT_TABLE_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

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
    showRowNumber = false,
    onChange,
  } = props;

  console.log({ pageProp });

  const [sortOrder, setSortOrder] = useState<SortDirection>(sortOrderProp ?? 'asc');
  const [orderBy, setOrderBy] = useState<string>(orderByProp ?? headerCells[0].id);
  const [page, setPage] = useState(pageProp ?? DEFAULT_TABLE_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp ?? DEFAULT_ROWS_PER_PAGE);

  const totalItems = total ?? data.length ?? 0;

  const tableRows = useMemo(() => {
    if (!data) return [];

    // controlled data is expected to come sorted and paginated directly from the server
    // so we leave that alone

    const dataCopy = data.slice();

    // if we have sortOrder & orderByProp then its a controlled / server-side-driven component
    // otherwise its an un(internally)controlled component
    const sortingIsControlled = Boolean(sortOrderProp && orderByProp);
    const sortedData = sortingIsControlled
      ? dataCopy
      : dataCopy.sort((a, b) =>
          getComparator(sortOrder)(headerToCellValueMap(a, orderBy), headerToCellValueMap(b, orderBy))
        );

    // if we have pageProp & rowsPerPageProp then its a controlled / server-side-driven component
    // otherwise its an un(internally)controlled component
    const paginationIsControlled = Boolean(pageProp !== undefined && rowsPerPageProp);
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
            <TableCell colSpan={headerCells.length}>No data available.</TableCell>
          </TableRow>,
        ];
  }, [data, sortOrder, orderBy, page, rowsPerPage, rowsPerPageProp, sortOrderProp, orderByProp, pageProp]);

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && sortOrder === 'asc';
    const nextSortOrder = isAsc ? 'desc' : 'asc';

    // controlled component
    onChange && onChange({ sortOrder: nextSortOrder, orderBy: columnId, page, rowsPerPage });
    onSortChange && onSortChange({ sortOrder: nextSortOrder, orderBy: columnId, page, rowsPerPage });
    // if (onChange || onSortChange) return;

    // uncontrolled component
    setSortOrder(nextSortOrder);
    setOrderBy(columnId);
  };

  const handlePageChange = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log({ newPage });
    onPageChange && onPageChange({ sortOrder, orderBy, page: newPage, rowsPerPage });
    onChange && onChange({ sortOrder, orderBy, page: newPage, rowsPerPage });

    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rowsPerPage = parseInt(event.target.value);
    const page = 0;

    onRowsPerPageChange && onRowsPerPageChange({ sortOrder, orderBy, page, rowsPerPage });
    onChange && onChange({ sortOrder, orderBy, page, rowsPerPage });

    setRowsPerPage(rowsPerPage);
    setPage(page);
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
                      direction={orderBy === column.id ? sortOrder : 'asc'}
                      onClick={() => handleSort(column.id)}
                      IconComponent={KeyboardArrowDownIcon}
                      role="columnheader"
                    >
                      {column.label.toUpperCase()}
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {sortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
        component="div"
        count={totalItems}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPageOptions={rowsPerPageOptions}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};
