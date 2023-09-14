import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Navigate, NavigateAction, ViewStatic, dateFnsLocalizer } from 'react-big-calendar';

import { DayList, NavigateDay, RangeDay, TitleDay } from './day-list';
import { DEFAULT_LIST_VIEW_COL_HEADER } from '../../../../constants';
import { ListViewContextProvider } from '../../../../context';
import { BaseColumnValue } from '../column-to-event-prop';
import { ListViewProps } from '../list-view';
import { BaseRowBuilder } from '../row-builder';

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
  rowBuilder: BaseRowBuilder,
  headerCells: DEFAULT_LIST_VIEW_COL_HEADER,
  headerToEventValueMap: BaseColumnValue,
  navigate: NavigateDay,
  range: RangeDay,
  title: TitleDay,
};

describe('DayList', () => {
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
        <DayList {...props} />
      </ListViewContextProvider>
    );
    expect(container).toBeInTheDocument();
  });

  it('throws an error without context provider', () => {
    // Suppressing console.error for CI testing
    console.error = jest.fn();

    expect(() => render(<DayList {...props} />)).toThrowError(
      'useListViewContext has to be used within <ListViewContext.Provider>'
    );
  });

  it('filters events for the specified date', () => {
    const testDate = new Date(2023, 7, 10);
    const testEvents = [
      { start: new Date(2023, 7, 10, 9, 0), title: 'Event 1' },
      { start: new Date(2023, 7, 11, 10, 0), title: 'Event 2' },
    ];

    const { getByText, queryByText } = render(
      <ListViewContextProvider
        values={{
          headerCells: props.headerCells,
          rowBuilder: props.rowBuilder,
          headerToEventValueMap: props.headerToEventValueMap,
        }}
      >
        <DayList {...props} events={testEvents} date={testDate} />
      </ListViewContextProvider>
    );

    const event1Title = getByText('Event 1');
    // Should not be in the document (not in day range)
    const event2Title = queryByText('Event 2');

    expect(event1Title).toBeInTheDocument();
    expect(event2Title).toBeNull();
  });

  it('navigates to previous day correctly', () => {
    const testDate = new Date(2023, 7, 10); // August 10, 2023

    const prevDate = NavigateDay(testDate, Navigate.PREVIOUS, {
      localizer,
    });

    expect(prevDate).toEqual(new Date(2023, 7, 9)); // August 9, 2023
  });

  it('navigates to next day correctly', () => {
    const testDate = new Date(2023, 7, 10); // August 10, 2023

    const nextDate = NavigateDay(testDate, Navigate.NEXT, {
      localizer,
    });

    expect(nextDate).toEqual(new Date(2023, 7, 11)); // August 11, 2023
  });

  it('returns same date for unknown action', () => {
    const testDate = new Date(2023, 7, 10); // August 10, 2023

    // force type converstion for testing
    const sameDate = NavigateDay(testDate, 'UNKNOWN_ACTION' as NavigateAction, {
      localizer,
    });

    expect(sameDate).toEqual(testDate);
  });
});
