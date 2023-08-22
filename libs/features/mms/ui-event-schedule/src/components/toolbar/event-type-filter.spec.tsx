import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor, within } from '@testing-library/react';

import { EventTypeFilter } from './event-type-filter';

describe('EventTypeFilter', () => {
  const mockOnFilterChange = jest.fn();
  const mockOnViewEventStates = jest.fn();

  const mockEventTypes = [
    { id: '1', label: 'Event Type 1' },
    { id: '2', label: 'Event Type 2' },
  ];

  const renderWithTheme = (component: JSX.Element) => {
    return render(RBThemeProvider({ children: component }));
  };

  test('renders correctly and triggers filter change', async () => {
    const { getByTestId, getByText } = renderWithTheme(
      <EventTypeFilter
        eventTypes={mockEventTypes}
        onFilterChange={mockOnFilterChange}
        onViewEventStates={mockOnViewEventStates}
        viewMode="calendar"
        view="week"
      />
    );

    // Click on the select filter
    const selectFilter = within(getByTestId('Calendar-toolbar--filter-select')).getByRole('button');
    fireEvent.mouseDown(selectFilter);

    // Click on an event type
    await waitFor(() => {
      const eventTypeItem = getByText('Event Type 1');
      expect(eventTypeItem).toBeInTheDocument();
      fireEvent.click(eventTypeItem);
    });

    // Verify that the filter change handler was called
    expect(mockOnFilterChange).toHaveBeenCalledWith([['1', 'Event Type 1']]);

    // Reset the selected filters
    const resetButton = getByText('Reset');
    fireEvent.click(resetButton);

    // Verify that the reset handler was called
    expect(mockOnFilterChange).toHaveBeenCalledWith([['all', 'Show All']]);
  });

  test('toggles event states visibility', () => {
    const { getByLabelText } = renderWithTheme(
      <EventTypeFilter
        eventTypes={mockEventTypes}
        onFilterChange={mockOnFilterChange}
        onViewEventStates={mockOnViewEventStates}
        viewMode="calendar"
        view="week"
      />
    );

    // Toggle the event states visibility
    const toggleSwitch = getByLabelText('View event states');
    fireEvent.click(toggleSwitch);

    // Verify that the event states toggle handler was called
    expect(mockOnViewEventStates).toHaveBeenCalledWith(true);
  });
});
