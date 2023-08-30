import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Link, TableCell, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  CreateNotificationRequestProps,
  PaginationRequest,
  useCreateNotificationMutation,
} from '@lths/features/mms/data-access';
import { useLazyGetNotificationsListQuery } from '@lths/features/mms/data-access';
import { Table, TablePaginationProps, TableSortingProps, ActionMenu } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

import FilterNotifications from '../../components/notifications/filter-notifications';
import { CreateNotificationModal } from '../../components/notifications/modals';
import SearchNotifications from '../../components/notifications/search-notifications';

const headers = [
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

  const [createNotification, { isLoading: isCreating }] = useCreateNotificationMutation();

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

  const menuOptions = (notification_id: string) => [
    {
      id: 'edit',
      label: 'Edit',
      action: () => {
        navigate(`/notifications/editor/${notification_id}`);
      },
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      action: () => {
        console.log('handling duplicate ...');
      },
    },
    {
      id: 'archive',
      label: 'Archive',
      action: () => {
        console.log('handling archive...');
      },
    },
    {
      id: 'preview',
      label: 'Preview',
      action: () => {
        console.log('handling preview...');
      },
    },
    {
      id: 'view_insights',
      label: 'View Insights',
      action: () => {
        navigate(`/insights/notifications`);
      },
    },
    {
      id: 'send_now',
      label: 'Send Now',
      action: () => {
        console.log('handling send now...');
      },
    },
  ];

  const tableRows = data?.data?.map((row) => (
    <TableRow key={`row_${row._id}`}>
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
      <TableCell>{row.topics?.join(', ')}</TableCell>
      <TableCell>
        <ActionMenu options={menuOptions(row._id)} />
      </TableCell>
    </TableRow>
  ));

  const total = data?.pagination?.totalItems;

  const handleCreateNotification = async (data: CreateNotificationRequestProps) => {
    const response = await createNotification(data).unwrap();
    // if (response.success) {
    toast.success('Notification has been created successfully.');
    const {
      data: { _id },
    } = response;
    navigate(`/notifications/editor/${_id}`);
    // }
  };

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
        onCreateNotification={handleCreateNotification}
        isResponseLoading={isCreating}
      />
    </Box>
  );
};

export default NotificationPage;
