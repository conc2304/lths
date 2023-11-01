import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CreateNewEventModal } from './index';
import { eventTypesMock } from '../../../mock-events';

describe('CreateNewEventModal', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  const eventTypes = eventTypesMock;

  const renderComponent = (open = true) => {
    return render(
      <CreateNewEventModal open={open} onCancel={mockOnCancel} onSave={mockOnSave} eventTypes={eventTypes} />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct props', async () => {
    renderComponent();

    // Ensure the component is rendered with the correct props
    await waitFor(() => {
      expect(screen.getByText('Create New Event')).toBeInTheDocument();
      expect(screen.getByText('CANCEL')).toBeInTheDocument();
      expect(screen.getByText('CREATE EVENT')).toBeInTheDocument();
    });
  });

  it('closes the modal when clicking "CANCEL"', async () => {
    const user = userEvent.setup();

    renderComponent();

    // Click the "CANCEL" button
    await user.click(screen.getByText('CANCEL'));

    // Verify that onCancel is called
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSave when clicking "CREATE EVENT"', async () => {
    const user = userEvent.setup();
    const { getByTestId } = renderComponent();

    // Fill in the form fields
    const inputElem = getByTestId('Edit-Event--event-name').querySelector('input') as HTMLInputElement;
    await user.type(inputElem, 'Event Name Mock');

    // Set start date after end date
    const startDateInput = getByTestId('Edit-Event--start-date-wrapper').querySelector('input') as HTMLInputElement;
    const endDateInput = getByTestId('Edit-Event--end-date-wrapper').querySelector('input') as HTMLInputElement;

    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();

    await user.type(startDateInput, '01/22/2022 4:00 PM');
    await user.tab();

    await user.type(endDateInput, '01/25/2022 5:00 PM');
    await user.tab();

    const dropDownButton = getByTestId('Edit-Event--event-type').querySelector('#edit-event--event-type');
    expect(dropDownButton).toBeInTheDocument();
    if (dropDownButton) await user.click(dropDownButton);

    const option = screen.getByText('Comedy');

    // Select an event type
    expect(option).toBeInTheDocument();

    await user.click(option);

    // Click the "CREATE EVENT" button
    await user.click(screen.getByText('CREATE EVENT'));

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        description: '',
        endDateTime: expect.any(Date),
        eventId: undefined,
        eventName: 'Event Name Mock',
        eventType: { id: 'COMEDY', label: 'Comedy' },
        id: undefined,
        isAllDay: false,
        startDateTime: expect.any(Date),
      }),
      null
    );
  }, 20000);
});
