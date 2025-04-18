import React from 'react';
import { render } from '@testing-library/react';
import { endOfWeek, format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Event, Navigate, NavigateAction, ViewStatic, dateFnsLocalizer } from 'react-big-calendar';

import { BaseRowBuilder, RowBuilderFn } from '@lths/shared/ui-elements';

import { WeekList, NavigateWeek, RangeWeek, TitleWeek } from './week-list';
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

const props: ListViewProps & ViewStatic = {
  date: new Date(),
  events: [],
  localizer,
  rowBuilder: BaseRowBuilder as RowBuilderFn<Event>,
  headerCells: DEFAULT_LIST_VIEW_COL_HEADER,
  headerToEventValueMap: BaseColumnValue,
  navigate: NavigateWeek,
  title: TitleWeek,
};

describe('WeekList', () => {
  // unsuppressing error for tests that dont' involve toThrow
  const realError = console.error;
  afterEach(() => {
    console.error = realError;
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
        <WeekList {...props} events={undefined} />
      </ListViewContextProvider>
    );
    expect(container).toBeInTheDocument();
  });

  it('throws an error without context provider', () => {
    // Suppressing console.error for CI testing
    console.error = jest.fn();

    expect(() => {
      render(<WeekList {...props} />);
    }).toThrow('useListViewContext has to be used within <ListViewContext.Provider>');
  });

  it('filters events for the specified date', () => {
    const testDate = new Date(2023, 7, 10);
    const testEvents = [
      { start: new Date(2023, 7, 10, 9, 0), title: 'Event 1' },
      { start: new Date(2023, 7, 18, 10, 0), title: 'Event 2' },
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
        <WeekList {...props} events={testEvents} date={testDate} />
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

  it('navigates to previous week correctly', () => {
    const testDate = new Date(2023, 7, 10); // August 10 2023

    const prevDate = NavigateWeek(testDate, Navigate.PREVIOUS, {
      localizer,
    });

    expect(prevDate).toEqual(new Date(2023, 7, 3)); // August 17 2023
  });

  it('navigates to next week correctly', () => {
    const testDate = new Date(2023, 7, 10); // August 10, 2023

    const nextDate = NavigateWeek(testDate, Navigate.NEXT, {
      localizer,
    });

    expect(nextDate).toEqual(new Date(2023, 7, 17)); // Sept 10, 2023
  });

  it('returns same date for unknown action', () => {
    const testDate = new Date(2023, 7, 10); // August 10, 2023

    // force type converstion for testing
    const sameDate = NavigateWeek(testDate, 'UNKNOWN_ACTION' as NavigateAction, {
      localizer,
    });

    expect(sameDate).toEqual(testDate);
  });

  it('returns the start and end of week for a given date', () => {
    const date = new Date('2023-10-15');
    const expectedStart = startOfWeek(date);
    const expectedEnd = endOfWeek(date);

    // Act
    const result = RangeWeek(date);

    // Assert
    expect(result).toEqual({ start: expectedStart, end: expectedEnd });
  });

  it('returns empty string for title method', () => {
    expect(TitleWeek()).toBe('');
  });
});
