import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EditEventStatesModal } from './index';
import { EVENT_STATE, EVENT_TYPE } from '../../../constants';
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
  eventStates: [
    {
      state: EVENT_STATE.PRE_EVENT,
      id: '64dd565849d62a229cf44339',
      name: '[PRE-GAME]: San Jose @ Anaheim',
      eventId: '2023010040',
      start: new Date('2023-09-28T01:59:52.800Z'),
      end: new Date('2023-09-28T02:00:00.000Z'),
      duration: 0,
      label: 'Pre-Event',
      desc: 'before event start',
      stateDependency: { relativeState: EVENT_STATE.IN_EVENT, referencePoint: 'start', dependentPoint: 'start' },
      relativeOffsetHrs: 0,
      source: 'NHL',
      type: EVENT_TYPE.GAME,
    },
    {
      state: EVENT_STATE.IN_EVENT,
      id: '64dd565849d62a229cf44338',
      name: 'San Jose @ Anaheim',
      eventId: '2023010040',
      start: new Date('2023-09-28T02:00:00.000Z'),
      end: new Date('2023-09-28T02:00:09.000Z'),
      duration: 0,
      label: 'In-Event',
      desc: 'Event hours',
      stateDependency: { relativeState: null, referencePoint: null, dependentPoint: null },
      relativeOffsetHrs: 0,
      source: 'NHL',
      type: EVENT_TYPE.GAME,
    },
    {
      state: EVENT_STATE.POST_EVENT,
      id: '64dd565849d62a229cf4433a',
      name: '[POST-GAME]: San Jose @ Anaheim',
      eventId: '2023010040',
      start: new Date('2023-09-28T02:00:09.000Z'),
      end: new Date('2023-09-28T02:00:07.200Z'),
      duration: 0,
      label: 'Post-Event',
      desc: 'after event end',
      stateDependency: { relativeState: EVENT_STATE.IN_EVENT, referencePoint: 'end', dependentPoint: 'end' },
      relativeOffsetHrs: 0,
      source: 'NHL',
      type: EVENT_TYPE.GAME,
    },
  ],
  eventState: 'INGAME',
  createdOn: new Date('2023-08-16T22:53:26.357Z'),
};

const mockOnSave = jest.fn();
const mockOnCancel = jest.fn();

describe('EditEventStatesModal', () => {
  it('renders the modal with correct props', () => {
    const { container } = render(
      <EditEventStatesModal open={true} onCancel={mockOnCancel} onSave={mockOnSave} eventData={mockEventData} />
    );

    expect(container).toBeInTheDocument();
    expect(screen.getByText('Edit Event States')).toBeInTheDocument();
    expect(screen.getByText('CANCEL')).toBeInTheDocument();
    expect(screen.getByText('UPDATE EVENT STATES')).toBeInTheDocument();
  });

  it('calls onCancel when the "Cancel" button is clicked', () => {
    const { getByText } = render(
      <EditEventStatesModal open={true} onCancel={mockOnCancel} onSave={mockOnSave} eventData={mockEventData} />
    );

    fireEvent.click(getByText('CANCEL'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('calls onSave with updated event states when the "Update Event States" button is clicked', async () => {
    const user = userEvent.setup();

    render(<EditEventStatesModal open={true} onCancel={mockOnCancel} onSave={mockOnSave} eventData={mockEventData} />);
    expect(mockOnSave).toHaveBeenCalledTimes(0);

    // Simulate user input by changing offset value
    await user.type(screen.getByLabelText('PRE-EVENT'), '3');
    await user.click(screen.getByRole('button', { name: 'UPDATE EVENT STATES' }));

    const updatedEventStates = updateEventStatesWithOffsets(mockEventData.eventStates as EventState[], {
      [EVENT_STATE.PRE_EVENT]: 3,
    });

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          state: EVENT_STATE.PRE_EVENT,
          start: updatedEventStates.find((eventState) => eventState.state === EVENT_STATE.PRE_EVENT)?.start,
          end: updatedEventStates.find((eventState) => eventState.state === EVENT_STATE.PRE_EVENT)?.end,
        }),
      ])
    );
  });
});
