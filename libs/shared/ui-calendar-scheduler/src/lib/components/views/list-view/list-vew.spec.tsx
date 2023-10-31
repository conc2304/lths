import React from 'react';
import { TableCell, TableRow, ThemeProvider, createTheme } from '@mui/material';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { dateFnsLocalizer } from 'react-big-calendar';

import { BaseColumnValue } from './column-to-event-prop';
import { ListView } from './list-view';

describe('ListView', () => {
  const mockHeaderCells = [
    { id: 'title', label: 'Title', sortable: true },
    { id: 'date', label: 'Date', sortable: true },
  ];
  const mockEvents = [
    { title: 'Test Event 02', start: new Date(2023, 7, 11) },
    { title: 'Test Event 04', start: new Date(2023, 7, 13) },
    { title: 'Test Event 03', start: new Date(2023, 7, 12) },
    { title: 'Test Event 01', start: new Date(2023, 7, 10) },
    { title: 'Test Event 08', start: new Date(2023, 7, 17) },
    { title: 'Test Event 07', start: new Date(2023, 7, 16) },
    { title: 'Test Event 05', start: new Date(2023, 7, 14) },
    { title: 'Test Event XX-LAST', start: new Date(2023, 7, 18) },
    { title: 'Test Event 09', start: new Date(2023, 7, 18) },
    { title: 'Test Event 10', start: new Date(2023, 7, 18) },
    { title: 'Test Event 06', start: new Date(2023, 7, 15) },
  ];

  const mockRowBuilder = jest.fn();

  mockRowBuilder.mockImplementation(({ event }) => {
    return (
      <TableRow>
        <TableCell role="cell">{event.title}</TableCell>
        <TableCell role="cell">{event.start.toISOString()}</TableCell>
      </TableRow>
    );
  });

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { 'en-US': enUS },
  });

  beforeEach(() => {
    mockRowBuilder.mockClear();
  });

  const renderComponent = (props = {}) => {
    const theme = createTheme();
    return render(
      <ThemeProvider theme={theme}>
        <ListView
          localizer={localizer}
          headerCells={mockHeaderCells}
          rowBuilder={mockRowBuilder}
          headerToEventValueMap={BaseColumnValue}
          {...props}
        />
      </ThemeProvider>
    );
  };

  it('renders without crashing', () => {
    renderComponent({ events: undefined });
  });

  it('renders header cells properly', () => {
    const { getByText } = renderComponent();
    mockHeaderCells.forEach((cell) => {
      expect(getByText(cell.label.toUpperCase())).toBeVisible();
    });
  });

  it('renders rows properly', () => {
    const { container } = renderComponent({ events: mockEvents });

    // Check if the container has text content matching the regex
    const matchedElements = Array.from(container.querySelectorAll('td')).filter((td) =>
      /Test Event \d/.test(td.textContent ?? '')
    );

    //  component defaults to 10 rows per table page
    expect(matchedElements.length).toBe(10);
  });

  it('handles page changes', async () => {
    mockRowBuilder.mockClear();
    const { getByTitle } = renderComponent({ events: mockEvents });

    const nextPageButton = getByTitle('Go to next page');
    fireEvent.click(nextPageButton);

    // Check if the page changes after clicking the "Next page" button.
    expect(mockRowBuilder).toHaveBeenCalledTimes(mockEvents.length);
  });

  it('handles rows per page changes', async () => {
    const user = userEvent.setup();

    const { getByRole } = renderComponent({ events: mockEvents });

    const rowsPerPageDropdown = getByRole('button', { name: /10/ });

    expect(rowsPerPageDropdown).toBeInTheDocument();

    await user.click(rowsPerPageDropdown);

    const modal = document.getElementById('menu-');
    const fiveRowOption = modal?.querySelector('[data-value="5"]');
    expect(fiveRowOption).toBeInTheDocument();

    mockRowBuilder.mockClear();

    if (fiveRowOption) {
      await user.click(fiveRowOption);
    }

    // The row builder should be called 5 times since we selected 5 rows per page.
    expect(mockRowBuilder).toHaveBeenCalledTimes(5);
  });

  it('should sort events in the table', async () => {
    const { getAllByRole } = renderComponent({ events: mockEvents });

    const headers = getAllByRole('columnheader');
    const firstRowTitle = getAllByRole('cell')[0].textContent;

    expect(firstRowTitle).toBe('Test Event 01');
    expect(headers[0].textContent).toContain('sorted ascending');
  });
});
