import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { FlagsProvider } from 'react-feature-flags';

import {
  useLazyGetEventsQuery,
  useUpdateEventMutation,
  useCreateEventMutation,
  useLazyGetEnumListQuery,
} from '@lths/features/mms/data-access';
import {
  CreateNewEventModal,
  EVENT_SCHEDULER_CREATE_EVENTS_FLAG,
  EVENT_SCHEDULER_EXPORT_EVENTS_FLAG,
  EVENT_SCHEDULER_IMPORT_EVENTS_FLAG,
  EVENT_SCHEDULER_UPDATE_EVENTS_FLAG,
  EVENT_SCHEDULER_UPDATE_EVENT_STATES_FLAG,
  ExportEventsModal,
  ImportEventsModal,
} from '@lths/features/mms/ui-event-schedule';

import SchedulePage from './schedule-page';

// Replace data fetching module withour own mocking module
jest.mock('@lths/features/mms/data-access', () => ({
  useLazyGetEventsQuery: jest.fn(),
  useUpdateEventMutation: jest.fn(),
  useCreateEventMutation: jest.fn(),
  useLazyGetEnumListQuery: jest.fn(),
}));

// ** Notice ** We have additional tests in a separate spec file because we need the EventScheduler component to fully render for navigation.
// we can not cherry pick what components or services are mocked or not (its all or none)
// see ```jest.mock('@lths/features/mms/ui-event-schedule', () => ...``` in ./schedule-page-event-fetching.spec.tsx

// Replace UI component module withour own mocking module
jest.mock('@lths/features/mms/ui-event-schedule', () => ({
  CreateNewEventModal: jest.fn(() => null),
  EventScheduler: jest.fn(() => null),
  ExportEventsModal: jest.fn(() => null),
  ImportEventsModal: jest.fn(() => null),
}));

let component: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement>;
let container: HTMLElement;

export const SPEC_EVENT_SCHEDULER_FLAGS = [
  {
    name: EVENT_SCHEDULER_IMPORT_EVENTS_FLAG,
    isActive: true,
  },
  {
    name: EVENT_SCHEDULER_EXPORT_EVENTS_FLAG,
    isActive: true,
  },
  {
    name: EVENT_SCHEDULER_CREATE_EVENTS_FLAG,
    isActive: true,
  },
  {
    name: EVENT_SCHEDULER_UPDATE_EVENTS_FLAG,
    isActive: true,
  },
  {
    name: EVENT_SCHEDULER_UPDATE_EVENT_STATES_FLAG,
    isActive: true,
  },
];

describe('SchedulePage', () => {
  beforeEach(async () => {
    await act(async () => {
      // Mock the return values of the hooks before each test
      (useLazyGetEventsQuery as jest.Mock).mockReturnValue([jest.fn(), {}]);
      (useUpdateEventMutation as jest.Mock).mockReturnValue([jest.fn()]);
      (useCreateEventMutation as jest.Mock).mockReturnValue([jest.fn()]);
      (useLazyGetEnumListQuery as jest.Mock).mockReturnValue([jest.fn()]);
    });

    await act(async () => {
      component = render(
        <FlagsProvider value={SPEC_EVENT_SCHEDULER_FLAGS}>
          <SchedulePage />
        </FlagsProvider>
      );
      container = component.container;
    });
  });

  it('renders without crashing', () => {
    expect(container).toBeInTheDocument();
  });

  it('fetches events and enum list on mount', async () => {
    // Arrange
    const getEventsDataMock = jest.fn();
    const getEnumListMock = jest.fn().mockResolvedValue({ data: { data: { enum_values: [] } } });
    (useLazyGetEventsQuery as jest.Mock).mockReturnValueOnce([getEventsDataMock, {}]);
    (useLazyGetEnumListQuery as jest.Mock).mockReturnValueOnce([getEnumListMock]);

    expect(getEventsDataMock).not.toHaveBeenCalled();
    expect(getEnumListMock).not.toHaveBeenCalled();

    await act(
      async () =>
        (component = render(
          <FlagsProvider value={SPEC_EVENT_SCHEDULER_FLAGS}>
            <SchedulePage />
          </FlagsProvider>
        ))
    );

    // Verify we we are doing all of our initialization calls with the correct arguments
    expect(getEventsDataMock).toHaveBeenCalled();
    expect(getEventsDataMock).toHaveBeenCalledWith(
      expect.objectContaining({
        start_date_time: expect.stringMatching(
          // UTC Date String MongoDb Query {\"$lt\": \"2023-11-17T23:46:35.307Z\"}"
          /\{"\$gt": "([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z)"\}/
        ),
        end_date_time: expect.stringMatching(
          /\{"\$lt": "([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z)"\}/
        ),
        limit: 500,
        sort: '{ start_date_time: 1 }',
      })
    );
    expect(getEnumListMock).toHaveBeenLastCalledWith('EventType');
  });

  it('opens the import modal when IMPORT button is clicked', () => {
    const importButton = component.getByText('IMPORT');
    fireEvent.click(importButton);

    // Verify that the component was called with the Open prop
    expect(ImportEventsModal).toHaveBeenLastCalledWith(expect.objectContaining({ open: true }), {});
  });

  it('opens the export modal when EXPORT button is clicked', () => {
    const exportButton = component.getByText('EXPORT');
    fireEvent.click(exportButton);

    // Verify that the component was called with the Open prop
    expect(ExportEventsModal).toHaveBeenLastCalledWith(expect.objectContaining({ open: true }), {});
  });

  it('opens the new event modal when + NEW EVENT button is clicked', () => {
    const newEventButton = component.getByText('+ NEW EVENT');
    fireEvent.click(newEventButton);

    // Verify that the component was called with the Open prop
    expect(CreateNewEventModal).toHaveBeenLastCalledWith(expect.objectContaining({ open: true }), {});
  });
});
