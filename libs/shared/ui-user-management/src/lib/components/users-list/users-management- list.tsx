import React from 'react';

import { User } from '@lths/shared/data-access';
import { Table, TableHeaderCellProps, TablePaginationProps, TableSortingProps } from '@lths/shared/ui-elements';

import { UserRow } from './user-row';

type Props = {
  users?: User[];
  totalUsers?: number;
  loading: boolean;
  fetching: boolean;
  onSortClick?: (pagination: TablePaginationProps, sorting: TableSortingProps) => void;
  headerCells?: TableHeaderCellProps[];
  tableRows?: JSX.Element[];
  pagination?: TablePaginationProps;
  sorting?: TableSortingProps;
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => void;
  onRowsPerPageChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    pagination: TablePaginationProps,
    sorting: TableSortingProps
  ) => void;
};

export const UserManagementList = (props: Props) => {
  const { users = [] } = props;
  console.log({ users });
  const {
    totalUsers = users.length,
    headerCells,
    pagination,
    loading = false,
    sorting,
    fetching = false,
    onPageChange,
    onSortClick,
  } = props;

  const headers = headerCells || [
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

  const tableRows = !users?.length ? [] : users.map((userData) => <UserRow key={userData._id} user={userData} />);

  return (
    <Table
      loading={loading}
      fetching={fetching}
      total={totalUsers}
      title="{0} Users"
      headerCells={headers}
      tableRows={tableRows}
      pagination={pagination}
      sorting={sorting}
      onPageChange={onPageChange}
      onSortClick={onSortClick}
      noDataMessage="No Users"
      sx={{
        mt: 1,
      }}
    />
  );
};
