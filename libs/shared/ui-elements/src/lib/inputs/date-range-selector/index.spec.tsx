import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen, cleanup, RenderResult, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { slugify } from '@lths/shared/utils';

import { DateRangeSelector } from './index';
import { DateRangeFilterOptions } from './mock-button-ranges';
import { DateFilterOption, DateFilterOptions, DateRange } from '../../ui-filters';

const resizeScreenSize = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
};

describe('DateRangeSelector', () => {
  const dateOptions: DateFilterOptions = DateRangeFilterOptions;

  const initialDateFilter = DateRangeFilterOptions.find((option) => option.isDefaultValue)?.dateRange;
  const { start_date, end_date } =
    typeof initialDateFilter === 'function' ? (initialDateFilter() as DateRange) : (initialDateFilter as DateRange);
  const defaultDateRange = { start_date: start_date as Date, end_date: end_date as Date };

  const onUpdateMock = jest.fn();
  const onChangeMock = jest.fn();

  let component: JSX.Element;
  let themedComponent: RenderResult;

  beforeEach(() => {
    jest.clearAllMocks();

    component = (
      <DateRangeSelector
        dateOptions={dateOptions}
        onUpdateTimePeriod={onUpdateMock}
        onChange={onChangeMock}
        value={defaultDateRange}
      />
    );
    themedComponent = render(RBThemeProvider({ children: component }));
  });

  afterEach(() => {
    cleanup();
  });

  it('should render date range selector', () => {
    // Arrange
    const { baseElement } = themedComponent;

    // Act

    // Assert
    expect(baseElement).toBeTruthy();
    expect(screen.getByLabelText('START')).toBeTruthy();
    expect(screen.getByLabelText('END')).toBeTruthy();
  });

  it('should render the correct number of toggle buttons, labels, and values', () => {
    // Arrange
    const { container } = themedComponent;
    // Act

    // Assert
    expect(container.querySelectorAll('.Lths-Button-Group .MuiButtonBase-root').length).toBe(
      DateRangeFilterOptions.length
    );

    DateRangeFilterOptions.forEach((button) => {
      const buttonElem = screen.queryByText(button.label, {
        selector: '.MuiButtonBase-root',
      });
      expect(buttonElem).toBeTruthy();
      expect(buttonElem).toHaveAttribute('value', slugify(button.label));
    });
  });

  it('should initialize the date picker using enUS locale settings', () => {
    // Arrange
    const { container } = themedComponent;
    const expectedPaceHolder = 'MM/DD/YYYY';
    const inputFields = container.querySelectorAll('.MuiInputBase-input');
    // Act
    // Assert
    inputFields.forEach((inputElem) => {
      expect(
        inputElem
          .getAttribute('placeholder')
          ?.toString()
          .replace(/[\u2066-\u2069]*/g, '')
      ).toBe(expectedPaceHolder);
    });
  });

  it('should render 2 Date Picker components', () => {
    // Arrange
    // Act
    // Assert
    expect(screen.queryAllByLabelText('start', { selector: '.MuiFormLabel-root' })).toBeTruthy();
    expect(screen.queryAllByLabelText('end', { selector: '.MuiFormLabel-root' })).toBeTruthy();
  });

  it('should update the toggle group button selected state on click', async () => {
    // Arrange
    cleanup();
    const user = userEvent.setup();
    render(RBThemeProvider({ children: component }));
    const buttonTested = DateRangeFilterOptions.find((option) => !option.isDefaultValue) as DateFilterOption;

    const buttonElem = screen.queryByText(buttonTested.label, {
      selector: '.MuiButtonBase-root',
    });

    // verify before state before click
    expect(buttonElem).toHaveAttribute('aria-pressed', 'false');
    expect(buttonElem).not.toHaveClass('Mui-selected');

    // Act
    if (buttonElem) {
      await user.click(buttonElem);
    }

    // Assert
    expect(buttonElem).toBeTruthy();
    expect(buttonElem).toHaveAttribute('aria-pressed', 'true');
    expect(buttonElem).toHaveClass('Mui-selected');
  });

  it('should call onChange with correct date range when a preset date option is selected', async () => {
    // Arrange

    // Act
    fireEvent.click(screen.getByText(DateRangeFilterOptions[0].label));

    // Assert
    await waitFor(() => expect(onChangeMock).toHaveBeenCalled());
    expect(onChangeMock).toHaveBeenCalledWith({
      start_date: expect.any(Date),
      end_date: expect.any(Date),
    });
  });

  it('should call onUpdateTimePeriod when "UPDATE PERIOD" button is clicked', async () => {
    // Arrange

    // Act
    fireEvent.click(screen.getByText('UPDATE PERIOD'));

    // Assert
    expect(screen.getByText('UPDATE PERIOD')).toBeTruthy();
    await waitFor(() => expect(onUpdateMock).toHaveBeenCalled());
    expect(onUpdateMock).toHaveBeenCalledWith({
      start_date: expect.any(Date),
      end_date: expect.any(Date),
    });
  });

  it('should call onChange with correct date range when start and end date pickers are used', async () => {
    // Arrange

    // Act
    fireEvent.change(screen.getByLabelText('START'), { target: { value: '2023-05-01' } });
    fireEvent.change(screen.getByLabelText('END'), { target: { value: '2023-05-03' } });

    // Assert
    fireEvent.click(screen.getByText('UPDATE PERIOD'));
    await waitFor(() => expect(onUpdateMock).toHaveBeenCalled());
    expect(onUpdateMock).toHaveBeenCalledWith({
      start_date: expect.any(Date),
      end_date: expect.any(Date),
    });
  });
});

