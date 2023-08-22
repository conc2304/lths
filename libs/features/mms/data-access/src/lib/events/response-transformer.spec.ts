import { EVENT_STATE, EVENT_TYPE, EventState } from '@lths/features/mms/ui-event-schedule';

import { getEventStatesByEventId, getEventsResponseTransformer } from './response-transformer';
import { GetEventsEvent, GetEventsResponse } from './types';

const events: GetEventsEvent[] = [
  {
    _id: '1',
    event_id: 'event_1',
    state: EVENT_STATE.PRE_EVENT,
    __v: 1,
    actual_end_date_time: '2023-08-10T14:30:00Z',
    actual_start_date_time: '2023-08-10T13:00:00Z',
    created_on: '2023-08-09T10:00:00Z',
    deleted_on: '',
    description: 'Conference keynote speech',
    duration_in_seconds: 5400,
    end_date_time: '2023-08-10T15:30:00Z',
    is_deleted: false,
    is_subject_to_change: false,
    name: 'Tech Conference 2023',
    source: 'website',
    start_date_time: '2023-08-10T13:00:00Z',
    type: EVENT_TYPE.GAME,
    updated_on: '2023-08-09T15:00:00Z',
    visibility: 'public',
  },
  {
    _id: '2',
    event_id: 'event_1',
    state: EVENT_STATE.IN_EVENT,
    __v: 2,
    actual_end_date_time: '',
    actual_start_date_time: '',
    created_on: '2023-08-09T14:00:00Z',
    deleted_on: '',
    description: 'Virtual reality workshop',
    duration_in_seconds: 7200,
    end_date_time: '2023-08-15T16:00:00Z',
    is_deleted: false,
    is_subject_to_change: true,
    name: 'VR Workshop: Exploring Alternate Realities',
    source: 'social media',
    start_date_time: '2023-08-15T14:00:00Z',
    type: EVENT_TYPE.GAME,
    updated_on: '2023-08-10T09:00:00Z',
    visibility: 'limited',
  },
  {
    _id: '3',
    event_id: 'event_3',
    state: 'active',
    __v: 3,
    actual_end_date_time: '2023-08-10T18:30:00Z',
    actual_start_date_time: '2023-08-10T17:00:00Z',
    created_on: '2023-08-08T09:30:00Z',
    deleted_on: '',
    description: 'Outdoor jazz concert',
    duration_in_seconds: 5400,
    end_date_time: '2023-08-10T19:30:00Z',
    is_deleted: false,
    is_subject_to_change: false,
    name: 'Summer Jazz Grooves',
    source: 'ticketing platform',
    start_date_time: '2023-08-10T17:00:00Z',
    type: 'concert',
    updated_on: '2023-08-09T14:30:00Z',
    visibility: 'public',
  },
  {
    _id: '4',
    event_id: 'event_4',
    state: 'upcoming',
    __v: 1,
    actual_end_date_time: '',
    actual_start_date_time: '',
    created_on: '2023-08-10T11:30:00Z',
    deleted_on: '',
    description: 'Art exhibition opening reception',
    duration_in_seconds: 7200,
    end_date_time: '2023-08-20T20:30:00Z',
    is_deleted: false,
    is_subject_to_change: true,
    name: 'Colors of Expression: Art Gallery Opening',
    source: 'gallery website',
    start_date_time: '2023-08-20T18:30:00Z',
    type: 'exhibition',
    updated_on: '2023-08-11T10:00:00Z',
    visibility: 'public',
  },
];

describe('getEventStatesByEventId', () => {
  it('returns undefined for no matching events', () => {
    const result = getEventStatesByEventId(events, 'nonexistentId');
    expect(result).toBeUndefined();
  });

  it('returns correct event states for an event ID', () => {
    const result = getEventStatesByEventId(events, 'event_1');

    const expectedResult: EventState[] = [
      {
        desc: 'before event start',
        duration: 5400,
        end: '2023-08-10T14:30:00Z',
        eventId: 'event_1',
        id: '1',
        label: 'Pre-Event',
        name: 'Tech Conference 2023',
        relativeOffsetHrs: 121,
        source: 'website',
        start: '2023-08-10T13:00:00Z',
        state: EVENT_STATE.PRE_EVENT,
        stateDependency: {
          dependentPoint: 'start',
          referencePoint: 'start',
          relativeState: EVENT_STATE.IN_EVENT,
        },
        type: EVENT_TYPE.GAME,
      },
      {
        desc: 'Event hours',
        duration: NaN,
        end: '2023-08-15T16:00:00Z',
        eventId: 'event_1',
        id: '2',
        label: 'In-Event',
        name: 'VR Workshop: Exploring Alternate Realities',
        relativeOffsetHrs: null,
        source: 'social media',
        start: '2023-08-15T14:00:00Z',
        state: EVENT_STATE.IN_EVENT,
        stateDependency: {
          dependentPoint: null,
          referencePoint: null,
          relativeState: null,
        },
        type: EVENT_TYPE.GAME,
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});

describe('getEventsResponseTransformer', () => {
  it('transforms the response data correctly', () => {
    const mockEvent: GetEventsEvent = {
      _id: '1',
      event_id: 'event-1',
      state: EVENT_STATE.IN_EVENT,
      __v: 0,
      actual_end_date_time: '2023-08-10T12:00:00Z',
      actual_start_date_time: '2023-08-10T10:00:00Z',
      created_on: '2023-08-10T09:00:00Z',
      deleted_on: '',
      description: 'Mock Event Description',
      duration_in_seconds: 7200, // 2 hours
      end_date_time: '2023-08-10T14:00:00Z',
      is_deleted: false,
      is_subject_to_change: false,
      name: 'Mock Event',
      source: 'Mock Source',
      start_date_time: '2023-08-10T10:00:00Z',
      type: 'Mock Type',
      updated_on: '2023-08-10T09:00:00Z',
      visibility: 'visible',
    };

    const mockBackgroundEvent: GetEventsEvent = {
      _id: '1',
      event_id: 'event-1',
      state: EVENT_STATE.PRE_EVENT,
      __v: 0,
      actual_end_date_time: '2023-08-10T12:00:00Z',
      actual_start_date_time: '2023-08-10T10:00:00Z',
      created_on: '2023-08-10T09:00:00Z',
      deleted_on: '',
      description: 'Mock Background Event Description',
      duration_in_seconds: 7200, // 2 hours
      end_date_time: '2023-08-10T14:00:00Z',
      is_deleted: false,
      is_subject_to_change: false,
      name: 'Mock Background Event',
      source: 'Mock Source',
      start_date_time: '2023-08-10T10:00:00Z',
      type: 'Mock Type',
      updated_on: '2023-08-10T09:00:00Z',
      visibility: 'visible',
    };

    const mockResponse: GetEventsResponse = {
      success: true,
      message: 'Mock response',
      pagination: {},
      data: [mockEvent, mockBackgroundEvent],
    };

    const transformedResponse = getEventsResponseTransformer(mockResponse);

    expect(transformedResponse.events).toHaveLength(1);
    expect(transformedResponse.eventStates).toHaveLength(1);
    expect(transformedResponse.events[0].title).toBe('Mock Event');
    expect(transformedResponse.events[0].eventStates).toHaveLength(2); // in-event and pre-event
    expect(transformedResponse.eventStates[0].eventStates).toBeUndefined();
    // Add more assertions based on your transformation logic
  });
});
