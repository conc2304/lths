import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen, within, RenderResult } from '@testing-library/react';
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

    component = render(<EventFormModal {...defaultProps} />);
    container = component.container;
  };

  it('should render without crashing', () => {
    renderComponent();
    expect(container).toBeInTheDocument();
  });

  it('should validate form on blur and show errors', async () => {
    const user = userEvent.setup();

    renderComponent();

    // Focus on the input elements and blur to trigger validation
    const parent = screen.getByTestId('Edit-Event--event-name');
    const input = parent.querySelector('input') as HTMLInputElement;
    expect(document.getElementById('edit-event--event-name-helper-text')).not.toBeInTheDocument();
    await user.clear(input);
    await user.tab();

    await waitFor(() => {
      // Assert validation errors are displayed
      expect(document.getElementById('edit-event--event-name-helper-text')).toBeInTheDocument();
      expect(within(parent).getByText('Required')).toBeInTheDocument();
    });
  });

  it('should allow submit when filled', async () => {
    const user = userEvent.setup();

    const eventValues = getNewEvent({ eventTypeID: 'COMEDY' });
    renderComponent({ eventValues });
    const { getByText, getByTestId } = component;

    const inputElem = getByTestId('Edit-Event--event-name').querySelector('input') as HTMLInputElement;
    const saveBtn = getByText('Save');
    expect(saveBtn).toBeDisabled();
    const textToAdd = ' Add text'; // form needs to be dirty to change
    await user.type(inputElem, textToAdd);
    await user.tab();
    expect(saveBtn).not.toBeDisabled();

    await user.click(saveBtn);

    // Wait for the form to be submitted and the modal to close
    await waitFor(() => {
      // Assert that onSaveMock has been called with the correct values
      expect(onSaveMock).toHaveBeenCalledWith(
        expect.objectContaining({
          eventName: eventValues.title + textToAdd,
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
    const user = userEvent.setup();
    renderComponent({ eventValues: { start: null, end: null } });

    // Set start date after end date
    const startParent = screen.getByTestId('Edit-Event--start-date-wrapper');
    const endParent = screen.getByTestId('Edit-Event--end-date-wrapper');

    await user.click(within(endParent).getByLabelText('Choose date'));
    const datepickerEnd = screen.getByRole('dialog');
    const dateButtonEnd = within(datepickerEnd).getByText('22');
    await user.click(dateButtonEnd);

    await user.click(within(startParent).getByLabelText('Choose date'));
    const datepickerStart = screen.getByRole('dialog');
    const dateButtonStart = within(datepickerStart).getByText('25');
    await user.click(dateButtonStart);

    // Assert that proper error message is shown
    await waitFor(() => {
      expect(screen.getByText('The end date must be later than the start date')).toBeInTheDocument();
    });
  });

  it('should show event type dropdown and select an event type', async () => {
    const user = userEvent.setup();

    renderComponent();
    const { getByTestId } = component;

    // Open the event type dropdown
    const wrapper = getByTestId('Edit-Event--event-type');

    const dropDownButton = within(wrapper).getByRole('button');
    expect(dropDownButton).toBeInTheDocument();
    await user.click(within(wrapper).getByRole('button'));

    const option = screen.getByText('Comedy');

    // Select an event type
    await waitFor(() => {
      expect(option).toBeInTheDocument();
    });

    await user.click(option);

    await waitFor(() => {
      expect(wrapper.querySelector('input')?.value).toContain('Comedy');
    });
  }, 20000);

  it('should show "All-day event" checkbox and toggle it', async () => {
    const user = userEvent.setup();

    renderComponent();
    const { getByTestId } = component;

    // Find and toggle the checkbox
    const checkbox = getByTestId('Edit-Event--isAllDay').querySelector('input');
    expect(checkbox).toBeInTheDocument();

    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });
    if (checkbox) {
      await user.click(checkbox);
    }
    expect(checkbox).toBeChecked();
  });

  it('should disable submit button when form is invalid', async () => {
    renderComponent();

    // Assert that the submit button is disabled
    expect(screen.getByText('Save')).toBeDisabled();
  });

  it('should allow resetting the form', async () => {
    const user = userEvent.setup();

    renderComponent();
    const { getByTestId, getByText } = component;

    // Fill in the form fields with valid input
    const inputElem = getByTestId('Edit-Event--event-name').querySelector('input') as HTMLInputElement;
    await user.type(inputElem, 'Event Name');

    await waitFor(() => {
      expect(inputElem).toHaveValue('Event Name');
    });

    // Click the "Reset" button
    await user.click(getByText('Cancel'));

    // Assert that the form is reset to its initial state
    expect(inputElem).toHaveValue('');
  }, 15000);
});
