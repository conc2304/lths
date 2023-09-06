import React, { useEffect } from 'react';
import { Box, Button, Grid, Link, TableCell, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { NotificationAction, useEditorActions } from '@lths-mui/features/mms/ui-notifications';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { NotificationProps, PaginationRequest } from '@lths/features/mms/data-access';
import { useLazyGetNotificationsListQuery } from '@lths/features/mms/data-access';
import { Table, TablePaginationProps, TableSortingProps, ActionMenu } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

import ConnectedNotificationWrapper from './notification-wrapper';
import Status from '../../components/notifications/editor/status';
import FilterNotifications from '../../components/notifications/filter-notifications';
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
  // route params
  const navigate = useNavigate();

  // api
  const { selectNotification, openNotificationAlert } = useEditorActions();
  const [getData, { isFetching, isLoading, data }] = useLazyGetNotificationsListQuery();

  // fetch
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

  // side effects
  useEffect(() => {
    fetchData(null, undefined);
  }, []);

  // handlers

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

  const menuOptions = (notification: NotificationProps) => [
    {
      id: 'edit',
      label: 'Edit',
      action: () => {
        navigate(`/notifications/editor/${notification._id}`);
      },
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      action: () => {
        selectNotification(notification);
        openNotificationAlert(NotificationAction.DUPLICATE);
      },
    },
    {
      id: 'archive',
      label: 'Archive',
      action: () => {
        selectNotification(notification);
        openNotificationAlert(NotificationAction.ARCHIVE);
      },
    },
    {
      id: 'preview',
      label: 'Preview',
      action: () => {
        console.log('Not implemented: preview');
      },
    },
    {
      id: 'view_insights',
      label: 'View Insights',
      action: () => {
        navigate('Not implemented: insights');
      },
    },
    {
      id: 'send_now',
      label: 'Send Now',
      action: () => {
        selectNotification(notification);
        openNotificationAlert(NotificationAction.PUSH);
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
      <TableCell>{<Status status={row.status} />}</TableCell>
      <TableCell>{row.sent_on}</TableCell>
      <TableCell>{row?.data?.topics?.join(', ')}</TableCell>
      <TableCell>
        <ActionMenu options={menuOptions(row)} />
      </TableCell>
    </TableRow>
  ));

  const total = data?.pagination?.totalItems;

  return (
    <Box>
      <PageHeader
        title="Notifications"
        rightContent={
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primaryButton"
            onClick={() => openNotificationAlert(NotificationAction.CREATE)}
          >
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
    </Box>
  );
};

const WrappedNotificationPage = () => {
  return (
    <ConnectedNotificationWrapper>
      <NotificationPage />
    </ConnectedNotificationWrapper>
  );
};

export default WrappedNotificationPage;
