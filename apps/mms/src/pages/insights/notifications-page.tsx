import React, { useEffect, useState } from 'react';
import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CustomTable, Order, PageHeader } from '@lths/shared/ui-elements';

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

const NotificatonsPage = (): JSX.Element => {
  const [notifications, setNotifications] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 5,
  });
  const [sorting, setSorting] = useState<{ order: Order; orderBy: string }>({
    order: 'asc',
    orderBy: 'page',
  });

  useEffect(() => {
    async function fetchData() {
      const url = `/api/notifications?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}&orderBy=${sorting.orderBy}&order=${sorting.order}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setNotifications(data.data);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error('Error in fetchind data', error);
      }
    }
    fetchData();
  }, [pagination, sorting]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setPagination((prevState) => ({
      ...prevState,
      itemsPerPage: parseInt(event.target.value, 10),
      page: 1,
    }));
  };

  const handleSortRequest = (key: string) => {
    const { order, orderBy } = sorting;
    const isAsc = orderBy === key && order === 'asc';
    setSorting({
      order: isAsc ? 'desc' : 'asc',
      orderBy: key,
    });
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
      <CustomTable
        totalCount={totalCount}
        title="notifications"
        handleExport={() => console.log('handling export csv')}
        headers={headers}
        tableRows={tableRows}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        sorting={sorting}
        handleSortRequest={handleSortRequest}
        sx={{
          mt: 4,
        }}
      />
    </Box>
  );
};

export default NotificatonsPage;
