import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { DateCellWrapper } from './index';

describe('DateCellWrapper', () => {
  const mockDate = new Date(2023, 8, 10); // 10th September 2023
  const mockToday = new Date(2023, 8, 10);
  const mockChild = <div className="test-child">Child</div>;
  const mockRange = [
    new Date('2023-08-06T07:00:00.000Z'),
    new Date('2023-08-07T07:00:00.000Z'),
    new Date('2023-08-08T07:00:00.000Z'),
    new Date('2023-08-09T07:00:00.000Z'),
    new Date('2023-08-10T07:00:00.000Z'),
    new Date('2023-08-11T07:00:00.000Z'),
    new Date('2023-08-12T07:00:00.000Z'),
  ];

  let testGrey: string;
  const renderWithTheme = (component: JSX.Element) => {
    const theme = createTheme();
    testGrey = theme.palette.grey[100];
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it('renders without crashing', () => {
    renderWithTheme(
      <DateCellWrapper range={mockRange} value={mockDate}>
        {mockChild}
      </DateCellWrapper>
    );
  });

  it('renders child components', () => {
    const { getByText } = renderWithTheme(
      <DateCellWrapper value={mockDate} range={mockRange}>
        {mockChild}
      </DateCellWrapper>
    );
    expect(getByText('Child')).toBeVisible();
  });

  it('sets background color for off-range dates', () => {
    const offRangeChild = <div className="rbc-off-range test-child">Child</div>;
    const { getByText } = renderWithTheme(
      <DateCellWrapper value={mockDate} range={mockRange}>
        {offRangeChild}
      </DateCellWrapper>
    );
    expect(getByText('Child').parentNode).toHaveStyle(`background-color: ${testGrey}`);
  });

  it('does not set specific background color for current date (that isn’t off-range)', () => {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => mockToday.valueOf());
    const { getByText } = renderWithTheme(
      <DateCellWrapper value={mockDate} range={mockRange}>
        {mockChild}
      </DateCellWrapper>
    );
    expect(getByText('Child').parentNode).not.toHaveStyle(`background-color: ${testGrey}`);
  });
});
