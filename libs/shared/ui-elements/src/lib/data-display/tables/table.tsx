import React, { useState } from 'react';
import {
  Box,
  LinearProgress,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
} from '@mui/material';
import Paper from '@mui/material/Paper';

import { TableHeaderRow } from './table-header-row';
import { TableTitleRow } from './table-title-row';
import { TableOrderProp, TablePaginationProps, TableProps, TableSortingProps } from './types';
import { TablePaginationSkeleton, TableRowSkeleton } from '../../feedback/skeletons';

const DEFAULT_TABLE_PAGE_SIZE = 5;
const DEFAULT_TABLE_PAGE = 1;
const DEFAULT_TABLE_PAGE_SIZE_OPTIONS = [5, 10, 25];

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

  const handleSortClick = (column: string) => {
    const order: TableOrderProp = column === sorting.column ? (sorting.order === 'desc' ? 'asc' : 'desc') : 'asc';
    const newSorting = { ...sorting, column, order };
    setSorting(newSorting);
    onSortClick && onSortClick(pagination, newSorting);
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    const newPagination = { ...pagination, page };
    setPagination(newPagination);
    onPageChange && onPageChange(event, newPagination, sorting);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newPagination = { ...pagination, page: 0, pageSize: parseInt(event.target.value, 10) };
    setPagination(newPagination);
    onRowsPerPageChange && onRowsPerPageChange(event, newPagination, sorting);
  };

  return (
    <Box sx={sx}>
      <Paper
        elevation={2}
        sx={{
          width: '100%',
        }}
      >
        <TableTitleRow title={title} loading={loading} total={total} onExportClick={onExportClick} />

        <TableContainer
          sx={{
            mt: 1,
          }}
        >
          <MuiTable>
            <TableHead>
              <TableRowSkeleton id="head" loading={loading} cells={headerCells?.length} />
              <TableHeaderRow cells={headerCells} sorting={sorting} onSortClick={handleSortClick} />
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
              <TableRowSkeleton
                id="body"
                loading={loading}
                cells={headerCells?.length}
                rows={DEFAULT_TABLE_PAGE_SIZE}
              />
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
            onPageChange={handlePageChange}
            rowsPerPage={pagination.pageSize}
            onRowsPerPageChange={handleRowsPerPageChange}
            sx={{
              width: '100%',
            }}
          />
        )}
      </Paper>
    </Box>
  );
};
