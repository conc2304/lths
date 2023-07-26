import React, { useEffect, useState } from 'react';
import { Box, Button, Link, Stack, TableCell, TableRow, Typography, Modal } from '@mui/material';
import ApprovalIcon from '@mui/icons-material/Approval';
import CloseIcon from '@mui/icons-material/Close';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { LoadingButton } from '@mui/lab';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { PagesDataRequest, useDeletePageMutation, useLazyGetPagesItemsQuery } from '@lths/features/mms/data-access';
import { Table, TablePaginationProps, TableSortingProps, OverflowMenu } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

import { archiveLogo, DraftLogo, PublishLogo, ScheduleLogo, ReviewLogo } from '../../assets/index';
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
  DRAFT: <img src={DraftLogo} alt="Draft-logo" />,
  PUBLISHED: <img src={PublishLogo} alt="Published-logo" />,
  ARCHIVED: <img src={archiveLogo} alt="Archived-logo" />,
  SCHEDULED: <img src={ScheduleLogo} alt="Schedule-logo" />,
  REVIEW: <img src={ReviewLogo} alt="Review-logo" />,
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
  const [deletePage, { isLoading: isDeleteLoading }] = useDeletePageMutation();

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

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletePageId, setDeletePageId] = useState(null);

  const menuOptions = (page_id) => [
    {
      id: 'edit page',
      label: 'EDIT PAGE',
      action: () => {
        navigate(`/pages/editor/${page_id}`);
      },
    },
    {
      id: 'preview',
      label: 'PREVIEW',
      action: () => {
        console.log('handling preview ...');
      },
    },
    {
      id: 'share',
      label: 'SHARE',
      action: () => {
        console.log('handling share...');
      },
    },
    {
      id: 'duplicate',
      label: 'DUPLICATE',
      action: () => {
        console.log('handling duplicate...');
      },
    },
    {
      id: 'view insights',
      label: 'VIEW INSIGHTS',
      action: () => {
        console.log('handling view insights...');
      },
    },
    {
      id: 'delete',
      label: 'DELETE',
      action: () => {
        handleDeleteModal(page_id);
      },
    },
  ];

  const handleDeleteModal = (page_id: string) => {
    setDeletePageId(page_id);
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeletePage = async () => {
    await deletePage({ page_id: deletePageId });
    setOpenDeleteModal(false);
    fetchData(null, undefined);
  };

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
        <OverflowMenu items={menuOptions(row.page_id)} />
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
      <Modal open={openDeleteModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
          }}
        >
          <h2 style={{ marginTop: -1.5 }}>Delete Page?</h2>
          <p>Are you sure that you want to delete this page?</p>
          <LoadingButton
            sx={{ float: 'right', ml: 1, mt: 2 }}
            variant="contained"
            onClick={handleDeletePage}
            loading={isDeleteLoading}
          >
            DELETE
          </LoadingButton>
          <Button sx={{ float: 'right', mt: 2 }} variant="outlined" onClick={handleCloseModal}>
            CANCEL
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Pages;
