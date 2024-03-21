import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import '@testing-library/jest-dom';
import { render, waitFor, screen, within, RenderResult, act, cleanup } from '@testing-library/react';
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

    // we need to await the modal render to appease the jest gods
    await act(async () => {
      component = render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <EventFormModal {...defaultProps} />
        </LocalizationProvider>
      );
    });
    container = component.container;
  };

  afterEach(() => {
    cleanup();
  });

  it('should render without crashing', async () => {
    await renderComponent();
    expect(container).toBeInTheDocument();
  });

  it('should validate form on blur and show errors', async () => {
    const user = userEvent.setup();

    await renderComponent();

    // Focus on the input elements and blur to trigger validation
    const parent = screen.getByTestId('Edit-Event--event-name');
    const input = parent.querySelector('input') as HTMLInputElement;
    await user.clear(input);
    await user.tab();

    await waitFor(() => {
      // Assert validation errors are displayed
      expect(within(parent).getByText('Required')).toBeInTheDocument();
    });
  });

  it('should allow submit when filled', async () => {
    const user = userEvent.setup();

    const eventValues = getNewEvent({ eventTypeID: 'COMEDY' });
    await renderComponent({ eventValues });
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
    await renderComponent({ eventValues: { start: null, end: null } });

    // Set start date after end date
    // const startParent = screen.getByTestId('Edit-Event--start-date-wrapper');
    // const endParent = screen.getByTestId('Edit-Event--end-date-wrapper');

    const startParent = screen.queryAllByTestId('Date-Picker--root')[0];
    const endParent = screen.queryAllByTestId('Date-Picker--root')[1];

    await user.click(within(startParent).getByLabelText('Choose date'));
    const datepickerStart = screen.getByRole('dialog');
    const dateButtonStart = within(datepickerStart).getByText('25');
    await user.click(dateButtonStart);

    await user.click(within(endParent).getByLabelText('Choose date'));
    const datepickerEnd = screen.getByRole('dialog');
    const dateButtonEnd = within(datepickerEnd).getByText('22');
    await user.click(dateButtonEnd);

    // Assert that proper error message is shown
    await waitFor(() => {
      expect(screen.getByText('Invalid end date')).toBeInTheDocument();
    });
  });

  it('should show event type dropdown and select an event type', async () => {
    const user = userEvent.setup();

    await renderComponent();

    const { getByTestId } = component;

    // Open the event type dropdown
    const wrapper = getByTestId('SelectLTHS--selector');

    const dropDownButton = within(wrapper).getByRole('button', { expanded: false });
    expect(dropDownButton).toBeInTheDocument();
    await user.click(dropDownButton);

    // select menu option
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

    await renderComponent();
    const { getByTestId } = component;

    // Find and toggle the checkbox
    const checkbox = getByTestId('Edit-Event--isAllDay').querySelector('input');
    expect(checkbox).toBeInTheDocument();

    // default state is checked
    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
    if (checkbox) {
      await user.click(checkbox);
    }
    expect(checkbox).not.toBeChecked();
  });

  it('should disable submit button when form is invalid', async () => {
    await renderComponent();

    // Assert that the submit button is disabled
    expect(screen.getByText('Save')).toBeDisabled();
  });

  it('should allow resetting the form', async () => {
    const user = userEvent.setup();

    await renderComponent();
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
