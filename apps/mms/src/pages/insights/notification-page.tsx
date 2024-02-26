import { useEffect } from 'react';
import { Box, Button, TableCell, TableRow, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useLazyGetNotificationsItemsQuery, PaginationRequest } from '@lths/features/mms/data-access';
import {
  RowBuilderFn,
  TableChangeEvent,
  TablePaginationProps,
  TableSortingProps,
  Table,
} from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

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
  const [getData, { isFetching, isLoading, data }] = useLazyGetNotificationsItemsQuery();
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

  const handleOnChange = ({ page, rowsPerPage, sortOrder, orderBy }: TableChangeEvent) => {
    const pagination: TablePaginationProps = { page, pageSize: rowsPerPage };
    const sorting: TableSortingProps = { order: sortOrder, column: orderBy };
    fetchData(pagination, sorting);
  };

  const RowBuilder = (): RowBuilderFn<any> => {
    return ({ data: row }) => {
      return (
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
      );
    };
  };

  const total = data?.meta.total;
  return (
    <Box>
      <PageHeader
        title="Notifications"
        rightContent={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => console.log(`handling create report`)}>
            CREATE REPORT
          </Button>
        }
        sx={{ mt: 2 }}
      />
      <Table
        loading={isLoading}
        fetching={isFetching}
        total={total}
        title="{0} notifications"
        headerCells={headers}
        data={data?.data}
        rowBuilder={RowBuilder()}
        onChange={handleOnChange}
        sx={{
          mt: 4,
        }}
      />
    </Box>
  );
};

export default NotificationPage;
