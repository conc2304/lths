import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { ToolbarHeader } from './index'; // Update the path accordingly.
import { ToolbarHeaderProps } from '../../types';

describe('ToolbarHeader', () => {
  let component: JSX.Element;

  const mockOnNavigate = jest.fn();
  const mockOnView = jest.fn();
  const mockOnViewMode = jest.fn();

  const mockLocalizer = {
    messages: {
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year',
    },
  };

  const defaultProps: ToolbarHeaderProps = {
    date: new Date(),
    label: 'Test Label',
    localizer: mockLocalizer,
    onNavigate: mockOnNavigate,
    onView: mockOnView,
    onViewMode: mockOnViewMode,
    viewMode: 'list',
    view: 'day',
    views: ['day', 'week', 'month'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    component = RBThemeProvider({ children: <ToolbarHeader {...defaultProps} /> });
  });

  it('renders CalendarViewControl with the correct props', () => {
    const { getByTestId } = render(component);

    expect(getByTestId('Calendar-Toolbar--root')).toBeVisible();
  });

  it('renders child components if they are valid', () => {
    const child = <div>Child Component</div>;
    const { getByText } = render(
      RBThemeProvider({ children: <ToolbarHeader {...defaultProps}>{child}</ToolbarHeader> })
    );

    expect(getByText('Child Component')).toBeVisible();
  });

  it('does not render child components if they are not valid elements', () => {
    const child = 'Child Component';
    const { queryByText } = render(
      RBThemeProvider({ children: <ToolbarHeader {...defaultProps}>{child}</ToolbarHeader> })
    );

    expect(queryByText('Child Component')).toBeNull();
  });
});
