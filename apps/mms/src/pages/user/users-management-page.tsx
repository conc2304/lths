import { useEffect, useState, MouseEvent as MouseEventReact } from 'react';
import { Box, Button } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

import { QueryParams } from '@lths/features/mms/data-access';
import { useLazyGetUsersQuery } from '@lths/shared/data-access';
import { SearchBar, TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';
import { PageHeader } from '@lths/shared/ui-layouts';
import { UserManagementList } from '@lths/shared/ui-user-management';

const UserManagementPage = () => {
  const [getUsers, { data = { pagination: null, data: [] }, isFetching, isLoading }] = useLazyGetUsersQuery();
  const { data: users = [], pagination } = data;

  const [currPagination, setCurrPagination] = useState<TablePaginationProps>(null);
  const [currSorting, setCurrSorting] = useState<TableSortingProps>(undefined);
  const [search, setSearch] = useState({ queryString: '' });

  useEffect(() => {
    fetchUsers(currPagination, currSorting, search);
  }, [currPagination, currSorting, search]);

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

    console.log({ req });
    getUsers(req);
  }

  // console.log({ users });
  const totalUsers = pagination?.totalItems || 0;

  const handlePageChange = (
    event: MouseEventReact<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => {
    console.log({ pagination, sorting });
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

  const headerActions = (
    <Box>
      <Button variant="contained" color="primary" startIcon={<PersonAdd />}>
        Add User
      </Button>
    </Box>
  );

  return (
    <Box
      data-testid="MMS-User-Management-Page--root"
      style={{
        width: '-webkit-fill-available',
      }}
    >
      <PageHeader title="Manage Users" sx={{ mt: '1rem', mb: '3.5rem' }} rightContent={headerActions} />
      <Box>
        <Box>
          <SearchBar value={search.queryString} onSearch={handleSearch} sx={{ mb: 2 }} />
          {/* Filter stuff */}
        </Box>
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