describe('Date Range Selector - Mobile', () => {
  const dateOptions: DateFilterOptions = DateRangeFilterOptions;

  const initialDateFilter = DateRangeFilterOptions.find((option) => option.isDefaultValue)?.dateRange;
  const { start_date, end_date } =
    typeof initialDateFilter === 'function' ? (initialDateFilter() as DateRange) : (initialDateFilter as DateRange);
  const defaultDateRange = { start_date: start_date as Date, end_date: end_date as Date };

  const onUpdateMock = jest.fn();
  const onChangeMock = jest.fn();

  let component: JSX.Element;

  beforeEach(() => {
    jest.clearAllMocks();
    resizeScreenSize(400, 700);

    component = (
      <DateRangeSelector
        dateOptions={dateOptions}
        onUpdateTimePeriod={onUpdateMock}
        onChange={onChangeMock}
        value={defaultDateRange}
      />
    );
    render(RBThemeProvider({ children: component }));
  });

  afterEach(() => {
    cleanup();
  });

  it('should call the handleDatePickerAccepted in mobile view', async () => {
    // Arrange
    const [startButton, endButton] = screen.getAllByTestId('CalendarMonthOutlinedIcon');

    expect(startButton).toBeInTheDocument();
    expect(endButton).toBeInTheDocument();

    fireEvent.click(startButton);
    const calendarDialog = screen.queryByRole('dialog');
    expect(calendarDialog).toBeInTheDocument();

    if (!calendarDialog) throw new Error('Expected Calendar Dialog to be open');
    const calendarDates = within(calendarDialog).queryByRole('rowgroup');
    if (!calendarDates) throw new Error('Expected Calendar Date picker to be in document');
    const firstAvailableDateButton = within(calendarDates).getByText('1');

    expect(firstAvailableDateButton).toBeInTheDocument();
    expect(onChangeMock).not.toHaveBeenCalled();

    // Act
    fireEvent.click(firstAvailableDateButton);
    // Assert
    expect(onChangeMock).toHaveBeenCalledWith({
      start_date: expect.any(Date),
      end_date: expect.any(Date),
    });
  });
});
