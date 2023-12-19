import { useEffect, useState, MouseEvent as MouseEventReact } from 'react';
import { Box, Button, Dialog, Grid } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

import { QueryParams, useLazyGetRolesQuery } from '@lths/features/mms/data-access';
import { User, useLazyGetUsersQuery } from '@lths/shared/data-access';
import { SearchBar, TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';
import { UserForm, UserManagementList, UserRolesFormGroup } from '@lths/shared/ui-user-management';

const UserManagementPage = () => {
  const [getUsers, { data: userResponse = { pagination: null, data: [] }, isFetching, isLoading }] =
    useLazyGetUsersQuery();
  const [getAllRoles, { data: RolesList = [] }] = useLazyGetRolesQuery();

  const { data: users = [], pagination } = userResponse;
  console.log({ users });

  const [userFormOpen, setUserFormOpen] = useState(false);
  const [userFormUser, setUserFormUser] = useState<User>(null);
  const [currPagination, setCurrPagination] = useState<TablePaginationProps>(null);
  const [currSorting, setCurrSorting] = useState<TableSortingProps>(undefined);
  const [search, setSearch] = useState({ queryString: '' });

  useEffect(() => {
    fetchUsers(currPagination, currSorting, search);
  }, [currPagination, currSorting, search]);

  useEffect(() => {
    fetchRoles();
  }, []);

  async function fetchUsers(
    pagination: TablePaginationProps,
    sorting: TableSortingProps,
    search: { queryString: string }
  ) {
    const req: QueryParams = {};
    if (pagination != null) {
      req.page = pagination.page;
      req.page_size = pagination.pageSize;
    }
    if (sorting != null) {
      req.sort_key = sorting.column;
      req.sort_order = sorting.order;
    }
    if (search != null && search.queryString !== '') {
      req.queryString = search.queryString;
    }

    getUsers(req);
  }

  async function fetchRoles() {
    getAllRoles();
  }

  const totalUsers = pagination?.totalItems || 0;

  const handlePageChange = (
    event: MouseEventReact<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    setCurrPagination(pagination);
    setCurrSorting(sorting);
  };

  const handleSearch = (value: string) => {
    if (currPagination) {
      setCurrPagination({ ...currPagination, page: 0 });
    }
    setSearch({ queryString: value });
  };

  const handleAddUser = async (userFormValues: Partial<User>) => {
    console.log('do stuff', userFormValues);
  };

  const handleRolesFilterChange = (roles: string[]) => {
    console.log('update fetch params for the following roles', roles);
  };

  return (
    <Box
      data-testid="MMS-User-Management-Page--root"
      style={{
        width: '-webkit-fill-available',
      }}
    >
      <PageHeader
        title="Manage Users"
        sx={{ mt: '1rem', mb: 2.5 }}
        rightContent={
          <Box>
            <Button variant="contained" color="primary" startIcon={<PersonAdd />} onClick={() => setUserFormOpen(true)}>
              Add User
            </Button>
          </Box>
        }
      />
      <Box>
        <Grid container spacing={2}>
          <Grid item md={6} lg={6}>
            <SearchBar
              value={search.queryString}
              onSearch={handleSearch}
              sx={{ mb: 0 }}
              textFieldProps={{ placeholder: 'Search users by name, email, or username' }}
            />
          </Grid>
          <Grid item md={6} lg={6}>
            {/* Filter stuff */}
            <UserRolesFormGroup
              rolesAvailable={RolesList}
              rolesEditable={true}
              size="medium"
              placeholder="Filter By Role"
              onChange={handleRolesFilterChange}
            />
          </Grid>
        </Grid>
        <UserManagementList
          users={users}
          totalUsers={totalUsers}
          loading={isLoading}
          fetching={isFetching}
          pagination={currPagination}
          sorting={currSorting}
          onPageChange={handlePageChange}
        />
      </Box>
      <Dialog open={userFormOpen} onClose={() => setUserFormOpen(false)}>
        <UserForm
          user={{} as User}
          onConfirm={handleAddUser}
          confirmText="Create User"
          cancelText="Cancel"
          rolesAvailable={RolesList}
          rolesEditable={true}
          onCancel={() => setUserFormOpen(false)}
        />
      </Dialog>
    </Box>
  );
};

export default UserManagementPage;
