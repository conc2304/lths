import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { ViewNamesGroup, ViewNamesGroupProps } from './view-names-toggle'; // Update the path accordingly.

describe('ViewNamesGroup', () => {
  const mockOnView = jest.fn();
  const defaultProps: ViewNamesGroupProps = {
    messages: {
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year',
    },
    onView: mockOnView,
    view: 'day',
    views: ['day', 'week', 'month', 'year'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all the view modes correctly', () => {
    const { getByLabelText } = render(<ViewNamesGroup {...defaultProps} />);

    defaultProps.views.forEach((viewName) => {
      expect(getByLabelText(viewName)).toBeVisible();
    });
  });

  it('sets correct aria-pressed attribute based on view prop', () => {
    const { getByLabelText } = render(<ViewNamesGroup {...defaultProps} />);

    expect(getByLabelText('day').getAttribute('aria-pressed')).toBe('true');
    expect(getByLabelText('week').getAttribute('aria-pressed')).toBe('false');
    expect(getByLabelText('month').getAttribute('aria-pressed')).toBe('false');
    expect(getByLabelText('year').getAttribute('aria-pressed')).toBe('false');
  });

  it('calls onView with the correct view mode when a button is clicked', () => {
    const { getByLabelText } = render(<ViewNamesGroup {...defaultProps} />);

    fireEvent.click(getByLabelText('week'));

    expect(mockOnView).toHaveBeenCalledWith('week');
  });

  it('renders the correct text from messages for each view mode', () => {
    const { getByLabelText } = render(<ViewNamesGroup {...defaultProps} />);

    defaultProps.views.forEach((viewName) => {
      expect(getByLabelText(viewName).textContent).toBe(defaultProps.messages[viewName]);
    });
  });
});
