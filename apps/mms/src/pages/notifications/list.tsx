import React, { useEffect } from 'react';
import { Box, Button, Link, TableCell, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { NotificationProps, PaginationRequest } from '@lths/features/mms/data-access';
import { useLazyGetNotificationsListQuery } from '@lths/features/mms/data-access';
import { NotificationAdapterProvider, NotificationStatus } from '@lths/features/mms/ui-components';
import { NotificationAction, useEditorActions } from '@lths/features/mms/ui-notifications';
import { TablePaginationProps, TableSortingProps, ActionMenu, RowBuilderFn, Table } from '@lths/shared/ui-elements';
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
  const handleOnChange = ({ page, rowsPerPage, sortOrder, orderBy }) => {
    const pagination: TablePaginationProps = {
      page,
      pageSize: rowsPerPage,
    };

    const sorting: TableSortingProps = {
      order: sortOrder,
      column: orderBy,
    };
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
      isDisabled: false,
    },
  ];

  const RowBuilder = (): RowBuilderFn<NotificationProps> => {
    return ({ data: row, rowNumber, showRowNumber }) => {
      const { _id, name, status, sent_on } = row;
      return (
        <TableRow key={`row_${_id}`}>
          {!!showRowNumber && (
            <TableCell
              align="center"
              sx={{
                color: (theme) => theme.palette.grey[500],
                fontsize: '0.75rem',
              }}
            >
              {rowNumber}
            </TableCell>
          )}
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
    };
  };

  const total = data?.pagination?.totalItems;

  return (
    <Box>
      <PageHeader
        title="Notifications"
        rightContent={
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            onClick={() => openNotificationAlert(NotificationAction.CREATE)}
          >
            CREATE
          </Button>
        }
        sx={{ mt: 2 }}
      />
      <Table
        data={data?.data ?? []}
        headerCells={headers}
        rowBuilder={RowBuilder()}
        onChange={handleOnChange}
        loading={isLoading}
        fetching={isFetching}
        total={total}
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
