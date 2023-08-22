import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { render, fireEvent } from '@testing-library/react';
import { Navigate } from 'react-big-calendar';

import { CalendarViewControl, CalendarViewControlProps } from './calendar-view-control';

describe('CalendarViewControl', () => {
  const mockOnNavigate = jest.fn();
  const mockOnView = jest.fn();
  const mockOnViewMode = jest.fn();
  let component: JSX.Element;

  const mockProps: CalendarViewControlProps = {
    date: new Date('2023-05-09'),
    localizer: { messages: { previous: 'Prev', next: 'Next', today: 'Today' } },
    onNavigate: mockOnNavigate,
    onView: mockOnView,
    onViewMode: mockOnViewMode,
    view: 'day',
    views: ['day', 'week', 'month'],
    label: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    component = RBThemeProvider({ children: <CalendarViewControl {...mockProps} /> });
  });

  it('renders without crashing', () => {
    render(component);
  });

  it('navigates to the previous date when the previous button is clicked', () => {
    const { getByTestId } = render(component);
    fireEvent.click(getByTestId('Calendar-View-Control--navigation--prev'));
    expect(mockOnNavigate).toHaveBeenCalledWith(Navigate.PREVIOUS);
  });

  it('navigates to the next date when the next button is clicked', () => {
    const { getByTestId } = render(component);
    fireEvent.click(getByTestId('Calendar-View-Control--navigation--next'));
    expect(mockOnNavigate).toHaveBeenCalledWith(Navigate.NEXT);
  });

  it('navigates to today when the today button is clicked', () => {
    const { getByTestId } = render(component);
    fireEvent.click(getByTestId('Calendar-View-Control--navigation--today'));
    expect(mockOnNavigate).toHaveBeenCalledWith(Navigate.TODAY);
  });

  it('triggers onView when a view is changed', () => {
    const { getByTestId } = render(RBThemeProvider({ children: <CalendarViewControl {...mockProps} view="day" /> }));
    fireEvent.click(getByTestId('Calendar-View-Control--view--week'));
    expect(mockOnView).toHaveBeenCalledWith('week');
  });

  it('triggers onViewMode when the view mode is changed', () => {
    const { getByTestId } = render(
      RBThemeProvider({ children: <CalendarViewControl {...mockProps} viewMode="calendar" /> })
    );
    fireEvent.click(getByTestId('Calendar-View-Control--view-type-list'));
    expect(mockOnViewMode).toHaveBeenCalledWith('list');
  });
});
