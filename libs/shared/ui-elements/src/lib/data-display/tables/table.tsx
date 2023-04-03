import React from 'react';
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
import { TableProps } from './types';

export const Table = (props: TableProps) => {
  const {
    totalCount,
    title,
    onExportClick,
    onPageChange,
    onRowsPerPageChange,
    headers,
    tableRows,
    pagination: { page, itemsPerPage },
    sorting: { order, orderBy },
    handleSortRequest,
    sx = {},
  } = props;

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
            {totalCount && totalCount.toLocaleString()} {title}
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
                {headers.map((head) => (
                  <TableCell
                    key={head.id}
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                    }}
                  >
                    {head.sortable ? (
                      <TableSortLabel
                        active={orderBy === head.id}
                        direction={orderBy === head.id ? order : 'desc'}
                        onClick={() => handleSortRequest(head.id)}
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
          rowsPerPageOptions={[5, 10, 25]}
          count={totalCount}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={itemsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          sx={{
            width: '100%',
          }}
        />
      </Paper>
    </Box>
  );
};
