import React from 'react';
import { Table, TableBody } from '@mui/material';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import { act } from 'react-dom/test-utils';

import { TableHeaderCellProps } from '@lths/shared/ui-elements';

import { Row } from './row';
import { eventTypesMock } from '../../mock-events';

describe('Row', () => {
  let component: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement>;

  const mockEvent = {
    title: 'Pick Up the Pieces: Leverage Relationships',
    allDay: false,
    start: new Date('2023-08-28T07:29:24.969Z'),
    end: new Date('2023-08-28T11:29:24.969Z'),
    id: '88ecd0d8d9fce59ad7f25616',
    eventId: '96fbd3c36db9e7000befd41b',
    eventType: { id: 'GAME', label: 'Hockey Game' },
    createdBy: 'http://api.nhl.com/anaheim ',
    createdOn: '2023-09-18T18:52:29.769Z',
    desc: 'Possimus minus maxime. Distinctio reprehenderit veniam quaerat.',
    eventStates: [],
  };
  const mockHeaderCells: TableHeaderCellProps[] = [
    { id: 'eventTime', label: 'Event Time', sortable: true },
    { id: 'eventName', label: 'Event Name', sortable: true },
    { id: 'eventType', label: 'Event Type', sortable: true },
    { id: 'createdBy', label: 'Created By', sortable: true },
  ];
  const mockEventTypes = eventTypesMock;
  const mockOnSaveEvent = jest.fn();
  const mockOnSaveEventStates = jest.fn();

  const renderComponent = () => {
    const component = RBThemeProvider({
      children: (
        <Table>
          <TableBody>
            <Row
              headerCells={mockHeaderCells}
              event={mockEvent}
              eventTypes={mockEventTypes}
              onSaveEvent={mockOnSaveEvent}
              onSaveEventStates={mockOnSaveEventStates}
            />
          </TableBody>
        </Table>
      ),
    });
    return render(component);
  };

  it('renders the row with cells', async () => {
    await act(async () => {
      component = renderComponent();
    });

    const { getByText, getByRole, getByTestId } = component;

    // Check if the row is rendered
    expect(getByRole('row')).toBeInTheDocument();

    // Check if cells are rendered
    const dateFormat = 'MM.dd.yy h:mma';
    const startText = format(mockEvent.start as Date, dateFormat);
    const endText = format(mockEvent.end as Date, dateFormat);

    expect(getByText(startText, { exact: false })).toBeInTheDocument();
    expect(getByText(endText, { exact: false })).toBeInTheDocument();
    expect(getByText(mockEvent.title as string, { exact: false })).toBeInTheDocument();
    expect(getByText(mockEvent.eventType?.label as string, { exact: false })).toBeInTheDocument();
    expect(getByTestId('List-View-Row--createdby').textContent).toContain(mockEvent.createdBy);
  });

  it('opens popper when row is clicked, and closes when clicked away', async () => {
    const user = userEvent.setup();
    await act(async () => {
      component = renderComponent();
    });

    expect(screen.queryByRole('tooltip')).toBeNull();

    // Click on the row
    await act(async () => {
      await user.click(screen.getByRole('row'));
    });

    // Check if the popper is open
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await act(async () => user.click(document.body)); // Simulating a click away
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).toBeNull();
    });
  }, 15000);
});
