import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { format, getWeek } from 'date-fns';

import { WeekItem } from './week-item';

const renderWithTheme = (component: JSX.Element) => {
  return render(RBThemeProvider({ children: component }));
};

describe('WeekItem', () => {
  it('renders correctly with given date', () => {
    const date = new Date('2023-02-15');
    renderWithTheme(<WeekItem date={date} />);

    const labelDate = format(date, 'EEE, MMMM d');
    const weekElement = screen.getByLabelText(`Week of ${labelDate}`);
    expect(weekElement).toBeInTheDocument();
  });

  it('shows week number when hovered and dot when not hovered', async () => {
    const date = new Date('2023-02-15');
    renderWithTheme(<WeekItem date={date} />);

    const labelDate = format(date, 'EEE, MMMM d');
    const weekElement = screen.getByLabelText(`Week of ${labelDate}`);

    const dotUnicode = '\u23FA';

    expect(weekElement.textContent).toBe(dotUnicode);
    fireEvent.mouseEnter(weekElement);
    expect(weekElement.textContent).toBe(String(getWeek(date)));
    fireEvent.mouseLeave(weekElement);
    expect(weekElement.textContent).toBe(dotUnicode);
  });

  it('invokes onClick when clicked', () => {
    const mockOnClick = jest.fn();
    const date = new Date('2023-02-15');
    renderWithTheme(<WeekItem date={date} onClick={mockOnClick} />);

    const labelDate = format(date, 'EEE, MMMM d');
    const weekElement = screen.getByLabelText(`Week of ${labelDate}`);
    expect(mockOnClick).not.toHaveBeenCalled();
    fireEvent.click(weekElement);
    expect(mockOnClick).toHaveBeenCalledWith(date);
  });
});
