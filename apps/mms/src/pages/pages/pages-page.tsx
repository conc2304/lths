import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Link, Stack, TableCell, TableRow, Typography } from '@mui/material';
import ApprovalIcon from '@mui/icons-material/Approval';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import FeedbackIcon from '@mui/icons-material/Feedback';
import InventoryIcon from '@mui/icons-material/Inventory';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { PagesDataRequest, useLazyGetPagesItemsQuery } from '@lths/features/mms/data-access';
import { Table, TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

import CreatePageModal from '../../components/pages/editor/components/create-page-modal';

const headers = [
  {
    id: 'name',
    label: 'PAGE NAME',
    sortable: true,
  },
  {
    id: 'type',
    label: 'TYPE',
    sortable: true,
  },
  {
    id: 'constraints',
    label: 'CONSTRAINTS',
    sortable: true,
  },
  {
    id: 'lastEditor',
    label: 'LAST EDITOR',
    sortable: true,
  },
  {
    id: 'status',
    label: 'STATUS',
    sortable: true,
  },
  {
    id: 'actions',
    label: '',
    sortable: false,
  },
];

const statusIcon = {
  DRAFT: <BorderColorIcon htmlColor="#F9A61A" />,
  PUBLISHED: <CheckCircleIcon htmlColor="#00BA00" />,
  ARCHIVED: <InventoryIcon htmlColor="gray" />,
  SCHEDULED: <WatchLaterIcon htmlColor="#05B5E4" />,
  'Pending approval': <PendingActionsIcon htmlColor="gold" />,
  'Changes requested': <FeedbackIcon htmlColor="orange" />,
  EXPIRED: <TimerOffIcon htmlColor="red" />,
  REJECTED: <CloseIcon htmlColor="yellow" />,
  APPROVED: <ApprovalIcon htmlColor="yellow" />,
  UNPUBLISHED: <UnpublishedIcon htmlColor="coral" />,
};

const Pages = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  const [getData, { isFetching, isLoading, data }] = useLazyGetPagesItemsQuery();

  async function fetchData(pagination: TablePaginationProps, sorting: TableSortingProps) {
    const req: PagesDataRequest = {};
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

  console.log();

  const tableRows = data?.data?.map((row) => (
    <TableRow key={row.id}>
      <TableCell>
        <Stack>
          <Link
            component={RouterLink}
            to={`/pages/editor/${row.page_id}`}
            color="inherit"
            underline="hover"
            variant="h5"
          >
            {row.name}
          </Link>
          <Typography variant="subtitle1">{row.page_id}</Typography>
        </Stack>
      </TableCell>
      <TableCell>{row.type}</TableCell>
      <TableCell>{row.constraints}</TableCell>
      <TableCell>
        <Typography variant="body1" color="#0091FF">
          {row?.updated_by || row?.created_by}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <Typography variant="body1">{row.status}</Typography>
            <Typography variant="body1">{row.lastModified}</Typography>
          </Box>
          {statusIcon[row.status]}
        </Stack>
      </TableCell>
      <TableCell>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  const total = data?.totalCount;

  return (
    <Box>
      <PageHeader
        title="Pages"
        rightContent={
          <Button variant="contained" onClick={() => setIsModalOpen(true)}>
            CREATE PAGE
          </Button>
        }
        sx={{ mt: 2 }}
      />
      <Table
        loading={isLoading}
        fetching={isFetching}
        total={total}
        title="{0} total pages"
        headerCells={headers}
        tableRows={tableRows}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        onSortClick={onSortClick}
        sx={{
          mt: 4,
        }}
      />
      <CreatePageModal
        open={isModalOpen}
        handleCloseModal={closeModal}
        onCreatePage={(page_id) => navigate(`/pages/editor/${page_id}`)}
      />
    </Box>
  );
};

export default Pages;
