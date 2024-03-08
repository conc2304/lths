import React from 'react';
import { render } from '@testing-library/react';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Event, Navigate, NavigateAction, ViewStatic, dateFnsLocalizer } from 'react-big-calendar';

import { BaseRowBuilder, RowBuilderFn } from '@lths/shared/ui-elements';

import { MonthList, NavigateMonth, RangeMonth, TitleMonth } from './month-list';
import { DEFAULT_LIST_VIEW_COL_HEADER } from '../../../../constants';
import { ListViewContextProvider } from '../../../../context';
import { BaseColumnValue } from '../column-to-event-prop';
import { ListViewProps } from '../list-view';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

localizer.firstVisibleDay = jest.fn();
localizer.lastVisibleDay = jest.fn();

const props: ListViewProps & ViewStatic = {
  date: new Date(),
  events: [],
  localizer,
  rowBuilder: BaseRowBuilder as RowBuilderFn<Event>,
  headerCells: DEFAULT_LIST_VIEW_COL_HEADER,
  headerToEventValueMap: BaseColumnValue,
  navigate: NavigateMonth,
  title: TitleMonth,
};

describe('MonthList', () => {
  // unsuppressing error for tests that dont' involve toThrow
  const realError = console.error;

  afterEach(() => {
    console.error = realError;
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it('renders without crashing', () => {
    const { container } = render(
      <ListViewContextProvider
        values={{
          headerCells: props.headerCells,
          rowBuilder: props.rowBuilder,
          headerToEventValueMap: props.headerToEventValueMap,
        }}
      >
        <MonthList {...props} events={undefined} />
      </ListViewContextProvider>
    );
    expect(container).toBeInTheDocument();
  });

  it('throws an error without context provider', () => {
    // Suppressing console.error for CI testing
    console.error = jest.fn();

    expect(() => {
      render(<MonthList {...props} />);
    }).toThrow('useListViewContext has to be used within <ListViewContext.Provider>');
  });

  it('filters events for the specified date', () => {
    const testDate = new Date(2023, 7, 10);
    const testEvents = [
      { start: new Date(2023, 7, 10, 9, 0), title: 'Event 1' },
      { start: new Date(2023, 8, 11, 10, 0), title: 'Event 2' },
      { start: undefined, title: 'Event 3' },
    ];

    const { getByText, queryByText } = render(
      <ListViewContextProvider
        values={{
          headerCells: props.headerCells,
          rowBuilder: props.rowBuilder,
          headerToEventValueMap: props.headerToEventValueMap,
        }}
      >
        <MonthList {...props} events={testEvents} date={testDate} />
      </ListViewContextProvider>
    );

    const event1Title = getByText('Event 1');
    // Should not be in the document (not in day range)
    const event2Title = queryByText('Event 2');
    const event3Title = queryByText('Event 3');

    expect(event1Title).toBeInTheDocument();
    expect(event2Title).toBeNull();
    expect(event3Title).toBeNull();
  });

  it('navigates to previous month correctly', () => {
    const testDate = new Date(2023, 7, 10); // August 10 2023

    const prevDate = NavigateMonth(testDate, Navigate.PREVIOUS, {
      localizer,
    });

    expect(prevDate).toEqual(new Date(2023, 6, 10)); // July 10 2023
  });

  it('navigates to next month correctly', () => {
    const testDate = new Date(2023, 7, 10); // August 10, 2023

    const nextDate = NavigateMonth(testDate, Navigate.NEXT, {
      localizer,
    });

    expect(nextDate).toEqual(new Date(2023, 8, 10)); // Sept 10, 2023
  });

  it('returns same date for unknown action', () => {
    const testDate = new Date(2023, 7, 10); // August 10, 2023

    // force type converstion for testing
    const sameDate = NavigateMonth(testDate, 'UNKNOWN_ACTION' as NavigateAction, {
      localizer,
    });

    expect(sameDate).toEqual(testDate);
  });

  it('should return the the start and end of month for range function', () => {
    // Arrange
    const mockLocalizer = localizer;

    const date = new Date('2023-10-15');
    const expectedStart = new Date('2023-10-01');
    const expectedEnd = new Date('2023-10-31');

    // Mock the firstVisibleDay and lastVisibleDay functions
    mockLocalizer.firstVisibleDay = jest.fn();
    mockLocalizer.lastVisibleDay = jest.fn();
    (mockLocalizer.firstVisibleDay as jest.Mock).mockReturnValue(expectedStart);
    (mockLocalizer.lastVisibleDay as jest.Mock).mockReturnValue(expectedEnd);

    // Act
    const result = RangeMonth(date, { localizer: mockLocalizer });

    // Assert
    expect(result).toEqual({ start: expectedStart, end: expectedEnd });
    expect(mockLocalizer.firstVisibleDay).toHaveBeenCalledWith(date, mockLocalizer);
    expect(mockLocalizer.lastVisibleDay).toHaveBeenCalledWith(date, mockLocalizer);
  });
});
