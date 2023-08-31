import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Link, TableCell, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  CreateNotificationRequestProps,
  NotificationProps,
  PaginationRequest,
  useArchiveNotificationMutation,
  useCreateNotificationMutation,
  useDuplicateNotificationMutation,
  useSendNotificationMutation,
} from '@lths/features/mms/data-access';
import { useLazyGetNotificationsListQuery } from '@lths/features/mms/data-access';
import { Table, TablePaginationProps, TableSortingProps, ActionMenu } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

import Status from '../../components/notifications/editor/status';
import FilterNotifications from '../../components/notifications/filter-notifications';
import {
  ArchiveAlert,
  CreateNotificationModal,
  DuplicateAlert,
  SendAlert,
} from '../../components/notifications/modals';
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
  const [isSendAlertOpen, setIsSendAlertOpen] = useState(false);
  const [isArchiveAlertOpen, setIsArchiveAlertOpen] = useState(false);
  const [isDuplicateAlertOpen, setIsDuplicateAlertOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationProps>(null);

  const navigate = useNavigate();

  const [getData, { isFetching, isLoading, data }] = useLazyGetNotificationsListQuery();

  const [createNotification, { isLoading: isCreating }] = useCreateNotificationMutation();
  const [sendNotification, { isLoading: isSending }] = useSendNotificationMutation();

  const [duplicateNotification, { isLoading: isDuplicating }] = useDuplicateNotificationMutation();

  const [archiveNotification, { isLoading: isArchiving }] = useArchiveNotificationMutation();

  const closeModal = () => setIsModalOpen(false);
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

  const handleSendAlertClose = () => {
    setIsSendAlertOpen(false);
  };

  const handleSendNotification = async () => {
    try {
      const response = await sendNotification(selectedNotification).unwrap();
      if (response.success) {
        setIsSendAlertOpen(false);
        toast.success('Notification has been sent successfully');
        fetchData(null, undefined);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in sending the notification', error);
      toast.error('Failed to send the notification');
    }
  };

  const handleArchiveAlertClose = () => {
    setIsArchiveAlertOpen(false);
  };

  const handleArchiveNotification = async () => {
    try {
      const response = await archiveNotification(selectedNotification._id).unwrap();
      if (response.success) {
        setIsArchiveAlertOpen(false);
        toast.success('Notification has been archived successfully');
        fetchData(null, undefined);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in archiving the notification', error);
      toast.error('Failed to archive the notification');
    }
  };

  const handleDuplicateAlertClose = () => {
    setIsDuplicateAlertOpen(false);
  };

  const handleDuplicateNotification = async () => {
    try {
      const response = await duplicateNotification({ id: selectedNotification._id }).unwrap();
      if (response.success) {
        setIsDuplicateAlertOpen(false);
        toast.success('Notification has been duplicated successfully');
        if (response.data) navigate(`/notifications/editor/${response.data._id}`);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in duplicating the notification', error);
      toast.error('Failed to duplicate the notification');
    }
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
        setSelectedNotification(notification);
        setIsDuplicateAlertOpen(true);
      },
    },
    {
      id: 'archive',
      label: 'Archive',
      action: () => {
        setSelectedNotification(notification);
        setIsArchiveAlertOpen(true);
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
        setSelectedNotification(notification);
        setIsSendAlertOpen(true);
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
      <TableCell>{row.sent_on_formatted}</TableCell>
      <TableCell>{row.topics?.join(', ')}</TableCell>
      <TableCell>
        <ActionMenu options={menuOptions(row)} />
      </TableCell>
    </TableRow>
  ));

  const total = data?.pagination?.totalItems;

  const handleCreateNotification = async (data: CreateNotificationRequestProps) => {
    try {
      const response = await createNotification(data).unwrap();
      if (response.success) {
        toast.success('Notification has been created successfully.');
        const {
          data: { _id },
        } = response;
        navigate(`/notifications/editor/${_id}`);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error in create the notification', error);
      toast.error('Failed to create the notification');
    }
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
      <SendAlert
        isLoading={isSending}
        isOpen={isSendAlertOpen}
        handleClose={handleSendAlertClose}
        handleSend={handleSendNotification}
      />
      <ArchiveAlert
        isLoading={isArchiving}
        isOpen={isArchiveAlertOpen}
        handleClose={handleArchiveAlertClose}
        handleArchive={handleArchiveNotification}
      />
      <DuplicateAlert
        isLoading={isDuplicating}
        isOpen={isDuplicateAlertOpen}
        handleClose={handleDuplicateAlertClose}
        handleDuplicate={handleDuplicateNotification}
      />
    </Box>
  );
};

export default NotificationPage;
