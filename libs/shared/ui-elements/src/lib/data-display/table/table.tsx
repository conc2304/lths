import { ChangeEvent, MouseEvent, cloneElement, useEffect, useMemo, useState } from 'react';
import {
  Box,
  LinearProgress,
  SxProps,
  Table as TableMui,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Theme,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { visuallyHidden } from '@mui/utils';
import { capitalize, toLower, toUpper } from 'lodash';

import { findClosestNumber } from '@lths/shared/utils';

import { BaseRowBuilder } from './row-builder';
import { TableTitleRow } from './table-title-row';
import {
  TableColumnHeader,
  TableChangeEvent,
  RowBuilderFn,
  SortDirection,
  PersistantUserSettings,
  ColumnLabelTextFormat,
} from './types';
import { BaseColumnValue, getComparator } from './utils';
import { TableRowSkeleton } from '../../feedback';

export type TableProps<TData extends object = Record<string, unknown>> = {
  headerCells: TableColumnHeader[];
  data: TData[];
  rowBuilder?: RowBuilderFn<TData>;
  selectedRowId?: string;
  headerToCellValueMap?: (data: TData, column: string) => Date | string | number | undefined;
  title?: string;
  onChange?: (options: TableChangeEvent) => void;
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
  noDataMessage?: string;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showRowNumber?: boolean;
  sx?: SxProps<Theme>;
  columnLabelFormat?: ColumnLabelTextFormat;
};

const DEFAULT_ROWS_PER_PAGE = 25;
const DEFAULT_TABLE_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

/**
 * Table component for displaying data in a paginated and sortable table format.
 * The component is made to handle both data as a controlled and uncontrolled component.
 * For server side data that handles pagination and sorting, pass in the page, rowsPerPage, sortOrder, and orderBy props.
 * For client side data, leave those blank and the component will handle it internally.
 *
 * It is recommended to use the onChange prop to access global table change events.
 * The more granular onXChanges are meant for when you need granal event listeners ie, reporting, storage, analytics
 *
 * @Component
 * @param {TableColumnHeader[]} props.headerCells - An array of column header definitions.
 * @param {RowBuilderFn} props.rowBuilder - A function that returns an react fragment containing only the table cells. DO NOT include the table row element.
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
 * @param {string} [props.noDataMessage] - Message to show when the table is empty
 * @param {boolean} [props.showFirstButton] - Show the "First Page" button in pagination.
 * @param {boolean} [props.showLastButton] - Show the "Last Page" button in pagination.
 * @param {boolean} [props.showRowNumber] - Show the row number in the data row. If using a rowBuilder function, that fn should have a cell for row number
 * @param {boolean} [props.sx] - Custom SX styles to be applied to the Box wrapper element.
 * @param {string} [props.columnLabelFormat] - Text formatting for column labels. either 'uppercase' | 'lowercase' | 'capitalize'
 * @returns {JSX.Element} - The rendered ListView component.
 */
export const Table = (props: TableProps<Record<string, unknown>>): JSX.Element => {
  const {
    data,
    headerCells,
    rowBuilder = BaseRowBuilder,
    selectedRowId,
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
    noDataMessage = 'No records found',
    showFirstButton = false,
    showLastButton = false,
    showRowNumber = false,
    sx = {},
    columnLabelFormat = 'capitalize',
  } = props;

  const persistantSettings: PersistantUserSettings = userSettingsStorageKey
    ? JSON.parse(localStorage.getItem(userSettingsStorageKey) ?? '{}')
    : {};

  const initialRowsPerPage =
    typeof rowsPerPageProp === 'number'
      ? // don't allow any value that is not an one of the options to be set for rowsPerPage
        findClosestNumber(rowsPerPageProp, rowsPerPageOptions)
      : persistantSettings.rowsPerPage !== undefined ? 
        parseInt(persistantSettings.rowsPerPage as string)
      : DEFAULT_ROWS_PER_PAGE;

  const [sortOrder, setSortOrder] = useState<SortDirection>(sortOrderProp ?? 'asc');
  const [orderBy, setOrderBy] = useState<string>(orderByProp ?? headerCells[0].id);
  const [page, setPage] = useState(pageProp ?? DEFAULT_TABLE_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [selectedRow, setSelectedRow] = useState(selectedRowId);

  useEffect(() => {
    setPage(pageProp || 0);
    setRowsPerPage(initialRowsPerPage);
    setSortOrder(sortOrderProp ?? 'asc');
    setOrderBy(orderByProp ?? headerCells[0].id);
  }, [pageProp, rowsPerPageProp, sortOrderProp, orderByProp]);

  useEffect(() => {
    setSelectedRow(selectedRowId);
  }, [selectedRowId]);

  const sortingIsControlled = Boolean(sortOrderProp && orderByProp);
  const paginationIsControlled = Boolean(pageProp !== undefined && rowsPerPageProp);
  const isComponentUncontrolled = !sortingIsControlled && !paginationIsControlled;

  useEffect(() => {
    if (isComponentUncontrolled) {
      // on an uncontrolled/client side table
      // if the data changes go back to page 0
      setPage(0);
    }
  }, [data]);

  const totalItems = total ?? data.length ?? 0;

  const labelFormatters: Record<ColumnLabelTextFormat, (text: string) => string> = {
    uppercase: (text: string) => toUpper(text),
    lowercase: (text: string) => toLower(text),
    capitalize: (text: string) => capitalize(text),
    unformatted: (text: string) => text,
  };

  const tableRows = useMemo(() => {
    if (!data) return [];

    // controlled data is expected to come sorted and paginated directly from the server
    // so we leave that alone

    const dataCopy = data.slice();

    // if we have sortOrder & orderByProp then its a controlled / server-side-driven component
    // otherwise its an un(internally)controlled component
    const sortedData = sortingIsControlled
      ? dataCopy
      : dataCopy.sort((a, b) =>
          getComparator(sortOrder)(headerToCellValueMap(a, orderBy), headerToCellValueMap(b, orderBy))
        );

    // if we have pageProp & rowsPerPageProp then its a controlled / server-side-driven component
    // otherwise its an un(internally)controlled component
    const paginatedData = paginationIsControlled
      ? sortedData
      : sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const visibleData = paginatedData;

    return visibleData.length > 0
      ? visibleData.map((data, i) =>
          rowBuilder({
            data,
            headerCells,
            showRowNumber,
            rowNumber: page * (rowsPerPage + i) + 1,
            noDataMessage,
            selectedRowId: selectedRow,
          })
        )
      : [
          <TableRow key={0}>
            <TableCell colSpan={headerCells.length}>{noDataMessage}</TableCell>
          </TableRow>,
        ];
  }, [data, sortOrder, orderBy, page, rowsPerPage, rowsPerPageProp, sortOrderProp, orderByProp, pageProp, selectedRow]);

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && sortOrder === 'asc';
    const nextSortOrder = isAsc ? 'desc' : 'asc';

    onChange && onChange({ sortOrder: nextSortOrder, orderBy: columnId, page, rowsPerPage });
    onSortChange && onSortChange({ sortOrder: nextSortOrder, orderBy: columnId });

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
    <Box data-testid="Table--root" sx={sx}>
      {totalItems !== 0 && title && (
        <TableTitleRow title={title} loading={!!loading} total={totalItems} onExportClick={onExport} />
      )}
      <TableContainer>
        <TableMui>
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
              {!loading &&
                headerCells.map((column) => {
                  const label = labelFormatters[columnLabelFormat](column.label) ?? column.label;
                  return (
                    <TableCell
                      key={`th-${column.id}`}
                      align={column.align ?? 'left'}
                      width={column.width}
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                        fontSize: (theme) => theme.typography.pxToRem(16),
                      }}
                    >
                      {column.sortable && (
                        <TableSortLabel
                          active={column.id === orderBy}
                          direction={orderBy === column.id ? sortOrder : 'asc'}
                          onClick={() => handleSort(column.id)}
                          IconComponent={KeyboardArrowDownIcon}
                          role="columnheader"
                          sx={{
                            transition: 'color 150ms ease-in',
                            fontSize: 'inherit',
                            pl: column?.align === 'center' ? '22px' : undefined, // the sort arrow is 18px + 4 for margins so offset for that
                            color: (theme) =>
                              column.id === orderBy ? theme.palette.text.primary : theme.palette.text.secondary,
                          }}
                        >
                          {label}
                          {orderBy === column.id ? (
                            <Box component="span" sx={visuallyHidden}>
                              {sortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      )}
                      {!column.sortable && label}
                    </TableCell>
                  );
                })}
            </TableRow>
            {/* Progress Loader */}
            {!loading && fetching && (
              <TableRow>
                <TableCell
                  sx={{
                    p: 0,
                  }}
                  colSpan={headerCells.length}
                >
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
          </TableHead>

          <TableBody>
            <TableRowSkeleton id="body" loading={Boolean(loading)} cells={headerCells?.length} rows={rowsPerPage} />
            {!loading &&
              !!tableRows?.length &&
              tableRows.map((row, i) => {
                return cloneElement(row, { key: `tr-${i}` });
              })}
          </TableBody>
        </TableMui>
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
