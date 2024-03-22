import { EVENT_TYPE } from '@lths/features/mms/ui-event-schedule';

import { getEventsResponseTransformer } from './response-transformer';
import { GetEventsEvent } from './types';
import { ApiResponse } from '../types';

describe('getEventsResponseTransformer', () => {
  it('transforms the response data correctly', () => {
    const mockEvent: GetEventsEvent = {
      _id: '1',
      event_id: 'event-1',
      state: '',
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
      type: EVENT_TYPE.GAME,
      updated_on: '2023-08-10T09:00:00Z',
      visibility: 'visible',
    };

    const mockBackgroundEvent: GetEventsEvent = {
      _id: '1',
      event_id: 'event-1',
      state: '',
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
      type: EVENT_TYPE.PRE_GAME,
      updated_on: '2023-08-10T09:00:00Z',
      visibility: 'visible',
    };

    const mockResponse: ApiResponse<GetEventsEvent[]> = {
      success: true,
      message: 'Mock response',
      data: [mockEvent, mockBackgroundEvent],
    };

    const transformedResponse = getEventsResponseTransformer(mockResponse);

    expect(transformedResponse.events).toHaveLength(1);
    expect(transformedResponse.eventStates).toHaveLength(1);
    expect(transformedResponse.events[0].title).toBe('Mock Event');
  });
});
