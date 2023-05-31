import React, { useEffect } from 'react';
import { Box, Button, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FeedbackIcon from '@mui/icons-material/Feedback';
import InventoryIcon from '@mui/icons-material/Inventory';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

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

const statusIcon = {
  Draft: <BorderColorIcon htmlColor="#F9A61A" />,
  Published: <CheckCircleIcon htmlColor="#00BA00" />,
  Archived: <InventoryIcon htmlColor="gray" />,
  Scheduled: <WatchLaterIcon htmlColor="#05B5E4" />,
  'Pending approval': <PendingActionsIcon htmlColor="gold" />,
  'Changes requested': <FeedbackIcon htmlColor="orange" />,
  Expired: <TimerOffIcon htmlColor="red" />,
};

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
          <Typography variant="h5">{row.name}</Typography>
          <Typography variant="subtitle1">{row.pageId}</Typography>
        </Stack>
      </TableCell>
      <TableCell>{row.type}</TableCell>
      <TableCell>{row.constraints}</TableCell>
      <TableCell>
        <Typography variant="body1" color="#0091FF">
          {row.lastEditor}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <Typography variant="body1">{row.status}</Typography>
            <Typography variant="body1">{row.lastModified}</Typography>
          </Box>
          {statusIcon[row.status]}
        </Stack>
      </TableCell>
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
