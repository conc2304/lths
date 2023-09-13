import React, { useEffect } from 'react';
import { Box, Button, Link, TableCell, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { NotificationProps, PaginationRequest } from '@lths/features/mms/data-access';
import { useLazyGetNotificationsListQuery } from '@lths/features/mms/data-access';
import { NotificationAdapterProvider, NotificationStatus } from '@lths/features/mms/ui-components';
import { NotificationAction, useEditorActions } from '@lths/features/mms/ui-notifications';
import { Table, TablePaginationProps, TableSortingProps, ActionMenu } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

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

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    fetchData(pagination, sorting);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    fetchData(pagination, sorting);
  };

  const handleSortClick = (pagination: TablePaginationProps, sorting: TableSortingProps) => {
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

  const tableRows = data?.data?.map((row) => {
    const { _id, name, status, sent_on } = row;
    return (
      <TableRow key={`row_${_id}`}>
        <TableCell>
          <Link
            component={RouterLink}
            to={`/notifications/editor/${_id}`}
            color="inherit"
            underline="hover"
            variant="h5"
          >
            {name}
          </Link>
        </TableCell>
        <TableCell>{<NotificationStatus status={status} />}</TableCell>
        <TableCell>{sent_on}</TableCell>
        <TableCell>{row?.data?.topics?.join(', ')}</TableCell>
        <TableCell>
          <ActionMenu options={menuOptions(row)} />
        </TableCell>
      </TableRow>
    );
  });

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
      <Table
        loading={isLoading}
        fetching={isFetching}
        total={total}
        headerCells={headers}
        tableRows={tableRows}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onSortClick={handleSortClick}
        sx={{
          mt: 4,
        }}
      />
    </Box>
  );
};

const WrappedNotificationPage = () => {
  return (
    <NotificationAdapterProvider>
      <NotificationPage />
    </NotificationAdapterProvider>
  );
};

export default WrappedNotificationPage;
