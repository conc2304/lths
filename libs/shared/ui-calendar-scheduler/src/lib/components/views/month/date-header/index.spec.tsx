import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { format, startOfMonth } from 'date-fns';
import { DateHeaderProps } from 'react-big-calendar';

import { MonthDateHeader } from './index';

const props: DateHeaderProps = {
  date: new Date(2023, 7, 10),
  isOffRange: false,
  onDrillDown: jest.fn(),
  label: 'unused label',
  drilldownView: 'day',
};

describe('MonthDateHeader', () => {
  it('renders without crashing', () => {
    const { container } = render(<MonthDateHeader {...props} />);
    expect(container).toBeInTheDocument();
  });

  it('displays the correct label', () => {
    const testDate = new Date(2023, 7, 15); // August 15, 2023

    const { getByText } = render(<MonthDateHeader {...props} date={testDate} isOffRange={false} />);

    const labelElement = getByText('15');
    expect(labelElement).toBeInTheDocument();
  });

  it('displays the formatted label for the start of a new month', () => {
    const testDate = startOfMonth(new Date('Fri Sep 01 2023 00:00:00 GMT-0700'));

    const { getByText } = render(<MonthDateHeader {...props} date={testDate} isOffRange={true} />);

    const labelElement = getByText(format(testDate, 'MMM d').toUpperCase());
    expect(labelElement).toBeInTheDocument();
  });

  it('calls onDrillDown when the button is clicked', () => {
    const testDate = new Date(2023, 7, 20); // August 20, 2023
    const testIsOffRange = false;
    const mockOnDrillDown = jest.fn();

    const { getByRole } = render(
      <MonthDateHeader {...props} date={testDate} isOffRange={testIsOffRange} onDrillDown={mockOnDrillDown} />
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(mockOnDrillDown).toHaveBeenCalledTimes(1);
  });
});
