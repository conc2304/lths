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

import { ListViewColumnHeader, TableChangeEvent, RowBuilderFn, SortDirection } from './types';
import { BaseColumnValue, getComparator } from './utils';
import { TableRowSkeleton } from '../../feedback';
import { TableTitleRow } from '../tables/table-title-row';

export type ListViewProps<TData extends object = Record<any, any>> = {
  headerCells: ListViewColumnHeader[];
  rowBuilder: RowBuilderFn<TData>;
  headerToCellValueMap?: (data: TData, column: string) => Date | string | number | undefined;
  title?: string;
  onChange?: (options: TableChangeEvent) => void;
  data: TData[];
  page?: number;
  onPageChange?: ({ page, rowsPerPage }: { page: number; rowsPerPage: number }) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: ({ page, rowsPerPage }: { page: number; rowsPerPage: number }) => void;
  rowsPerPageOptions?: number[];
  sortOrder?: SortDirection;
  orderBy?: string;
  onSortChange?: ({ sortOrder, orderBy }: { sortOrder: SortDirection; orderBy: string }) => void;
  total?: number;
  loading?: boolean;
  fetching?: boolean;
  onExport?: () => void;
  userSettingsStorageKey?: string;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showRowNumber?: boolean;
};

const DEFAULT_ROWS_PER_PAGE = 25;
const DEFAULT_TABLE_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

/**
 * ListView component for displaying data in a paginated and sortable table format.
 * The component is made to handle both data as a controlled and uncontrolled component.
 * For server side data that handles pagination and sorting, pass in the page, rowsPerPage, sortOrder, and orderBy props.
 * For client side data, leave those blank and the component will handle it internally.
 *
 * It is recommended to use the onChange prop to access global table change events.
 * The more granular onXChanges are meant for when you need granal event listeners ie, reporting, storage, analytics
 *
 * @Component
 * @param {ListViewColumnHeader[]} props.headerCells - An array of column header definitions.
 * @param {RowBuilderFn} props.rowBuilder - A function that builds table rows from data.
 * @param {Function} [props.headerToCellValueMap] - A function to map data to cell values.
 * @param {string} [props.title] - The title to display above the table.
 * @param {Function} [props.onChange] - A callback function called when table options change.
 * @param {Array} props.data - The data to display in the table.
 * @param {number} [props.page] - The current page number.
 * @param {Function} [props.onPageChange] - A callback function called when the page changes.
 * @param {number} [props.rowsPerPage] - The number of rows per page.
 * @param {Function} [props.onRowsPerPageChange] - A callback function called when rows per page change.
 * @param {number[]} [props.rowsPerPageOptions] - An array of available rows per page options.
 * @param {string} [props.sortOrder] - The current sort order ('asc' or 'desc').
 * @param {string} [props.orderBy] - The currently sorted column ID.
 * @param {Function} [props.onSortChange] - A callback function called when sorting options change.
 * @param {number} [props.total] - Leave Blank for clientside data. The total number of items in the serverside dataset.
 * @param {boolean} [props.loading] - Indicates whether data is loading.
 * @param {boolean} [props.fetching] - Indicates whether data is being fetched.
 * @param {Function} [props.onExport] - A callback function called when the export button is clicked.
 * @param {string} [props.userSettingsStorageKey] - The key for storing user settings in local storage.
 * @param {boolean} [props.showFirstButton] - Show the "First Page" button in pagination.
 * @param {boolean} [props.showLastButton] - Show the "Last Page" button in pagination.
 * @param {boolean} [props.showRowNumber] - Show row numbers in the table.
 * @returns {JSX.Element} - The rendered ListView component.
 */
export const ListView = (props: ListViewProps<Record<any, any>>): JSX.Element => {
  const {
    data = [],
    headerCells,
    rowBuilder,
    headerToCellValueMap = BaseColumnValue,
    title,
    onChange,
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
    showFirstButton = false,
    showLastButton = false,
    showRowNumber = false,
  } = props;

  const persistantSettings = userSettingsStorageKey
    ? JSON.parse(localStorage.getItem(userSettingsStorageKey) ?? '{}')
    : {};

  const [sortOrder, setSortOrder] = useState<SortDirection>(sortOrderProp ?? 'asc');
  const [orderBy, setOrderBy] = useState<string>(orderByProp ?? headerCells[0].id);
  const [page, setPage] = useState(pageProp ?? DEFAULT_TABLE_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(
    persistantSettings.rowsPerPage ?? rowsPerPageProp ?? DEFAULT_ROWS_PER_PAGE
  );

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
    onSortChange && onSortChange({ sortOrder: nextSortOrder, orderBy: columnId });

    // uncontrolled component
    setSortOrder(nextSortOrder);
    setOrderBy(columnId);
  };

  const handlePageChange = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange && onPageChange({ page: newPage, rowsPerPage });
    onChange && onChange({ sortOrder, orderBy, page: newPage, rowsPerPage });

    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rowsPerPage = parseInt(event.target.value);
    const page = 0;

    userSettingsStorageKey &&
      localStorage.setItem(userSettingsStorageKey, JSON.stringify({ ...persistantSettings, rowsPerPage }));

    onRowsPerPageChange && onRowsPerPageChange({ page, rowsPerPage });
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
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
      />
    </Box>
  );
};
