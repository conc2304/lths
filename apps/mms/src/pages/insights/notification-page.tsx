import React, { useEffect } from 'react';
import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { NotificationRequest, useLazyGetNotificationItemsQuery } from '@lths/features/mms/data-access';
import { Table, PageHeader, TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';

const headers = [
  {
    id: 'page',
    label: 'PAGE',
    sortable: true,
  },
  {
    id: 'impressions',
    label: 'IMPRESSIONS',
    sortable: true,
  },
  {
    id: 'dateTime',
    label: 'DATE | TIME',
    sortable: true,
  },
  {
    id: 'clickThrough',
    label: 'CLICK-THROUGH',
    sortable: true,
  },
  {
    id: 'type',
    label: 'TYPE',
    sortable: true,
  },
  {
    id: 'actions',
    label: '',
    sortable: false,
  },
];

const NotificationPage = (): JSX.Element => {
  const [getData, { isFetching, isLoading, isSuccess, data }] = useLazyGetNotificationItemsQuery();
  console.log('🚀 ~ file: notification-page.tsx:44 ~ NotificationPage ~ result:', isFetching, isLoading, data);

  async function fetchData(pagination: TablePaginationProps, sorting: TableSortingProps) {
    const req: NotificationRequest = {};
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    fetchData(pagination, sorting);
  };

  const onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {};

  const onSortClick = (pagination: TablePaginationProps, sorting: TableSortingProps) => {
    fetchData(pagination, sorting);
  };

  const tableRows = data?.data.map((row) => (
    <TableRow key={row.id}>
      <TableCell>{row.page}</TableCell>
      <TableCell>{row.impressions}</TableCell>
      <TableCell>{row.dateTime}</TableCell>
      <TableCell>{row.clickThrough}</TableCell>
      <TableCell>{row.type}</TableCell>
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
        title="Notifications"
        createReportHandler={() => console.log('handling create report')}
        sx={{ mt: 2 }}
      />

      <Table
        loading={isLoading}
        fetching={isFetching}
        total={total}
        title="{0} notifications"
        headerCells={headers}
        tableRows={tableRows}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        onSortClick={onSortClick}
        onExportClick={() => console.log('handling export csv')}
        sx={{
          mt: 4,
        }}
      />
    </Box>
  );
};

export default NotificationPage;
