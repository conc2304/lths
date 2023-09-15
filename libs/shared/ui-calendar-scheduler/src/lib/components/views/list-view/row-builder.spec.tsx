import React from 'react';
import { Table, TableBody } from '@mui/material';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { BaseRowBuilder } from './row-builder';
import { ListViewColumnHeader, RowBuilderProps } from '../../../types';

const event = {
  title: 'Test Event',
  column1: 'Value 1',
  column2: 'Value 2',
};

const headerCells: ListViewColumnHeader[] = [
  { id: 'column1', label: 'Column 1', sortable: true },
  { id: 'column2', label: 'Column 2', sortable: false },
];

const props: RowBuilderProps = {
  headerCells,
  event,
};

describe('BaseRowBuilder', () => {
  it('renders "Event Has No Data" if event is undefined', () => {
    const { getByText } = render(
      <Table>
        <TableBody>
          {/* @ts-expect-error forcing undefined event to test invalid event */}
          <BaseRowBuilder {...props} event={undefined} />
        </TableBody>
      </Table>
    );
    expect(getByText('Event Has No Data')).toBeInTheDocument();
  });

  it('renders table row with cell values', () => {
    const { getByText } = render(
      <Table>
        <TableBody>
          <BaseRowBuilder event={event} headerCells={headerCells} />
        </TableBody>
      </Table>
    );

    expect(getByText('Value 1')).toBeInTheDocument();
    expect(getByText('Value 2')).toBeInTheDocument();
  });
});
