import { endOfDay, isEqual, startOfDay } from 'date-fns';

import { BACKGROUND_EVENT_TYPES, EVENT_LABEL_MAP, EventTypeID } from '@lths/features/mms/ui-event-schedule';

import { GetEventsEvent, SerializableMMSEvent, TransormedGetEventsResponse } from './types';
import { ApiResponse } from '../types';

export const getEventsResponseTransformer = (response: ApiResponse<GetEventsEvent[]>): TransormedGetEventsResponse => {
  //  We need to extract all of the event types by parsing through every event and grabbing each unique one
  //  We need to split all "Event State" events into their own array so that they can be passed in as background events
  //  We need to grab all of the data for events and format it into what the calendar component expects
  const { data: apiEvents } = response;

  const events: SerializableMMSEvent[] = [];
  const eventStates: SerializableMMSEvent[] = [];

  apiEvents.forEach((event) => {
    if (event.is_deleted) return;

    const start = event.actual_start_date_time || event.start_date_time;
    const end = event.actual_end_date_time || event.end_date_time;
    const allDay =
      isEqual(startOfDay(new Date(start)), new Date(start)) && isEqual(endOfDay(new Date(end)), new Date(end));

    //  !! hardcoding this is brittle, but it is "by design"
    const isBackgroundEvent = BACKGROUND_EVENT_TYPES.includes(event.type);

    const uiEvent: SerializableMMSEvent = {
      start,
      end,
      allDay,
      title: event.name,
      id: event._id,
      eventId: event.event_id,
      isBackgroundEvent: isBackgroundEvent,
      eventType: {
        label: EVENT_LABEL_MAP[event.type] || 'Unknown',
        id: (event.type as EventTypeID) || 'N/A',
      },
      desc: isBackgroundEvent ? undefined : event.description,
      createdBy: isBackgroundEvent ? undefined : event.source || 'Unknown',
      createdOn: isBackgroundEvent ? undefined : event.created_on,
    };

    isBackgroundEvent ? eventStates.push(uiEvent) : events.push(uiEvent);
  });

  return { events, eventStates };
};
