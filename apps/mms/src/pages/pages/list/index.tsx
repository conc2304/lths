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
    width: '20%',
  },
  {
    id: 'status',
    label: 'STATUS',
    sortable: true,
    width: '15%',
  },
  {
    id: 'updated_on',
    label: 'LAST ACTION',
    sortable: true,
    width: '10%',
  },
  {
    id: 'type',
    label: 'TYPE',
    sortable: true,
    width: '8%',
  },
  {
    id: 'default_page_id',
    label: 'DEFAULT PAGE',
    sortable: true,
    width: '11%',
  },
  {
    id: 'constraints',
    label: 'CONSTRAINTS',
    sortable: false,
    width: '20%',
  },
  {
    id: 'updated_by',
    label: 'LAST EDITOR',
    sortable: false,
    width: '9%',
  },
  {
    id: 'actions',
    label: '',
    sortable: false,
    width: '7%',
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
    updateSearchParams({ name: value, offset: 0 });
  };

  const handleOnChange = ({ page, rowsPerPage, sortOrder, orderBy }) => {
    const params: SearchParam = {
      limit: rowsPerPage,
      offset: page * rowsPerPage, // * page is 0 indexed from mui components
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
      const { page_id, name, type, status, updated_on, constraints_formatted, default_page_id, updated_by } = data;

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
            <Stack sx={{ wordBreak: 'break-word' }}>
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
            <Stack direction="row" spacing={2} alignItems="center" sx={{ wordBreak: 'break-word' }}>
              <PagesStatus status={status} />
            </Stack>
          </TableCell>
          <TableCell>{updated_on}</TableCell>
          <TableCell>{type}</TableCell>
          <TableCell>
            <Link 
              component={RouterLink} to={`/pages/editor/${default_page_id}`} 
              color="inherit" underline="hover" sx={{ wordBreak: 'break-word' }}
            >
              {default_page_id}
            </Link>
          </TableCell>
          <TableCell>{constraints_formatted}</TableCell>
          <TableCell>
            <Typography variant="subtitle1">{updated_by}</Typography>
          </TableCell>
          <TableCell>
            <ActionMenu options={menuOptions(data)} />
          </TableCell>
        </TableRow>
      );
    };
  };

  const total = data?.pagination?.totalItems;
  const page = offset && limit ? Math.max(parseInt(offset) / parseInt(limit), 0) : 0;
  const pageLimit = !!limit && Number(limit) > 0 ? Number(limit) : rowsPerPage || 25;
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
        page={page}
        rowsPerPage={pageLimit}
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
