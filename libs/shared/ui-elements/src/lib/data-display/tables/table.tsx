import React, { useState } from 'react';
import {
  Box,
  Button,
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
import { TableOrderProp, TablePaginationProps, TableProps, TableSortingProps } from './types';
import { formatString } from '../../utils/string-utils';
const DEFAULT_TABLE_PAGE_SIZE = 5;
const DEFAULT_TABLE_PAGE = 1;
const DEFAULT_TABLE_PAGE_SIZE_OPTIONS = [5, 10, 25];
export const Table = (props: TableProps) => {
  const {
    total = 0,
    loading = false,
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
    const newSorting = { ...sorting, column };
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
              <TableRow>
                {headerCells.map((head) => (
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
                        onClick={() => _onSortClick(head.id)}
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
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </MuiTable>
        </TableContainer>
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
      </Paper>
    </Box>
  );
};
