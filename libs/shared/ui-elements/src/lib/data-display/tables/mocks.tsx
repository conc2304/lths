import { TableCell, TableRow, capitalize } from '@mui/material';
import { faker } from '@faker-js/faker';

import { TableHeaderCellProps } from './types';

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

export const getGeckTableRows = (numRows = 10) =>
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
