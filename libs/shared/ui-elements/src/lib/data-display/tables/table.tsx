import React, { useEffect, useState } from 'react';
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
import { TableOrderProp, TableProps } from './types';
import { TablePaginationSkeleton, TableRowSkeleton } from '../../feedback/skeletons';
import { TablePaginationProps, TableSortingProps } from '../table-v2';
import { TableTitleRow } from '../table-v2/table-title-row';

const DEFAULT_TABLE_PAGE_SIZE = 25;
const DEFAULT_TABLE_PAGE = 0;
const DEFAULT_TABLE_PAGE_SIZE_OPTIONS = [25, 50, 100];

export const Table = (props: TableProps) => {
  const {
    total = 0,
    loading = false,
    fetching = false,
    title,
    headerCells,
    tableRows,
    pagination: pageProp,
    sorting: sortingProp,
    onExportClick,
    onPageChange,
    sx = {},
    fixPagination = false,
    noDataMessage = 'No records found',
  } = props;

  const [pagination, setPagination] = useState<TablePaginationProps>({
    page: total > 0 ? (pageProp != null ? pageProp.page : DEFAULT_TABLE_PAGE) : 0,
    pageSize: pageProp != null ? pageProp.pageSize : DEFAULT_TABLE_PAGE_SIZE,
  });

  useEffect(() => {
    if (pageProp) {
      setPagination({
        page: total > 0 ? (pageProp != null ? pageProp.page : DEFAULT_TABLE_PAGE) : 0,
        pageSize: pageProp != null ? pageProp.pageSize : DEFAULT_TABLE_PAGE_SIZE,
      });
    }
  }, [pageProp]);

  const [sorting, setSorting] = useState<TableSortingProps>({
    column:
      sortingProp != null
        ? !sortingProp.column && headerCells?.length > 0
          ? headerCells[0].id
          : sortingProp.column
        : null,
    order: (sortingProp != null && sortingProp.order) || 'desc',
  });

  useEffect(() => {
    if (sortingProp) {
      setSorting({
        column:
          sortingProp != null
            ? !sortingProp.column && headerCells?.length > 0
              ? headerCells[0].id
              : sortingProp.column
            : null,
        order: (sortingProp != null && sortingProp.order) || 'desc',
      });
    }
  }, [sortingProp]);

  const handleSortClick = (column: string) => {
    const order: TableOrderProp = column === sorting.column ? (sorting.order === 'desc' ? 'asc' : 'desc') : 'desc';
    const newSorting = { ...sorting, column, order };
    setSorting(newSorting);
    onPageChange && onPageChange(null, pagination, newSorting);
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    const newPagination = { ...pagination, page };
    setPagination(newPagination);
    onPageChange && onPageChange(event, newPagination, sorting);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    const newPagination = { ...pagination, pageSize: newPageSize, page: 0 };
    setPagination(newPagination);
    onPageChange && onPageChange(null, newPagination, sorting);
  };

  const paginationStyles =
    !loading && fixPagination
      ? {
          width: '100%',
          position: 'absolute', // Fix the position
          bottom: 0, // Stick to the bottom
          left: 0,
          right: 0,
          backgroundColor: '#fff', // Optional: To ensure the pagination is visible above any content
          zIndex: 1000, // Optional: To ensure the pagination is above other content
        }
      : {
          width: '100%',
        };
  const hasData = tableRows && tableRows.length > 0;

  return (
    <Box sx={sx}>
      <Paper
        elevation={2}
        sx={{
          width: '100%',
        }}
      >
        {total !== 0 && title && (
          <TableTitleRow title={title} loading={loading} total={total} onExportClick={onExportClick} />
        )}

        <TableContainer
          sx={{
            mt: 1,
            marginBottom: !loading && fixPagination ? '2rem' : '0px',
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
            <TableBody
              sx={{ '& tr': { borderBottom: '1px solid rgba(224, 224, 224, 1)' }, '& td': { border: 'none' } }}
            >
              <TableRowSkeleton
                id="body"
                loading={loading}
                cells={headerCells?.length}
                rows={DEFAULT_TABLE_PAGE_SIZE}
              />
              {!loading && hasData && tableRows}
              {!loading && !hasData && (
                <TableCell colSpan={headerCells.length} align="center" style={{ height: '40vh' }}>
                  {noDataMessage}
                </TableCell>
              )}
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
            sx={paginationStyles}
          />
        )}
      </Paper>
    </Box>
  );
};
