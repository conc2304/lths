import React, { useEffect } from 'react';
import { Box, Button, Link, Stack, TableCell, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { PageDetail, PageItemsRequest, useLazyGetPagesItemsQuery } from '@lths/features/mms/data-access';
import { PageAdapterProvider, PagesStatus, useAlertActions } from '@lths/features/mms/ui-components';
import { PageAction } from '@lths/features/mms/ui-editor';
import { Table, TablePaginationProps, TableSortingProps, ActionMenu } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

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
//TODO: Add a response type for RTK queries
const Page = (): JSX.Element => {
  const navigate = useNavigate();

  const { openAlert } = useAlertActions();

  const [getData, { isFetching, isLoading, data }] = useLazyGetPagesItemsQuery();

  async function fetchData(pagination: TablePaginationProps, sorting: TableSortingProps) {
    const req: PageItemsRequest = {};
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

  const menuOptions = (page: PageDetail) => {
    const { page_id, name } = page;
    return [
      {
        id: PageAction.RENAME,
        label: 'Rename',
        action: () => {
          openAlert(PageAction.RENAME, { page_id, name });
        },
      },
      {
        id: PageAction.EDIT,
        label: 'Edit',
        action: () => {
          navigate(`/pages/editor/${page_id}`);
        },
      },
      {
        id: PageAction.DUPLICATE,
        label: 'Duplicate',
        action: () => {
          openAlert(PageAction.DUPLICATE, { page_id });
        },
      },
      {
        id: PageAction.PREVIEW,
        label: 'Preview',
        action: () => {
          console.log('handling preview ...');
        },
      },
      {
        id: PageAction.INSIGHTS,
        label: 'Insights',
        action: () => {
          navigate(`/insights/pages`);
        },
      },
      {
        id: PageAction.DELETE,
        label: 'Delete',
        action: () => {
          openAlert(PageAction.DELETE, { page_id });
        },
      },
    ];
  };

  const tableRows = data?.data?.map((row) => {
    const { _id, page_id, name, type, updated_by, created_by, status } = row;
    const last_editor = updated_by || created_by;
    return (
      <TableRow key={`row_${_id}`}>
        <TableCell>
          <Stack>
            <Link component={RouterLink} to={`/pages/editor/${page_id}`} color="inherit" underline="hover" variant="h5">
              {name}
            </Link>
            <Typography variant="subtitle1">{page_id}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{type}</TableCell>
        <TableCell>
          <Typography variant="body1" color="#0091FF">
            {last_editor}
          </Typography>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <PagesStatus status={status} />
          </Stack>
        </TableCell>
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
        title="Pages"
        rightContent={
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primaryButton"
            onClick={() => openAlert(PageAction.CREATE)}
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
    </Box>
  );
};

const WrappedPage = () => {
  return (
    <PageAdapterProvider>
      <Page />
    </PageAdapterProvider>
  );
};

export default WrappedPage;
