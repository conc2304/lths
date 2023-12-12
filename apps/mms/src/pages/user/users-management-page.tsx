import { useEffect, useState, MouseEvent as MouseEventReact } from 'react';
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  TableRow,
  TextField,
  TableCell,
  Typography,
  IconButton,
  Stack,
  useTheme,
  SvgIconTypeMap,
  Chip,
} from '@mui/material';
import { NotInterested, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { PersonAdd, SvgIconComponent } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Property } from 'csstype';
import { first } from 'lodash';

import { User, useLazyGetUsersQuery } from '@lths/shared/data-access';
import { Table, TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';

const UserManagementPage = () => {
  const [getUsers, { data, isFetching, isLoading }] = useLazyGetUsersQuery();
  const [currPagination, setCurrPagination] = useState<TablePaginationProps>(null);
  const [currSorting, setCurrSorting] = useState<TableSortingProps>(undefined);
  const [search, setSearch] = useState({ queryString: '' });
  const theme = useTheme();

  const init = async () => {
    console.log('fetch users');

    getUsers();
  };
  useEffect(() => {
    init();
  }, []);

  const totalUsers = data?.pagination?.totalItems || 0;

  const headers = [
    {
      id: 'name',
      label: 'User Details',
      sortable: true,
    },
    {
      id: 'roles',
      label: 'Roles',
      sortable: false,
    },
    {
      id: 'country',
      label: 'Country',
      sortable: true,
    },
    {
      id: 'city',
      label: 'City',
      sortable: true,
    },
    {
      id: 'status',
      label: 'Status',
      sortable: true,
    },
    {
      id: 'actions',
      label: 'Actions',
      sortable: false,
    },
  ];

  const headerActions = (
    <Box>
      <Button variant="contained" color="primary" startIcon={<PersonAdd />}>
        Add User
      </Button>
    </Box>
  );

  // const SearchBar = () => (
  //   <TextField
  //     fullWidth
  //     onChange={handleChange}
  //     value={inputValue}
  //     label="Search"
  //     variant="outlined"
  //     onFocus={handleFocus}
  //     onBlur={handleBlur}
  //     InputLabelProps={{
  //       shrink: isFocused || !!inputValue,
  //       style:
  //         isFocused || !!inputValue
  //           ? {
  //               marginLeft: '10px',
  //               backgroundColor: '#fff',
  //               paddingRight: '10px',
  //             }
  //           : { marginLeft: '30px', backgroundColor: '#fff', paddingRight: '10px' },
  //     }}
  //     InputProps={{
  //       startAdornment: (
  //         <InputAdornment position="start">
  //           <SearchIcon />
  //         </InputAdornment>
  //       ),
  //     }}
  //   />
  // );

  const handlePageChange = (
    event: MouseEventReact<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    setCurrPagination(pagination);
    setCurrSorting(sorting);
  };

  const handleSortingCLick = (pagination: TablePaginationProps, sorting: TableSortingProps) => {
    console.log('handleSorting', pagination, sorting);
  };

  const UserRow = ({ first_name, last_name, is_active, is_deleted, city, country, email, username, roles }: User) => {
    const initials = `${first_name ? first_name.charAt(0) : ''}${
      last_name ? (first_name ? ' ' : '') + last_name.charAt(0) : ''
    }`;
    const fullName = `${first_name ? first_name : ''}${last_name ? (first_name ? ' ' : '') + last_name : ''}`.trim();
    const displayName = fullName.length ? fullName : 'N/A';

    const status = is_active ? 'Active' : !is_deleted ? 'Inactive' : 'Deleted';
    const statusColorMap: Record<typeof status, Property.Color> = {
      Active: theme.palette.success.main,
      Inactive: theme.palette.grey[600],
      Deleted: theme.palette.warning.dark,
    };

    const statusIconMap: Record<typeof status, OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>> = {
      Active: CheckCircle,
      Inactive: RadioButtonUnchecked,
      Deleted: NotInterested,
    };

    const StatusIcon = statusIconMap[status];

    return (
      <TableRow>
        <TableCell>
          <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <Avatar
              alt="User Avatar"
              sx={{
                width: 50,
                height: 50,
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
                mr: '3rem',
              }}
            >
              {first_name || last_name ? (
                <Typography variant="button">{initials}</Typography>
              ) : (
                <PersonAdd fontSize="medium" />
              )}
            </Avatar>
            <Stack>
              <Typography variant="h4">{displayName}</Typography>
              <Typography variant="h6">{email}</Typography>
              {username !== email && <Typography variant="caption">{username}</Typography>}
            </Stack>
          </Box>
        </TableCell>

        <TableCell>
          {!roles.length ? (
            <Typography variant="caption">N/A</Typography>
          ) : (
            roles.map((role) => (
              <Typography key={role} variant="body2">
                {role}
              </Typography>
            ))
          )}
        </TableCell>
        <TableCell>{country}</TableCell>
        <TableCell>{city}</TableCell>
        <TableCell>
          <Stack direction="row">
            <StatusIcon htmlColor={statusColorMap[status]} sx={{ mr: 1 }} />
            <Typography variant="body1" color={statusColorMap[status]}>
              {status}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <IconButton size="medium">
            <MoreHorizIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };
  const tableRows = !data?.data?.length
    ? []
    : data.data.map((userData) => <UserRow key={userData._id} {...userData} />);

  const handleSearch = (value: string) => {
    if (currPagination) {
      setCurrPagination({ ...currPagination, page: 0 });
    }
    setSearch({ queryString: value });
  };

  return (
    <Box
      data-testid="MMS-User-Management-Page--root"
      style={{
        width: '-webkit-fill-available',
      }}
    >
      <PageHeader title="Manage Users" sx={{ mt: '1rem', mb: '3.5rem' }} rightContent={headerActions} />
      <Box>
        <Table
          loading={isLoading}
          fetching={isFetching}
          total={totalUsers}
          title="{0} Users"
          headerCells={headers}
          tableRows={tableRows}
          pagination={currPagination}
          sorting={currSorting}
          onPageChange={handlePageChange}
          onSortClick={handleSortingCLick}
          noDataMessage="No Users"
          sx={{
            mt: 1,
          }}
        />
      </Box>
    </Box>
  );
};

export default UserManagementPage;
