import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor, within } from '@testing-library/react';
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
    const startDateInput = screen
      .getByTestId('Edit-Event--start-date-wrapper')
      .querySelector('input') as HTMLInputElement;
    const endDateInput = screen.getByTestId('Edit-Event--end-date-wrapper').querySelector('input') as HTMLInputElement;

    await user.clear(startDateInput);
    await user.type(startDateInput, '01/22/2022 4:00 PM');
    await user.tab();

    await user.clear(endDateInput);
    await user.type(endDateInput, '01/25/2022 5:00 PM');
    await user.tab();

    const wrapper = getByTestId('Edit-Event--event-type');

    const dropDownButton = within(wrapper).getByRole('button');
    expect(dropDownButton).toBeInTheDocument();
    await user.click(within(wrapper).getByRole('button'));

    const option = screen.getByText('Comedy');

    // Select an event type
    expect(option).toBeInTheDocument();

    await user.click(option);

    // Click the "CREATE EVENT" button
    await user.click(screen.getByText('CREATE EVENT'));

    expect(mockOnSave).toHaveBeenCalledTimes(1);
  }, 20000);
});
