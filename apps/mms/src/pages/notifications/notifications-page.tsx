import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Link, TableCell, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { PaginationRequest } from 'libs/features/mms/data-access/src/lib/types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useLazyGetNotificationsListQuery } from '@lths/features/mms/data-access';
import { OverflowMenu, Table, TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

import CreateNotificationModal from '../../components/notifications/create-notification-modal';
import FilterNotifications from '../../components/notifications/filter-notifications';
import SearchNotifications from '../../components/notifications/search-notifications';

const headers = [
  {
    id: 'id',
    label: 'ID',
    sortable: true,
  },
  {
    id: 'name',
    label: 'NAME',
    sortable: true,
  },
  {
    id: 'status',
    label: 'STATUS',
    sortable: true,
  },
  {
    id: 'sent',
    label: 'SENT',
    sortable: true,
  },
  {
    id: 'topics',
    label: 'TOPICS',
    sortable: true,
  },
  {
    id: 'actions',
    label: '',
    sortable: false,
  },
];

const NotificationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  const [getData, { isFetching, isLoading, data }] = useLazyGetNotificationsListQuery();

  async function fetchData(pagination: TablePaginationProps, sorting: TableSortingProps) {
    const req: PaginationRequest = {};
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

  const menuOptions = (page_id) => [
    {
      id: 'edit page',
      label: 'EDIT PAGE',
      action: () => {
        navigate(`/pages/editor/${page_id}`);
      },
    },
    {
      id: 'preview',
      label: 'PREVIEW',
      action: () => {
        console.log('handling preview ...');
      },
    },
    {
      id: 'share',
      label: 'SHARE',
      action: () => {
        console.log('handling share...');
      },
    },
    {
      id: 'duplicate',
      label: 'DUPLICATE',
      action: () => {
        console.log('handling duplicate...');
      },
    },
    {
      id: 'view insights',
      label: 'VIEW INSIGHTS',
      action: () => {
        navigate(`/insights/pages`);
      },
    },
    {
      id: 'delete',
      label: 'DELETE',
      action: () => {
        console.log('handling delete...');
      },
    },
  ];

  const tableRows = data?.data?.map((row) => (
    <TableRow key={`row_${row._id}`}>
      <TableCell>{row._id}</TableCell>
      <TableCell>
        <Link
          component={RouterLink}
          to={`/notifications/editor/${row._id}`}
          color="inherit"
          underline="hover"
          variant="h5"
        >
          {row.name}
        </Link>
      </TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>{row.sent_on}</TableCell>
      <TableCell>{row.topic?.join(', ')}</TableCell>
      <TableCell>
        <OverflowMenu items={menuOptions(row._id)} />
      </TableCell>
    </TableRow>
  ));

  const total = data?.pagination?.totalItems;

  return (
    <Box>
      <PageHeader
        title="Notifications"
        rightContent={
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => setIsModalOpen(true)}>
            CREATE
          </Button>
        }
        sx={{ mt: 2 }}
      />
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={8}>
          <SearchNotifications />
        </Grid>
        <Grid item xs={2}>
          <FilterNotifications />
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ padding: 1.8 }}>
            EXPORT DATA
          </Button>
        </Grid>
      </Grid>
      <Table
        loading={isLoading}
        fetching={isFetching}
        total={total}
        headerCells={headers}
        tableRows={tableRows}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        onSortClick={onSortClick}
        sx={{
          mt: 4,
        }}
      />
      <CreateNotificationModal
        open={isModalOpen}
        handleCloseModal={closeModal}
        onCreateNotification={(notification_id) => navigate(`/notifications/editor/${notification_id}`)}
      />
    </Box>
  );
};

export default NotificationPage;
