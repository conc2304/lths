import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { subHours } from 'date-fns';

import { EditEventStatesModal } from './index';
import { EVENT_TYPE } from '../../../constants';
import { EventState, MMSEvent } from '../../../types';
import { updateEventStatesWithOffsets } from '../../../utils';

// Mocking the eventData and onSave function
const mockEventData: MMSEvent = {
  start: new Date('2023-09-28T02:00:00.000Z'),
  end: new Date('2023-09-28T02:00:09.000Z'),
  allDay: false,
  title: 'San Jose @ Anaheim',
  id: '64dd565849d62a229cf44338',
  eventId: '2023010040',
  isBackgroundEvent: false,
  eventType: { label: 'Game', id: 'GAME' },
  desc: 'The Sharks are in town to take on the Anaheim Ducks.',
  createdBy: 'NHL',
  createdOn: new Date('2023-08-16T22:53:26.357Z'),
};

const eventStateHrs = 3;
const eventStateMock: EventState[] = [
  {
    name: 'whatever',
    id: '2134',
    eventId: '2023010040',
    label: 'Pre-Event',
    type: EVENT_TYPE.PRE_GAME,
    duration: eventStateHrs * 60 * 60,
    start: subHours(mockEventData.start as Date, eventStateHrs),
    end: mockEventData.start as Date,
    desc: 'before event start',
    relativeOffsetHrs: eventStateHrs,
    typeDependency: {
      relativeState: EVENT_TYPE.GAME,
      referencePoint: 'start',
      dependentPoint: 'start',
    },
  },
];

describe('EditEventStatesModal', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal with correct props', () => {
    const { container } = render(
      <EditEventStatesModal
        open={true}
        onCancel={mockOnCancel}
        onSave={mockOnSave}
        eventData={mockEventData}
        eventStates={eventStateMock}
      />
    );

    expect(container).toBeInTheDocument();
    expect(screen.getByText('Edit event states')).toBeInTheDocument();
    expect(screen.getByText('CANCEL')).toBeInTheDocument();
    expect(screen.getByText('UPDATE')).toBeInTheDocument();
  });

  it('calls onCancel when the "Cancel" button is clicked', () => {
    const { getByText } = render(
      <EditEventStatesModal
        open={true}
        onCancel={mockOnCancel}
        onSave={mockOnSave}
        eventData={mockEventData}
        eventStates={eventStateMock}
      />
    );

    fireEvent.click(getByText('CANCEL'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSave with updated event states when the "Update Event States" button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <EditEventStatesModal
        open={true}
        onCancel={mockOnCancel}
        onSave={mockOnSave}
        eventData={mockEventData}
        eventStates={eventStateMock}
      />
    );

    expect(mockOnSave).toHaveBeenCalledTimes(0);

    // Simulate user input by changing offset value
    const inputField = screen.getByRole('textbox', { name: 'Pre-Event' });
    const onSaveButton = screen.getByText('UPDATE');
    expect(inputField).toBeInTheDocument();
    expect(onSaveButton).toBeInTheDocument();
    expect(onSaveButton).toBeDisabled();

    const offsetAmount = 1;
    const newDuration = offsetAmount + eventStateHrs;

    await user.clear(inputField);
    await user.type(inputField, newDuration.toString());
    await user.click(document.body);

    expect(inputField).toHaveValue(newDuration);

    expect(onSaveButton).not.toBeDisabled();

    act(() => {
      fireEvent.submit(screen.getByRole('form'));
    });

    const updatedEventStates = updateEventStatesWithOffsets([...eventStateMock] as EventState[], {
      [EVENT_TYPE.PRE_GAME]: eventStateHrs + offsetAmount,
    });

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledTimes(1);
    });

    expect(mockOnSave).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          type: EVENT_TYPE.PRE_GAME,
          start: updatedEventStates[0].start as Date,
          end: (eventStateMock[0].end as Date).toISOString(),
        }),
      ])
    );
  });
});
