import React from 'react';
import { render, screen, fireEvent, getByText, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { TableV2 } from './table-v2'; // Update the import path as needed
import { PersistantUserSettings } from 'libs/shared/ui-elements/src/lib/data-display/table-v2/types';

describe('TableV2', () => {
  // Mock localStorage
  // const localStorageMock: Storage = {
  //   getItem: jest.fn(),
  //   setItem: jest.fn(),
  //   clear: jest.fn(),
  //   removeItem: jest.fn(),
  //   key: jest.fn(),
  //   length: 0,
  // };

  // beforeEach(() => {
  //   global.localStorage = localStorageMock;
  // });

  afterEach(() => {
    localStorage.clear();
  });

  const headerCells = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
  ];
  const data = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Jack' },
  ];

  it('renders the table headers', () => {
    const { getByText } = render(<TableV2 headerCells={headerCells} data={data} />);
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
  });

  it('renders the data rows ', () => {
    const { getByText } = render(<TableV2 headerCells={headerCells} data={data} />);
    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Jane')).toBeInTheDocument();
  });

  it('sorts by first cell when no sort props are passed in', () => {
    const { getAllByRole } = render(<TableV2 headerCells={headerCells} data={data} />);

    const rows = getAllByRole('row');

    expect(rows[1]).toHaveTextContent('John'); // Row 1
    expect(rows[2]).toHaveTextContent('Jane'); // Row 2
    expect(rows[3]).toHaveTextContent('Jack'); // Row 3
  });

  it('handles sorting when a header cell is clicked', () => {
    render(<TableV2 headerCells={headerCells} data={data} />);
    const headerCell = screen.getByText('ID');
    fireEvent.click(headerCell);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Jack'); // Row 1
    expect(rows[2]).toHaveTextContent('Jane'); // Row 2
    expect(rows[3]).toHaveTextContent('John'); // Row 3
  });

  it('should use rowsPerPage from localStorage if it exists', () => {
    // Mock localStorage to return a value
    const rowsPerPage = 10;
    localStorage.setItem('testKey', JSON.stringify({ rowsPerPage: rowsPerPage }));

    const { getByText } = render(<TableV2 headerCells={headerCells} data={data} userSettingsStorageKey="testKey" />);

    const RPPLabel = getByText('Rows per page:');

    expect(RPPLabel).toBeInTheDocument();
    expect(RPPLabel.nextElementSibling).toHaveTextContent(rowsPerPage.toString());
  });

  it('should update localStorage when rowsPerPage is changed', async () => {
    const initialRPP = 10;
    const mockLSKey = 'mockLSKey';

    const user = userEvent.setup();
    const { getByRole } = render(
      <TableV2
        headerCells={headerCells}
        data={data}
        rowsPerPage={initialRPP}
        total={data.length}
        userSettingsStorageKey={mockLSKey}
      />
    );

    // Find and change the rows per page select input
    const selectPageOptionsBtn = getByRole('button', {
      name: new RegExp(initialRPP.toString()),
    });

    expect(selectPageOptionsBtn).toBeInTheDocument();
    expect(selectPageOptionsBtn).toHaveTextContent(initialRPP.toString());

    // await act(() => fireEvent.click(selectPageOptions));
    await user.click(selectPageOptionsBtn);

    const selectOption = 50;

    expect(screen.getByRole('presentation')).toBeInTheDocument();

    const select50Page = screen.getByRole('option', { name: new RegExp(selectOption.toString()) });
    await user.click(select50Page);

    // Wait for state update
    await user.click(screen.getByTestId('Table-List-View--root'));

    const persistantSettings: PersistantUserSettings = JSON.parse(localStorage.getItem(mockLSKey) ?? '{}') ?? {};

    expect(persistantSettings.rowsPerPage).toBe(selectOption);
  });
});
