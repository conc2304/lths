import { User } from '@lths/shared/data-access';
import { RowBuilderFn, Table, TableProps } from '@lths/shared/ui-elements';

import { UserRow } from './user-row';

type Props = {
  users?: User[];
  totalUsers?: number;
  loading: boolean;
  fetching: boolean;
  page?: TableProps['page'];
  onChange: TableProps['onChange'];
  onPageChange?: TableProps['onPageChange'];
  rowsPerPage?: TableProps['rowsPerPage'];
  onRowsPerPageChange?: TableProps['onRowsPerPageChange'];
  rowsPerPageOptions?: TableProps['rowsPerPageOptions'];
  sortOrder?: TableProps['sortOrder'];
  orderBy?: TableProps['orderBy'];
  onSortChange?: TableProps['onSortChange'];
  total?: TableProps['total'];
};

export const UserManagementList = (props: Props) => {
  const {
    users = [],
    totalUsers = users.length,

    loading = false,

    fetching = false,
    page,
    onChange,
    rowsPerPage,
    onRowsPerPageChange,
    rowsPerPageOptions,
    sortOrder,
    onSortChange,
    orderBy,
    total,
  } = props;

  const headers = [
    {
      id: 'first_name',
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
      label: 'Location',
      sortable: true,
    },
    // {
    //   id: 'city',
    //   label: 'City',
    //   sortable: true,
    // },
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

  const RowBuilder = (): RowBuilderFn<Partial<User>> => {
    return ({ data: row, rowNumber, showRowNumber }) => {
      return <UserRow key={row._id} user={row} />;
    };
  };

  return (
    <Table
      data={users ?? []}
      headerCells={headers}
      total={totalUsers}
      rowBuilder={RowBuilder()}
      onChange={onChange}
      page={page}
      rowsPerPage={rowsPerPage}
      orderBy={orderBy}
      sortOrder={sortOrder}
      fetching={fetching}
      loading={loading}
      sx={{
        mt: 1,
      }}
    />
  );
};
