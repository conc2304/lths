import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { render, waitFor, screen, act, fireEvent } from '@testing-library/react';
import { addMonths, format } from 'date-fns';
import { FlagsProvider } from 'react-feature-flags';

import {
  useLazyGetEventsQuery,
  useUpdateEventMutation,
  useCreateEventMutation,
  useLazyGetEnumListQuery,
} from '@lths/features/mms/data-access';
import { getNewEvent } from '@lths/features/mms/ui-event-schedule';

import { mockFlagData } from './mock-feature-flags.stub';
import SchedulePage from './schedule-page'; // Replace with your component's path
import { constructRange } from './utils';

// ** Notice ** We have this test in a separate spec file because we need the EventScheduler component to fully render for navigation.
// we can not cherry pick what components or services are mocked or not in
// see ```jest.mock('@lths/features/mms/ui-event-schedule', () => ...``` in ./schedule-page.spec.tsx

// Replace data fetching module withour own mocking module
jest.mock('@lths/features/mms/data-access', () => ({
  useLazyGetEventsQuery: jest.fn(),
  useUpdateEventMutation: jest.fn(),
  useCreateEventMutation: jest.fn(),
  useLazyGetEnumListQuery: jest.fn(),
}));

describe('SchedulePage', () => {
  const mockEnumValues = [
    {
      display_order: 1,
      name: 'Game',
      value: 'GAME',
    },
    {
      display_order: 2,
      name: 'Concert',
      value: 'CONCERT',
    },
    {
      display_order: 3,
      name: 'Comedy',
      value: 'COMEDY',
    },
    {
      display_order: 3,
      name: 'Arts / Other',
      value: 'ARTS_OTHER',
    },
  ];

  const mockEvents = Array.from(
    {
      length: 10,
    },
    () => getNewEvent({ monthRange: 1 })
  );

  beforeEach(() => {
    // Mock the return values of the hooks before each test
    (useLazyGetEventsQuery as jest.Mock).mockReturnValue([jest.fn(), {}]);
    (useUpdateEventMutation as jest.Mock).mockReturnValue([jest.fn()]);
    (useCreateEventMutation as jest.Mock).mockReturnValue([jest.fn()]);
    (useLazyGetEnumListQuery as jest.Mock).mockReturnValue([jest.fn()]);
  });

  const formattedFlags = mockFlagData.map(({ value }) => ({ isActive: value.enabled, name: value.id }));

  it('fetches new data when navigating past the date threshold', async () => {
    // Mock the useLazyGetEventsQuery to simulate fetching data
    const getEventsDataMock = jest.fn().mockResolvedValue({ data: { data: mockEvents } });
    const getEnumListMock = jest.fn().mockResolvedValue({ data: { data: { enum_values: mockEnumValues } } });
    (useLazyGetEventsQuery as jest.Mock).mockReturnValue([getEventsDataMock, { data: { events: mockEvents } }]);
    (useLazyGetEnumListQuery as jest.Mock).mockReturnValue([getEnumListMock]);

    // Render the component
    render(
      RBThemeProvider({
        children: (
          <FlagsProvider value={formattedFlags}>
            <SchedulePage />
          </FlagsProvider>
        ),
      })
    );
    // Verify we had an on init data fetch
    expect(getEventsDataMock).toHaveBeenCalled();

    // Clear mocks so that we reset the counters and data
    jest.clearAllMocks();

    expect(getEventsDataMock).toBeCalledTimes(0);

    const monthViewDateFormat = 'MMMM yyyy';
    const toolbarDate = format(new Date(), monthViewDateFormat);
    expect(screen.getByText(toolbarDate)).toBeInTheDocument();

    // Trigger the onRangeChange handler
    const navigateNextButton = screen.getByTestId('Calendar-View-Control--navigation--next');
    expect(navigateNextButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(navigateNextButton);
    });

    await waitFor(() => {
      // Verify that the view has indeed changed as a result of navigating 'next'
      expect(screen.queryByText(toolbarDate)).toBeNull();
      const newToolbarDate = format(addMonths(new Date(), 1), monthViewDateFormat);
      expect(screen.queryByText(newToolbarDate)).toBeInTheDocument();
    });

    // Verify event fetching thresholds are correct
    const numEvents = mockEvents.length;
    const upperIndexFetchingThreshold = Math.round(numEvents * 0.8); // in the 80% spot
    const upperThresholdDate: Date = new Date(mockEvents[upperIndexFetchingThreshold].start);
    const { start, end } = constructRange(upperThresholdDate, 3);

    // Assert that the getEventsData function was called with the correct parameters
    expect(getEventsDataMock).toBeCalledTimes(1);
    expect(getEventsDataMock).toHaveBeenCalledWith(
      {
        start_date_time: start,
        end_date_time: end,
        sort: expect.any(String),
        limit: expect.any(Number),
      },
      true
    );
  });
});
