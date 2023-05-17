import React, { useEffect } from 'react';
import { Box, Button, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { PagesDataRequest, useLazyGetPagesItemsQuery } from '@lths/features/mms/data-access';
import { Table, TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

const headers = [
  {
    id: 'name',
    label: 'PAGE NAME',
    sortable: true,
  },
  {
    id: 'type',
    label: 'TYPE',
    sortable: true,
  },
  {
    id: 'constraints',
    label: 'CONSTRAINTS',
    sortable: true,
  },
  {
    id: 'lastEditor',
    label: 'LAST EDITOR',
    sortable: true,
  },
  {
    id: 'status',
    label: 'STATUS',
    sortable: true,
  },
  {
    id: 'actions',
    label: '',
    sortable: false,
  },
];

const Pages = (): JSX.Element => {
  const [getData, { isFetching, isLoading, data }] = useLazyGetPagesItemsQuery();

  async function fetchData(pagination: TablePaginationProps, sorting: TableSortingProps) {
    const req: PagesDataRequest = {};
    if (pagination != null) {
      req.page = pagination.page;
      req.page_size = pagination.pageSize;
    }
    if (sorting != null) {
      req.sort_key = sorting.column;
      req.sort_order = sorting.order;
    }

    getData(req);
  }

  useEffect(() => {
    fetchData(null, undefined);
  }, []);

  console.log('pages data', data);

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    fetchData(pagination, sorting);
  };

  const onRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    fetchData(pagination, sorting);
  };
  const onSortClick = (pagination: TablePaginationProps, sorting: TableSortingProps) => {
    fetchData(pagination, sorting);
  };

  const tableRows = data?.data?.map((row) => (
    <TableRow key={row.id}>
      <TableCell>
        <Stack>
          <Typography variant="h3">{row.name}</Typography>
          <Typography variant="subtitle1">{row.pageId}</Typography>
        </Stack>
      </TableCell>
      <TableCell>{row.type}</TableCell>
      <TableCell>{row.constraints}</TableCell>
      <TableCell>{row.lastEditor}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  const total = data?.meta.total;

  return (
    <Box>
      <PageHeader
        title="Pages"
        rightContent={
          <Button variant="contained" onClick={() => console.log(`handling create page`)}>
            CREATE PAGE
          </Button>
        }
        sx={{ mt: 2 }}
      />
      <Table
        loading={isLoading}
        fetching={isFetching}
        total={total}
        title="{0} total pages"
        headerCells={headers}
        tableRows={tableRows}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        onSortClick={onSortClick}
        sx={{
          mt: 4,
        }}
      />
    </Box>
  );
};

export default Pages;
