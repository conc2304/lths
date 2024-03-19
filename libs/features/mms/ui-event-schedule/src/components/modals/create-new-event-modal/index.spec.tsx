import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CreateNewEventModal open={open} onCancel={mockOnCancel} onSave={mockOnSave} eventTypes={eventTypes} />
      </LocalizationProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct props', async () => {
    renderComponent();

    // Ensure the component is rendered with the correct props
    await waitFor(() => {
      expect(screen.getByText('Create event')).toBeInTheDocument();
      expect(screen.getByText('CANCEL')).toBeInTheDocument();
      expect(screen.getByText('CREATE')).toBeInTheDocument();
    });
  });

  it('closes the modal when clicking "CANCEL"', async () => {
    const user = userEvent.setup();

    renderComponent();
    expect(mockOnCancel).toHaveBeenCalledTimes(0);

    // Click the "CANCEL" button
    await user.click(screen.getByText('CANCEL'));

    // Verify that onCancel is called
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSave when clicking "CREATE EVENT"', async () => {
    const user = userEvent.setup();
    const { getByTestId, queryAllByTestId } = renderComponent();

    // Fill in the form fields
    const inputElem = getByTestId('Edit-Event--event-name').querySelector('input') as HTMLInputElement;
    await user.type(inputElem, 'Event Name Mock');

    // Set start date after end date
    const startDateInput = queryAllByTestId('Date-Picker--root')[0].querySelector('input') as HTMLInputElement;
    const endDateInput = queryAllByTestId('Date-Picker--root')[1].querySelector('input') as HTMLInputElement;

    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();

    await user.type(startDateInput, '01/22/2022 4:00 PM');
    await user.tab();

    await user.type(endDateInput, '01/25/2022 5:00 PM');
    await user.tab();

    // select the event type
    const wrapper = getByTestId('Select-label--eventType');

    const dropDownButton = within(wrapper).getByRole('button', { expanded: false });
    expect(dropDownButton).toBeInTheDocument();
    await user.click(dropDownButton);

    const option = screen.getByText('Comedy');

    // Select an event type
    await waitFor(() => {
      expect(option).toBeInTheDocument();
    });

    await user.click(option);

    await waitFor(() => {
      expect(wrapper.querySelector('input')?.value).toContain('Comedy');
    });

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
