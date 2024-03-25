import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { EditEventModal } from './index';
import { eventTypesMock } from '../../../mock-events';
import { MMSEvent } from '../../../types';

const mockEventTypes = eventTypesMock;

// Mocking the onSave and onCancel functions
const mockOnSave = jest.fn();
const mockOnCancel = jest.fn();

const mockEvent: MMSEvent = {
  id: '1',
  eventId: 'test-id-1',
  title: 'Mock Event',
  eventType: mockEventTypes[3],
  allDay: false,
  start: new Date('2023-08-10T08:00:00Z'),
  end: new Date('2023-08-10T12:00:00Z'),
  desc: 'Mock Description',
};

describe('EditEventModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = async () => {
    await act(() =>
      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <EditEventModal
            open={true}
            onCancel={mockOnCancel}
            onSave={mockOnSave}
            eventTypes={mockEventTypes}
            event={mockEvent}
          />
        </LocalizationProvider>
      )
    );
  };

  it('renders the modal with correct props', async () => {
    await renderComponent();

    expect(screen.getByText('Edit event')).toBeInTheDocument();
    expect(screen.getByText('CANCEL')).toBeInTheDocument();
    expect(screen.getByText('UPDATE')).toBeInTheDocument();
  });

  it('calls onCancel when the "Cancel" button is clicked', async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByText('CANCEL'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSave with correct values when the "Update" button is clicked', async () => {
    const user = userEvent.setup();

    await renderComponent();

    // Simulate filling out the form fields
    const inputElem = screen.getByTestId('Edit-Event--event-name').querySelector('input') as HTMLInputElement;
    const newEventTitle = 'Updated Event Name Mock';
    await user.clear(inputElem);
    await user.type(inputElem, newEventTitle);

    expect(screen.getByText('UPDATE')).not.toBeDisabled();
    await user.click(screen.getByText('UPDATE'));
    expect(mockOnSave).toHaveBeenCalledWith(
      {
        eventName: newEventTitle,
        isAllDay: mockEvent.allDay,
        startDateTime: mockEvent.start,
        endDateTime: mockEvent.end,
        eventType: mockEvent.eventType,
        description: mockEvent.desc,
        id: mockEvent.id,
        eventId: mockEvent.eventId,
      },
      mockEvent.id
    );
  }, 20000);
});
