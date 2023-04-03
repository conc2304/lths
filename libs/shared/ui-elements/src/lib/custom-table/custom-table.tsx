import React from 'react';
import {
  Box,
  Button,
  Stack,
  SxProps,
  Table,
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

interface HeadCell {
  id: string;
  label: string;
  sortable: boolean;
}

export type Order = 'asc' | 'desc';

export interface CustomTableProps {
  totalCount: number;
  title: string;
  handleExport?: () => void;
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void;
  handleChangeRowsPerPage: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  headers: HeadCell[];
  tableRows: JSX.Element[];
  pagination: {
    page: number;
    itemsPerPage: number;
  };
  sorting: {
    order: Order;
    orderBy: string;
  };
  handleSortRequest: (key: string) => void;
  sx?: SxProps;
}

export function CustomTable(props: CustomTableProps) {
  const {
    totalCount,
    title,
    handleExport,
    handlePageChange,
    handleChangeRowsPerPage,
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
          {handleExport && (
            <Button variant="outlined" onClick={handleExport}>
              EXPORT
            </Button>
          )}
        </Stack>
        <TableContainer
          sx={{
            mt: 4,
          }}
        >
          <Table>
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
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={totalCount}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={itemsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            width: '100%',
          }}
        />
      </Paper>
    </Box>
  );
}

export default CustomTable;
