import React, { useEffect, useState } from 'react';
import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Table, Order, PageHeader, TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';

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
  const [notifications, setNotifications] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  async function fetchData(pagination: TablePaginationProps, sorting: TableSortingProps) {
    const params = [];
    if (pagination != null) params.push(`page=${pagination.page}&itemsPerPage=${pagination.pageSize}`);
    if (sorting != null) params.push(`orderBy=${sorting.column}&order=${sorting.order}`);

    const url = `/api/notifications?${params.join('&')}`;
    try {
      const res = await fetch(url);
      console.error('res', res);
      const data = await res.json();
      setNotifications(data.data);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('Error in fetchind data', error);
    }
  }
  useEffect(() => {
    fetchData(null, undefined);
  }, []);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, pagination: TablePaginationProps, sorting: TableSortingProps) => {
    fetchData(pagination, sorting);
  };

  const handleChangeRowsPerPage: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {};

  const handleSortRequest = (pagination: TablePaginationProps, sorting: TableSortingProps) => {
    fetchData(pagination, sorting);
  };

  const tableRows = notifications.map((row) => (
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

  return (
    <Box>
      <PageHeader title="Notifications" createReportHandler={() => console.log('handling create report')} sx={{ mt: 2 }} />
      <Table
        loading={false}
        total={totalCount}
        title="{0} notifications"
        headerCells={headers}
        tableRows={tableRows}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onSortClick={handleSortRequest}
        onExportClick={() => console.log('handling export csv')}
        sx={{
          mt: 4,
        }}
      />
    </Box>
  );
};

export default NotificationPage;
