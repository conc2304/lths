import React from 'react';
import { Table, TableBody } from '@mui/material';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { render, screen, waitFor, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import { act } from 'react-dom/test-utils';

import { TableHeaderCellProps } from '@lths/shared/ui-elements';

import { Row } from './row';
import { eventTypesMock } from '../../mock-events';
import { MMSEvent } from '../../types';

describe('Row', () => {
  let component: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement>;

  const mockEvent: MMSEvent = {
    title: 'Pick Up the Pieces: Leverage Relationships',
    allDay: false,
    start: new Date('2023-08-28T07:29:24.969Z'),
    end: new Date('2023-08-28T11:29:24.969Z'),
    id: '88ecd0d8d9fce59ad7f25616',
    eventId: '96fbd3c36db9e7000befd41b',
    eventType: { id: 'GAME', label: 'Hockey Game' },
    createdBy: 'http://api.nhl.com/anaheim ',
    createdOn: new Date('2023-09-18T18:52:29.769Z'),
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
  const mockOnEventClick = jest.fn();

  const renderComponent = () => {
    return render(
      <Table>
        <TableBody>
          <Row
            headerCells={mockHeaderCells}
            data={mockEvent}
            eventTypes={mockEventTypes}
            onSaveEvent={mockOnSaveEvent}
            onSaveEventStates={mockOnSaveEventStates}
            onEventClick={mockOnEventClick}
          />
        </TableBody>
      </Table>,
      { wrapper: RBThemeProvider }
    );
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

  it('calls onEventClick when the event is clicked', async () => {
    const user = userEvent.setup();
    await act(async () => {
      component = renderComponent();
    });

    expect(mockOnEventClick).not.toHaveBeenCalled();

    await act(async () => {
      user.click(screen.getByRole('row'));
    });

    await waitFor(() => {
      expect(mockOnEventClick).toHaveBeenLastCalledWith(
        expect.objectContaining({
          eventId: mockEvent.id,
          popperPlacement: expect.any(String),
          anchorEl: expect.any(HTMLElement),
        })
      );
    });
  });
});
