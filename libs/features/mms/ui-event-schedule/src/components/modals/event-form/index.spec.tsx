import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, screen, within, act, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EventFormModal, EventFormModalProps } from './index';
import { eventTypesMock, getNewEvent } from '../../../mock-events';

describe('EventFormModal', () => {
  const onSaveMock = jest.fn();
  const onCancelMock = jest.fn();

  let component: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement>;
  let container: HTMLElement;

  const renderComponent = async (props = {}) => {
    const defaultProps: EventFormModalProps = {
      open: true,
      title: 'Test Event',
      cancelText: 'Cancel',
      confirmText: 'Save',
      onSave: onSaveMock,
      onCancel: onCancelMock,
      eventTypes: eventTypesMock,
      ...props,
    };

    await act(async () => {
      component = render(<EventFormModal {...defaultProps} />);
      container = component.container;
    });
  };

  fit('should render without crashing', () => {
    renderComponent();
    expect(container).toBeInTheDocument();
  });

  it('should validate form on blur and show errors', async () => {
    renderComponent();

    // Focus on the input elements and blur to trigger validation
    expect(document.getElementById('edit-event--event-name-helper-text')).not.toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId('Edit-Event--event-name'));
      userEvent.tab();
    });

    await waitFor(() => {
      // Assert validation errors are displayed
      expect(document.getElementById('edit-event--event-name-helper-text')?.textContent).toBe('Required');
    });
  });

  it('should allow submit when filled', async () => {
    const eventValues = getNewEvent({ eventTypeID: 'COMEDY' });
    renderComponent({ eventValues });
    const { getByText } = component;

    await userEvent.click(getByText('Save'));

    // Wait for the form to be submitted and the modal to close
    await waitFor(() => {
      // Assert that onSaveMock has been called with the correct values
      expect(onSaveMock).toHaveBeenCalledWith(
        expect.objectContaining({
          eventName: eventValues.title,
          description: eventValues.desc,
          isAllDay: eventValues.allDay,
        }),
        expect.any(String) // id of the submit call
      );

      // Assert that onCancelMock has been called
      expect(onSaveMock).toHaveBeenCalled();
    });
  });

  it('should show proper error when start date is after end date', async () => {
    renderComponent();

    // Set start date after end date
    const startDateInput = screen
      .getByTestId('Edit-Event--start-date-wrapper')
      .querySelector('input') as HTMLInputElement;
    const endDateInput = screen.getByTestId('Edit-Event--end-date-wrapper').querySelector('input') as HTMLInputElement;

    // Set end date before start date
    await userEvent.clear(endDateInput);
    await userEvent.type(endDateInput, '01/22/2022 5:00 PM');
    await userEvent.tab();

    await userEvent.clear(startDateInput);
    await userEvent.type(startDateInput, '01/25/2022 4:00 PM');
    await userEvent.tab();

    // Assert that proper error message is shown
    expect(screen.getByText('The end date must be later than the start date')).toBeInTheDocument();
  });

  it('should show event type dropdown and select an event type', async () => {
    renderComponent();
    const { getByTestId } = component;

    // Open the event type dropdown
    const wrapper = getByTestId('Edit-Event--event-type');

    const dropDownButton = within(wrapper).getByRole('button');
    expect(dropDownButton).toBeInTheDocument();
    await userEvent.click(within(wrapper).getByRole('button'));

    const option = screen.getByText('Comedy');

    // Select an event type
    await waitFor(() => {
      expect(option).toBeInTheDocument();
    });

    await userEvent.click(option);

    await waitFor(() => {
      expect(wrapper.querySelector('input')?.value).toContain('Comedy');
    });
  });

  it('should show "All-day event" checkbox and toggle it', async () => {
    renderComponent();
    const { getByTestId } = component;

    // Find and toggle the checkbox
    const checkbox = getByTestId('Edit-Event--isAllDay').querySelector('input');
    expect(checkbox).toBeInTheDocument();

    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });
    if (checkbox) {
      await userEvent.click(checkbox);
    }
    expect(checkbox).toBeChecked();
  });

  it('should disable submit button when form is invalid', async () => {
    renderComponent();

    // Try to submit the form with invalid input
    await userEvent.click(screen.getByText('Save'));

    // Assert that the submit button is disabled
    expect(screen.getByText('Save')).toBeDisabled();
  });

  it('should allow resetting the form', async () => {
    renderComponent();
    const { getByTestId, getByText } = component;

    // Fill in the form fields with valid input
    const inputElem = getByTestId('Edit-Event--event-name').querySelector('input') as HTMLInputElement;
    await userEvent.type(inputElem, 'Event Name');

    await waitFor(() => {
      expect(inputElem).toHaveValue('Event Name');
    });

    // Click the "Reset" button
    await userEvent.click(getByText('Cancel'));

    // Assert that the form is reset to its initial state
    expect(inputElem).toHaveValue('');
  });
});
