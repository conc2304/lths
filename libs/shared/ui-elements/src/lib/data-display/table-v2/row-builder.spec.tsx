import React from 'react';
import { Table, TableBody } from '@mui/material';
import { render } from '@testing-library/react';

import { BaseRowBuilder } from './row-builder';
import { TableColumnHeader, RowBuilderProps } from './types';

const event = {
  title: 'Test Event',
  column1: 'Value 1',
  column2: 'Value 2',
};

const headerCells: TableColumnHeader[] = [
  { id: 'column1', label: 'Column 1', sortable: true },
  { id: 'column2', label: 'Column 2', sortable: false },
];

const props: RowBuilderProps<typeof event> = {
  headerCells,
  data: event,
};

describe('BaseRowBuilder', () => {
  it('renders default message if event is undefined', () => {
    const { getByText } = render(
      <Table>
        <TableBody>
          <BaseRowBuilder {...props} data={undefined as unknown as Record<string, unknown>} />
        </TableBody>
      </Table>
    );
    expect(getByText('No data found for selection')).toBeInTheDocument();
  });

  it('renders custom message when custom message passed in when event is undefined', () => {
    const customMsg = 'Mock no data found :)';
    const { getByText } = render(
      <Table>
        <TableBody>
          <BaseRowBuilder {...props} data={undefined as unknown as Record<string, unknown>} noDataMessage={customMsg} />
        </TableBody>
      </Table>
    );
    expect(getByText(customMsg)).toBeInTheDocument();
  });

  it('renders table row with cell values', () => {
    const { getByText } = render(
      <Table>
        <TableBody>
          <BaseRowBuilder data={event} headerCells={headerCells} />
        </TableBody>
      </Table>
    );

    expect(getByText('Value 1')).toBeInTheDocument();
    expect(getByText('Value 2')).toBeInTheDocument();
  });

  it('renders row with table cells when wrapWithTRElem is false', () => {
    const { queryAllByRole } = render(
      <Table>
        <TableBody>
          <BaseRowBuilder data={event} headerCells={headerCells} wrapWithTRElem={false} />
        </TableBody>
      </Table>
    );

    const rows = queryAllByRole('row');

    expect(rows.length).toBe(0);
  });

  it('renders row with table cells when wrapWithTRElem is false', () => {
    const { queryAllByRole } = render(
      <Table>
        <TableBody>
          <BaseRowBuilder data={event} headerCells={headerCells} wrapWithTRElem={true} />
        </TableBody>
      </Table>
    );

    const rows = queryAllByRole('row');

    expect(rows.length).toBe(1);
  });
});
