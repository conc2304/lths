import React, { useState } from 'react';
import {
  Box,
  Button,
  Skeleton,
  Stack,
  SxProps,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Paper from '@mui/material/Paper';

import { TableHeaderCellProps, TableOrderProp, TablePaginationProps, TableProps, TableSortingProps } from './types';
import { formatString } from '../../utils/string-utils';

const DEFAULT_TABLE_PAGE_SIZE = 5;
const DEFAULT_TABLE_PAGE = 1;
const DEFAULT_TABLE_PAGE_SIZE_OPTIONS = [5, 10, 25];

type TableRowSkeletonProps = { id: string; loading: boolean; cells: number; rows?: number };

const TablePaginationSkeleton = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <Stack justifyContent={'flex-end'} direction="row" spacing={4} mr={1}>
      <Skeleton width={140} />
      <Skeleton width={80} />
      <Skeleton width={60} />
    </Stack>
  ) : null;
};

const TableRowSkeleton = ({ id, loading, cells = 5, rows = 1 }: TableRowSkeletonProps) => {
  return loading ? (
    <React.Fragment>
      {Array(rows)
        .fill(null)
        .map((_, r) => (
          <TableRow key={`ske_${id}_row_${r}`}>
            {Array(cells)
              .fill(null)
              .map((_, c) => (
                <TableCell key={`ske_${id}_row_${r}_cell_${c}`}>
                  <Skeleton />
                </TableCell>
              ))}
          </TableRow>
        ))}
    </React.Fragment>
  ) : null;
};

const TableHeaderRow = ({
  cells,
  sorting,
  onSortClick,
}: {
  cells: TableHeaderCellProps[];
  sorting?: TableSortingProps;
  onSortClick?: (column: string) => void;
}) => {
  return !cells ? null : (
    <TableRow>
      {cells.map((head) => (
        <TableCell
          key={head.id}
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          {head.sortable ? (
            <TableSortLabel
              active={sorting.column === head.id}
              direction={sorting.column === head.id ? sorting.order : 'desc'}
              onClick={() => onSortClick(head.id)}
              IconComponent={KeyboardArrowDownIcon}
            >
              {head.label}
            </TableSortLabel>
          ) : (
            head.label
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};
export const Table = (props: TableProps) => {
  const {
    total = 0,
    loading = false,
    fetching = false,
    title,
    headerCells,
    tableRows,
    pagination: page,
    sorting: sort,
    onSortClick,
    onExportClick,
    onPageChange,
    onRowsPerPageChange,
    sx = {},
  } = props;

  const [pagination, setPagination] = useState<TablePaginationProps>({
    page: total > 0 ? (page != null ? page.page : DEFAULT_TABLE_PAGE) : 0,
    pageSize: page != null ? page.pageSize : DEFAULT_TABLE_PAGE_SIZE,
  });

  const [sorting, setSorting] = useState<TableSortingProps>({
    column: sort != null ? (!sort.column && headerCells?.length > 0 ? headerCells[0].id : sort.column) : null,
    order: (sort != null && sort.order) || 'asc',
  });

  const _onSortClick = (column: string) => {
    const order: TableOrderProp = column === sorting.column ? (sorting.order === 'desc' ? 'asc' : 'desc') : 'asc';
    const newSorting = { ...sorting, column, order };
    setSorting(newSorting);
    onSortClick && onSortClick(pagination, newSorting);
  };

  const _onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    const newPagination = { ...pagination, page };
    setPagination(newPagination);
    onPageChange && onPageChange(event, newPagination, sorting);
  };

  const _onRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onRowsPerPageChange && onRowsPerPageChange(event);
  };

  return (
    <Box sx={sx}>
      <Paper
        elevation={2}
        sx={{
          width: '100%',
          p: 2,
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h2" fontWeight={400}>
            {formatString(title, total.toLocaleString())}
          </Typography>
          {onExportClick && (
            <Button variant="outlined" onClick={onExportClick}>
              EXPORT
            </Button>
          )}
        </Stack>
        <TableContainer
          sx={{
            mt: 4,
          }}
        >
          <MuiTable>
            <TableHead>
              <TableRowSkeleton id="head" loading={loading} cells={headerCells?.length} />
              <TableHeaderRow cells={headerCells} sorting={sorting} onSortClick={_onSortClick} />
            </TableHead>
            <TableBody>
              <TableRowSkeleton id="body" loading={loading} cells={headerCells?.length} rows={DEFAULT_TABLE_PAGE_SIZE} />
              {!loading && tableRows}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePaginationSkeleton loading={loading} />
        {!loading && (
          <TablePagination
            component="div"
            rowsPerPageOptions={DEFAULT_TABLE_PAGE_SIZE_OPTIONS}
            count={total}
            page={pagination.page}
            onPageChange={_onPageChange}
            rowsPerPage={pagination.pageSize}
            onRowsPerPageChange={_onRowsPerPageChange}
            sx={{
              width: '100%',
            }}
          />
        )}
      </Paper>
    </Box>
  );
};
