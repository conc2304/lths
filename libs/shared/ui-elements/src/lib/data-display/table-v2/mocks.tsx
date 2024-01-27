import { TableCell, TableRow, capitalize } from '@mui/material';
import { faker } from '@faker-js/faker';

import { TableHeaderCellProps } from '../tables/types';
import { RowBuilderFn } from 'libs/shared/ui-elements/src/lib/data-display/table-v2/types';

export const SampleHeaderCells: TableHeaderCellProps[] = [
  {
    id: 'page',
    label: 'PAGE',
    sortable: true,
  },
  {
    id: 'impressions',
    label: 'IMPRESSIONS',
    sortable: true,
  },
  {
    id: 'dateTime',
    label: 'DATE | TIME',
    sortable: true,
  },
];

export type MockDataType = {
  page: string;
  impressions: number;
  dateTime: Date | string | number;
};

export const tableDataMocks = (numRows = 10): MockDataType[] =>
  Array.from(
    {
      length: numRows,
    },
    (): MockDataType => ({
      page: `${capitalize(faker.word.adjective())} ${capitalize(faker.word.noun())} Page`,
      impressions: faker.number.int({ min: 10, max: 99999 }),
      dateTime: faker.date.anytime().toISOString(),
    })
  );

export const tableDataMock = tableDataMocks;

export const RowBuilder = (): RowBuilderFn<MockDataType> => {
  return (props) => {
    const {
      data: { page, impressions, dateTime },
    } = props;
    return (
      <>
        <TableCell>{page}</TableCell>
        <TableCell>{`${impressions} Views`}</TableCell>
        <TableCell>{`${new Date(dateTime).toISOString()}`}</TableCell>
      </>
    );
  };
};

export const getGetTableRows = (numRows = 10) =>
  Array.from(
    {
      length: numRows,
    },
    () => (
      <TableRow>
        <TableCell>{`${capitalize(faker.word.adjective())} ${capitalize(faker.word.noun())} Page`}</TableCell>
        <TableCell>{`${faker.number.int({ min: 10, max: 99999 })} Views`}</TableCell>
        <TableCell>{`${faker.date.anytime().toISOString()}`}</TableCell>
      </TableRow>
    )
  );
