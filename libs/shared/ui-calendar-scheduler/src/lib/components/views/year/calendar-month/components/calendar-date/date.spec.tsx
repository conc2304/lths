import { lighten } from '@mui/material';
import { RBTheme, RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { addDays } from 'date-fns';

import { CalendarDate } from './date';

const renderWithTheme = (component: JSX.Element) => {
  return render(RBThemeProvider({ children: component }));
};

describe('CalendarDate', () => {
  it('renders without crashing', () => {
    const mockDate = new Date(2023, 10, 9);
    const mockToday = addDays(mockDate, 3);
    const mockOnClick = jest.fn();

    const { getByLabelText, getByText, getByTestId } = renderWithTheme(
      <CalendarDate
        dateToRender={mockDate}
        currentDate={mockToday}
        dateId=""
        onClick={mockOnClick}
        events={[]}
        isActive={false}
      />
    );

    const dateElement = getByLabelText(mockDate.toISOString().split('T')[0]);
    expect(dateElement).toBeInTheDocument();
    const textElement = getByText(mockDate.getDate());
    expect(textElement).toHaveStyle('color: #000');
    // class needed for clickaway logic
    expect(getByTestId('CalendarYearDate--root')).toHaveClass('CalendarYearDate--root');
  });

  it('triggers onClick when clicked', () => {
    const mockDate = new Date(2023, 10, 15);
    const mockOnClick = jest.fn();

    const { getByLabelText } = renderWithTheme(
      <CalendarDate dateToRender={mockDate} currentDate={mockDate} dateId="1" onClick={mockOnClick} events={[]} />
    );

    fireEvent.click(getByLabelText(mockDate.toISOString().split('T')[0]));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('shows the badge with events count on mouse hover', async () => {
    const mockDate = new Date(2023, 8, 11);
    const mockEvents = [{ title: 'Event 1' }, { title: 'Event 2' }];
    const mockOnClick = jest.fn();

    const { queryByTestId, getByTestId } = renderWithTheme(
      <CalendarDate
        dateToRender={mockDate}
        currentDate={mockDate}
        dateId="1"
        onClick={mockOnClick}
        events={mockEvents}
      />
    );

    expect(queryByTestId('CalendarDate--badge')?.querySelector('.MuiBadge-badge')).toHaveClass('MuiBadge-dot ');
    await waitFor(() => {
      fireEvent.mouseOver(getByTestId('CalendarYearDate--button'));
    });
    expect(queryByTestId('CalendarDate--badge')?.querySelector('.MuiBadge-badge')).not.toHaveClass('MuiBadge-dot ');

    await waitFor(() => {
      fireEvent.mouseLeave(getByTestId('CalendarYearDate--button'));
    });
    expect(queryByTestId('CalendarDate--badge')?.querySelector('.MuiBadge-badge')).toHaveClass('MuiBadge-dot ');
  });

  it('renders with active styles when isActive is true', () => {
    const mockDate = new Date(2023, 8, 11);
    const mockOnClick = jest.fn();

    const { getByLabelText } = renderWithTheme(
      <CalendarDate
        dateToRender={mockDate}
        currentDate={mockDate}
        dateId="1"
        onClick={mockOnClick}
        events={[]}
        isActive={true}
      />
    );

    const labelText = mockDate.toISOString().split('T')[0];
    const dateElement = getByLabelText(labelText);
    expect(dateElement).toHaveStyle('color: #FFF');
    expect(dateElement).toHaveStyle(`background: ${RBTheme.palette.secondary.light}`);
  });

  it('renders with weekend styles when isWeekend is true and differentiateWeekends is true', () => {
    const mockDate = new Date(2023, 10, 15);
    const renderDate = mockDate.getDate();
    const mockOnClick = jest.fn();

    const { getByText } = renderWithTheme(
      <CalendarDate
        dateToRender={mockDate}
        currentDate={mockDate}
        dateId="1"
        onClick={mockOnClick}
        events={[]}
        isWeekend={true}
        differentiateWeekends={true}
      />
    );

    const dateElement = getByText(renderDate);
    const expectedColor = lighten(RBTheme.palette.primary.main, 0.3);

    expect(dateElement).toHaveStyle(`color: ${expectedColor}`);
  });

  it('renders with outOfMonth styles when date is from previous month', () => {
    const mockDate = new Date('2023-10-01'); // October
    const renderDate = mockDate.getDate();
    const currentDate = new Date('2023-11-01'); // November
    const mockOnClick = jest.fn();

    const { getByText } = renderWithTheme(
      <CalendarDate dateToRender={mockDate} currentDate={currentDate} dateId="1" onClick={mockOnClick} events={[]} />
    );

    const dateElement = getByText(renderDate);
    expect(dateElement).toHaveStyle(`color: ${RBTheme.palette.grey[400]}`);
  });

  it('renders with large size styles when size is set to "large"', () => {
    const mockDate = new Date(2023, 8, 11);
    const mockOnClick = jest.fn();

    const { getByLabelText } = renderWithTheme(
      <CalendarDate
        dateToRender={mockDate}
        currentDate={mockDate}
        dateId="1"
        onClick={mockOnClick}
        events={[]}
        size="large"
      />
    );

    const dateElement = getByLabelText(mockDate.toISOString().split('T')[0]);
    expect(dateElement).toHaveStyle('width: 2.7rem');
    expect(dateElement).toHaveStyle('height: 2.7rem');
  });
});
