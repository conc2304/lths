import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { ViewModeToggle, ViewModeToggleProps } from './view-mode-toggle';

describe('ViewModeToggle', () => {
  const mockOnChange = jest.fn();
  const defaultProps: ViewModeToggleProps = {
    viewMode: 'list',
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial view mode', () => {
    const { getByLabelText } = render(<ViewModeToggle {...defaultProps} />);

    const listViewButton = getByLabelText('List View');
    const calendarViewButton = getByLabelText('Calendar View');

    expect(listViewButton).toBeVisible();
    expect(calendarViewButton).toBeVisible();
    expect(listViewButton.getAttribute('aria-pressed')).toBe('true');
    expect(calendarViewButton.getAttribute('aria-pressed')).toBe('false');
  });

  it('calls onChange with correct view mode when list is clicked', () => {
    const { getByTestId } = render(<ViewModeToggle {...defaultProps} />);

    fireEvent.click(getByTestId('Calendar-View-Control--view-type-list'));

    expect(mockOnChange).toHaveBeenCalledWith('list');
  });

  it('calls onChange with correct view mode when calendar is clicked', () => {
    const { getByTestId } = render(<ViewModeToggle {...defaultProps} />);

    fireEvent.click(getByTestId('Calendar-View-Control--view-type-calendar'));

    expect(mockOnChange).toHaveBeenCalledWith('calendar');
  });

  it('displays correct color based on selected view mode', () => {
    const { getByTestId } = render(<ViewModeToggle {...defaultProps} />);

    expect(getByTestId('ViewDayOutlinedIcon')).toHaveAttribute('color', '#000'); // For the selected view mode
    expect(getByTestId('CalendarMonthOutlinedIcon')).toHaveAttribute('color', '#e0e0e0'); // For the unselected view mode
  });
});
