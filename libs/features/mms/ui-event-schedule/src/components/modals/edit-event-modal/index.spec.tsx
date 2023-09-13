import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders the modal with correct props', () => {
    const { getByText, container } = render(
      <EditEventModal
        open={true}
        onCancel={mockOnCancel}
        onSave={mockOnSave}
        eventTypes={mockEventTypes}
        event={mockEvent}
      />
    );

    expect(container).toBeInTheDocument();
    expect(getByText('Edit Event')).toBeInTheDocument();
    expect(getByText('CANCEL')).toBeInTheDocument();
    expect(getByText('SAVE UPDATES')).toBeInTheDocument();
  });

  it('calls onCancel when the "Cancel" button is clicked', async () => {
    const { getByText } = render(
      <EditEventModal
        open={true}
        onCancel={mockOnCancel}
        onSave={mockOnSave}
        eventTypes={mockEventTypes}
        event={mockEvent}
      />
    );

    await userEvent.click(getByText('CANCEL'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSave with correct values when the "Save Updates" button is clicked', async () => {
    const { getByText, getByTestId } = render(
      <EditEventModal
        open={true}
        onCancel={mockOnCancel}
        onSave={mockOnSave}
        eventTypes={mockEventTypes}
        event={mockEvent}
      />
    );

    // Simulate filling out the form fields
    const inputElem = getByTestId('Edit-Event--event-name').querySelector('input') as HTMLInputElement;
    const newEventTitle = 'Updated Event Name Mock';
    await userEvent.clear(inputElem);
    await userEvent.type(inputElem, newEventTitle);

    expect(getByText('SAVE UPDATES')).not.toBeDisabled();
    await userEvent.click(getByText('SAVE UPDATES'));
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
  });
});
