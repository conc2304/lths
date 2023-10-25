import { differenceInHours, differenceInSeconds, endOfDay, startOfDay } from 'date-fns';

import {
  BACKGROUND_EVENT_STATES,
  EVENT_LABEL_MAP,
  EventState,
  EventStateID,
  EventStateUIMap,
  EventTypeID,
  FOREGROUND_EVENT_STATES,
} from '@lths/features/mms/ui-event-schedule';

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
    const allDay = startOfDay(new Date(start)) === new Date(start) && endOfDay(new Date(end)) === new Date(end);

    const eventState = event.state || null;
    //  !! hardcoding this is brittle, but it is "by design"
    const isBackgroundEventState = BACKGROUND_EVENT_STATES.includes(eventState);
    const isForegroundEventState = FOREGROUND_EVENT_STATES.includes(eventState);

    const isUnhandledEventState = !isForegroundEventState && !isBackgroundEventState;

    let isBackgroundEvent = isBackgroundEventState;
    if (isUnhandledEventState) {
      isBackgroundEvent = false;
    }

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
      eventStates: isBackgroundEvent ? undefined : getEventStatesByEventId(apiEvents, event.event_id),
      eventState: !isUnhandledEventState ? eventState : `Unregistered state: ${eventState} `,
      createdOn: isBackgroundEvent ? undefined : event.created_on,
    };

    isBackgroundEvent ? eventStates.push(uiEvent) : events.push(uiEvent);
  });

  return { events, eventStates };
};

export const getEventStatesByEventId = (events: GetEventsEvent[], eventId: string): EventState[] | undefined => {
  const eventsWithId = events.filter((event) => {
    return event.event_id === eventId;
  });

  if (!eventsWithId || !eventsWithId.length) return undefined;

  const eventStates: EventState[] = [];

  eventsWithId.forEach((event) => {
    const { state, actual_start_date_time, actual_end_date_time, start_date_time, end_date_time, _id, event_id } =
      event;

    if (!state) return;

    const currentStateStart = actual_start_date_time || start_date_time || null;
    const currentStateEnd = actual_end_date_time || end_date_time || null;

    const {
      label,
      desc,
      stateDependency: { relativeState, referencePoint, dependentPoint },
    } = EventStateUIMap(state as EventStateID);
    let timeOffset = null;
    if (relativeState) {
      // we are calculating the difference in time between the start of event and the targetTime

      // the event state that our current event state is relative to
      const dependOnEvent = eventsWithId.find((event) => event.state === relativeState);
      // the dependent event's start and end times

      const depEventStateStart = dependOnEvent.actual_start_date_time || dependOnEvent.start_date_time || null;
      const depEventStateEnd = dependOnEvent.actual_end_date_time || dependOnEvent.end_date_time || null;

      if (depEventStateStart && depEventStateEnd) {
        // get the time difference from the state's dependentPoint to the referencePoint
        const dependantTime = referencePoint === 'start' ? new Date(depEventStateStart) : new Date(depEventStateEnd);

        // if start
        //  offset is the difference between the start of the Current State and the start of the Dependant Event
        // if end
        //  offset is the difference between the end of the Depenedant Event and the end of the Current State
        timeOffset =
          dependentPoint === 'start'
            ? differenceInHours(dependantTime, new Date(currentStateStart))
            : differenceInHours(new Date(currentStateEnd), dependantTime);
      }
    }

    const eventState: EventState = {
      state: state as EventStateID,
      id: _id,
      name: event.name,
      eventId: event_id,
      start: currentStateStart,
      end: currentStateEnd,
      duration: Math.abs(differenceInSeconds(new Date(actual_start_date_time), new Date(actual_end_date_time))),
      label,
      desc,
      stateDependency: {
        relativeState,
        referencePoint: referencePoint,
        dependentPoint,
      },
      relativeOffsetHrs: timeOffset,
      source: event.source,
      type: event.type as EventTypeID,
    };

    eventStates.push(eventState);
  });

  return eventStates;
};
