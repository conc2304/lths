import React, { useEffect } from 'react';
import { Box, Button, Link, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, Link as RouterLink, useSearchParams } from 'react-router-dom';

import { PageDetail, PageItemsRequest, useLazyGetPagesItemsQuery } from '@lths/features/mms/data-access';
import { PageAdapterProvider, PagesStatus, useAlertActions } from '@lths/features/mms/ui-components';
import { PageAction } from '@lths/features/mms/ui-editor';
import { ActionMenu, SearchBar, Table, RowBuilderFn, SortDirection } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

type SearchParam = Record<string, string | number | null | undefined>;

const headers = [
  {
    id: 'name',
    label: 'PAGE NAME',
    sortable: true,
  },
  {
    id: 'status',
    label: 'STATUS',
    sortable: true,
  },
  {
    id: 'updated_on',
    label: 'LAST ACTION',
    sortable: true,
  },
  {
    id: 'type',
    label: 'TYPE',
    sortable: true,
  },
  {
    id: 'default_page_id',
    label: 'DEFAULT PAGE',
    sortable: true,
  },
  {
    id: 'constraints',
    label: 'CONSTRAINTS',
    sortable: false,
    width: '20%',
  },

  {
    id: 'actions',
    label: '',
    sortable: false,
  },
];
const Page = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = Object.fromEntries(searchParams.entries());

  const { name, limit, offset, sort_field, sort_by } = queryParams;

  const navigate = useNavigate();

  const { openAlert } = useAlertActions();

  const [getData, { isFetching, isLoading, data }] = useLazyGetPagesItemsQuery();

  const persistantTableSettingsKey = 'persist:mms:pages-table-settings';
  const persistantSettings = localStorage.getItem(persistantTableSettingsKey);
  const { rowsPerPage } = persistantSettings ? JSON.parse(persistantSettings) : { rowsPerPage: undefined };

  useEffect(() => {
    const req: PageItemsRequest = { name, limit, offset, sort_field, sort_by };

    // use query params if present, if not use persistantSettings
    req.limit = !!req.limit && Number(req.limit) > 0 ? req.limit : rowsPerPage;

    getData(req);
  }, [name, limit, offset, sort_field, sort_by]);

  const updateSearchParams = (params: SearchParam) => {
    setSearchParams((searchParams) => {
      for (const name in params) {
        const value = params[name];
        if (value === null || value === undefined || value === '') searchParams.delete(name);
        else searchParams.set(name, value.toString());
      }
      return searchParams;
    });
  };

  const handleSearch = (value: string) => {
    updateSearchParams({ name: value });
  };

  const handleOnChange = ({ page, rowsPerPage, sortOrder, orderBy }) => {
    const params: SearchParam = {
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      ...(orderBy &&
        sortOrder && {
          sort_field: orderBy,
          sort_by: sortOrder,
        }),
    };

    updateSearchParams(params);
  };

  const menuOptions = (page: PageDetail) => {
    const { page_id, name, type } = page;
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
        hide: type === 'Pre-Defined',
      },
    ];
  };

  const RowBuilder = (): RowBuilderFn<PageDetail> => {
    return (props) => {
      const { data, showRowNumber, rowNumber } = props;
      const { page_id, name, type, status, updated_on, constraints_formatted, default_page_id } = data;

      return (
        <TableRow key={`row_${page_id}`}>
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
            <Stack>
              <Link
                component={RouterLink}
                to={`/pages/editor/${page_id}`}
                color="inherit"
                underline="hover"
                variant="h5"
              >
                {name}
              </Link>
              <Typography variant="subtitle1">{page_id}</Typography>
            </Stack>
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={2} alignItems="center">
              <PagesStatus status={status} />
            </Stack>
          </TableCell>
          <TableCell>{updated_on}</TableCell>
          <TableCell>{type}</TableCell>
          <TableCell>
            <Link component={RouterLink} to={`/pages/editor/${default_page_id}`} color="inherit" underline="hover">
              {default_page_id}
            </Link>
          </TableCell>
          <TableCell>{constraints_formatted}</TableCell>
          <TableCell>
            <ActionMenu options={menuOptions(data)} />
          </TableCell>
        </TableRow>
      );
    };
  };

  const total = data?.pagination?.totalItems;

  return (
    <Box>
      <PageHeader
        title="Pages"
        rightContent={
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            onClick={() => openAlert(PageAction.CREATE)}
          >
            CREATE
          </Button>
        }
        sx={{ mt: 2, mb: 2 }}
      />
      <Divider />
      <SearchBar value={name} onSearch={handleSearch} sx={{ marginY: 2 }} />
      <Table
        data={data?.data ?? []}
        headerCells={headers}
        rowBuilder={RowBuilder()}
        loading={isLoading}
        fetching={isFetching}
        total={total}
        title="{0} total pages"
        onChange={handleOnChange}
        page={offset && limit ? parseInt(offset) / parseInt(limit) : undefined}
        rowsPerPage={limit ? parseInt(limit) : undefined}
        sortOrder={sort_by ? (sort_by as SortDirection) : undefined}
        orderBy={sort_field ? sort_field : undefined}
        userSettingsStorageKey={persistantTableSettingsKey}
        showFirstButton
        showLastButton
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
