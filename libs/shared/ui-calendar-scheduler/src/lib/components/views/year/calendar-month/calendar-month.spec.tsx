import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { render, fireEvent } from '@testing-library/react';

import { CalendarMonth } from './calendar-month';

describe('CalendarMonth', () => {
  const mockDate = new Date('2023-04-15'); // Just a mock date for testing
  const mockEvent = {
    start: new Date('2023-04-15'),
    end: new Date('2023-04-15'),
    title: 'Test Event',
  };

  const mockOnMonthClick = jest.fn();
  const mockOnDateClick = jest.fn();

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <CalendarMonth date={mockDate} events={[]} onMonthClick={mockOnMonthClick} onDateClick={mockOnDateClick} />,
      { wrapper: RBThemeProvider }
    );
    expect(getByTestId('CalendarMonth--root')).toBeInTheDocument();
  });

  it('triggers onMonthClick when month name is clicked', () => {
    const handleClickMonth = jest.fn();
    const { getByTestId } = render(
      <CalendarMonth date={mockDate} events={[]} onMonthClick={handleClickMonth} onDateClick={mockOnDateClick} />,
      { wrapper: RBThemeProvider }
    );
    fireEvent.click(getByTestId('CalendarMonth--name'));
    expect(handleClickMonth).toHaveBeenCalledTimes(1);
  });

  it('renders days of the week correctly', () => {
    const { getByLabelText, queryAllByText } = render(
      <CalendarMonth date={mockDate} events={[]} onMonthClick={mockOnMonthClick} onDateClick={mockOnDateClick} />,
      { wrapper: RBThemeProvider }
    );
    ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'].forEach((day) => {
      expect(queryAllByText(day[0])[0]).toBeInTheDocument();
      expect(getByLabelText(day)).toBeInTheDocument();
    });
  });

  it('renders the weeks and days of the month', () => {
    const { getByText } = render(
      <CalendarMonth date={mockDate} events={[]} onMonthClick={mockOnMonthClick} onDateClick={mockOnDateClick} />,
      { wrapper: RBThemeProvider }
    );
    const dayElement = getByText('15'); // since the mockDate is '2023-04-15'
    expect(dayElement).toBeInTheDocument();
  });

  it('renders events for the specific day', () => {
    const handleDateClick = jest.fn();
    const { getByText } = render(
      <CalendarMonth
        date={mockDate}
        events={[mockEvent]}
        onMonthClick={mockOnMonthClick}
        onDateClick={handleDateClick}
      />,
      { wrapper: RBThemeProvider }
    );
    fireEvent.click(getByText('15'));
    expect(handleDateClick).toHaveBeenCalledTimes(1); // verify that onDateClick is called
  });

  it('renders with different sizes', () => {
    const { queryAllByTestId, rerender } = render(
      <CalendarMonth
        date={mockDate}
        events={[]}
        size="small"
        onMonthClick={mockOnMonthClick}
        onDateClick={mockOnDateClick}
      />,
      { wrapper: RBThemeProvider }
    );
    const dayElementSmall = queryAllByTestId('CalendarYearDate--button')[0];
    expect(dayElementSmall).toBeInTheDocument();
    expect(dayElementSmall).toHaveStyle('width: 2.2rem');

    rerender(
      <CalendarMonth
        date={mockDate}
        events={[]}
        size="large"
        onMonthClick={mockOnMonthClick}
        onDateClick={mockOnDateClick}
      />
    );
    const dayElementLarge = queryAllByTestId('CalendarYearDate--button')[0];
    expect(dayElementLarge).toHaveStyle('width: 2.7rem');
  });

  it('renders week numbers when showWeekNumber is true', () => {
    const { queryAllByTestId } = render(
      <CalendarMonth
        date={mockDate}
        events={[]}
        showWeekNumber={true}
        onMonthClick={mockOnMonthClick}
        onDateClick={mockOnDateClick}
      />,
      { wrapper: RBThemeProvider }
    );

    const weekItems = queryAllByTestId('CalendarYearView--WeekItem');
    expect(weekItems.length).toBeGreaterThan(0);
  });

  it('does not render week numbers when showWeekNumber is false', () => {
    const { queryAllByTestId } = render(
      <CalendarMonth
        date={mockDate}
        events={[]}
        showWeekNumber={false}
        onMonthClick={mockOnMonthClick}
        onDateClick={mockOnDateClick}
      />,
      { wrapper: RBThemeProvider }
    );

    const weekItems = queryAllByTestId('CalendarYearView--WeekItem');
    expect(weekItems.length).toBe(0);
  });
});
