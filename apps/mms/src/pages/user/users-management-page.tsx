import { useEffect, useState, MouseEvent as MouseEventReact } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

import { User, useLazyGetUsersQuery } from '@lths/shared/data-access';
import { Table, TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';
import { UserManagementList } from '@lths/shared/ui-user-management';

const UserManagementPage = () => {
  const [getUsers, { data = { pagination: null, data: [] }, isFetching, isLoading }] = useLazyGetUsersQuery();
  const { data: users = [], pagination } = data;

  const [currPagination, setCurrPagination] = useState<TablePaginationProps>(null);
  const [currSorting, setCurrSorting] = useState<TableSortingProps>(undefined);
  const [search, setSearch] = useState({ queryString: '' });

  const init = async () => {
    console.log('fetch users');

    getUsers();
  };
  useEffect(() => {
    init();
  }, []);

  // console.log({ users });
  const totalUsers = pagination?.totalItems || 0;

  const headerActions = (
    <Box>
      <Button variant="contained" color="primary" startIcon={<PersonAdd />}>
        Add User
      </Button>
    </Box>
  );

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
        <UserManagementList
          users={users}
          totalUsers={totalUsers}
          loading={isLoading}
          fetching={isFetching}
          pagination={currPagination}
          sorting={currSorting}
          onPageChange={handlePageChange}
          onSortClick={handleSortingCLick}
        />
      </Box>
    </Box>
  );
};

export default UserManagementPage;
