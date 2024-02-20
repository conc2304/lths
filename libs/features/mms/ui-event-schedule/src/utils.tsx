import { SvgIconProps } from '@mui/material';
import {
  CelebrationRounded,
  FamilyRestroomRounded,
  LocalActivityRounded,
  LoyaltyRounded,
  SportsHockeyOutlined,
  QuestionMarkRounded,
} from '@mui/icons-material';
import { Property } from 'csstype';
import { addMinutes, differenceInMinutes, differenceInSeconds, subMinutes } from 'date-fns';

import {
  EventStateUIPostEvent,
  EventStateUIPreEvent,
  EventStateUIInEvent,
  EVENT_TYPE,
  EVENT_STATE_SORT_ORDER,
} from './constants';
import { EventState, EventStateID, EventStateUI, EventTypeID, MMSEvent } from './types';

export const EventStateUIMap = (eventStateID: EventStateID): EventStateUI => {
  switch (eventStateID) {
    case EVENT_TYPE.PRE_GAME:
      return EventStateUIPreEvent;
    case EVENT_TYPE.GAME:
      return EventStateUIInEvent;
    case EVENT_TYPE.POST_GAME:
      return EventStateUIPostEvent;
    default:
      return {
        typeDependency: {
          relativeState: null,
          referencePoint: null,
          dependentPoint: null,
        },
        type: eventStateID,
        label: eventStateID,
        desc: 'N/A',
      };
  }
};

export const sortByEventState = (a: EventState, b: EventState) => {
  const aVal =
    EVENT_STATE_SORT_ORDER[a.type as EventStateID] !== undefined ? EVENT_STATE_SORT_ORDER[a.type as EventStateID] : 10;
  const bVal =
    EVENT_STATE_SORT_ORDER[b.type as EventStateID] !== undefined ? EVENT_STATE_SORT_ORDER[b.type as EventStateID] : 10;

  if (aVal === bVal) return 0;
  return bVal > aVal ? -1 : 1;
};

/**
 * Maps an event type ID to its corresponding color value.
 *
 * Given an event type ID, this function returns the associated color value
 * based on a predefined mapping. If the event type ID is not found in the mapping,
 * a default color is returned.
 *
 * @function
 * @param {string} eventTypID - The ID representing the type of the event.
 * @returns {Property.Color} - A string representing the color value in HEX format.
 *
 * @example
 * const color = eventColorMap('GAME');  // Returns '#FDD58C'
 */
export const eventColorMap = (eventTypID: string): Property.Color => {
  const eventTypeToColor = {
    GAME: '#F47A38', // Ananehiem Orange
    CONCERT: '#ECABBB',
    COMEDY: '#CED0E9',
    ARTS_OTHER: '#D1EBD2',
  };

  return eventTypeToColor[eventTypID.toUpperCase() as 'GAME' | 'CONCERT' | 'COMEDY' | 'ARTS_OTHER']
    ? eventTypeToColor[eventTypID.toUpperCase() as 'GAME' | 'CONCERT' | 'COMEDY' | 'ARTS_OTHER']
    : '#A6CEE0';
};

/**
 * Returns the appropriate icon component for a given event type ID.
 *
 * **Deprecated**: This function is no longer recommended for use but is retained
 * for potential future requirements regarding icon rendering.
 *
 * @function
 * @param {string} id - The ID representing the type of the event.
 * @param {Object} props - Properties to pass to the SVG icon component.
 * @returns {JSX.Element} The icon component corresponding to the provided event type ID.
 *
 * @example
 * <EventTypeIcon id="hockey_game" {...someProps} />
 */
export const EventTypeIcon =
  (id: string): ((props: SvgIconProps) => JSX.Element) =>
  (props: SvgIconProps) => {
    switch (id) {
      case 'hockey_game':
        return <SportsHockeyOutlined {...props} />;
      case 'concert':
        return <CelebrationRounded {...props} />;
      case 'family_day':
        return <FamilyRestroomRounded {...props} />;
      case 'theme_events':
        return <LocalActivityRounded {...props} />;
      case 'promotion':
        return <LoyaltyRounded {...props} />;
      default:
        return <QuestionMarkRounded {...props} />;
    }
  };

/**
 * Converts an event's state and offset into a date range, adjusting the start and/or end time based on the offset.
 *
 * Given an event state and an offset, this function calculates a new start and/or end time for the event.
 * The new times are determined based on how the event's dependency points (start or end) are relative to
 * another event's reference points (start or end).
 *
 * @function
 * @param {Object} eventState - The event's current state details.
 * @param {number} offset - The number of hours to adjust the date range by.
 * @returns {Object} - An object containing the adjusted start and end date-times in UTC format.
 * @returns {string} return.start - The adjusted start date-time of the event in UTC format.
 * @returns {string} return.end - The adjusted end date-time of the event in UTC format.
 */
export const eventStateOffsetToDateRange = (
  eventState: EventState,
  offset: number
): { start: string; end: string; offsetDifference: number; relativeTo: 'start' | 'end' | null } => {
  const {
    typeDependency: { dependentPoint, referencePoint },
    relativeOffsetHrs,
    start,
    end,
  } = eventState;

  // difference from the original offset and the new offset to calculate new start/end time
  const offsetDifferenceHrs = offset - (relativeOffsetHrs ?? 0);
  const offsetDifferenceMin = offsetDifferenceHrs * 60;
  let startTime = new Date(start);
  let endTime = new Date(end);

  const referenceTime = referencePoint === 'start' ? startTime : endTime;

  if (dependentPoint === 'start') {
    startTime = subMinutes(referenceTime, offsetDifferenceMin);
  } else {
    endTime = addMinutes(referenceTime, offsetDifferenceMin);
  }

  return {
    start: startTime.toISOString(),
    end: endTime.toISOString(),
    offsetDifference: offsetDifferenceHrs,
    relativeTo: dependentPoint,
  };
};

export const getEventStatesByEventId = (events: MMSEvent[], eventId: string): EventState[] => {
  const eventsWithId = events.filter((event) => {
    return event.eventId === eventId;
  });

  if (!eventsWithId || !eventsWithId.length) return [];

  const eventStates: EventState[] = [];

  eventsWithId.forEach((event) => {
    const { eventType, start, end } = event;
    if (!eventType || !start || !end) return [];

    const currentStateStart = start;
    const currentStateEnd = end;

    const {
      label,
      desc,
      typeDependency: { relativeState, referencePoint, dependentPoint },
    } = EventStateUIMap(eventType.id as EventStateID);
    let timeOffset: number | null = null;

    if (relativeState) {
      // we are calculating the difference in time between the start of event and the targetTime

      // the event state that our current event state is relative to
      const dependOnEvent = eventsWithId.find((event) => event.eventType.id === relativeState);

      // the dependent event's start and end times
      const depEventStateStart = dependOnEvent?.start || null;
      const depEventStateEnd = dependOnEvent?.end || null;

      if (depEventStateStart && depEventStateEnd) {
        // get the time difference from the state's dependentPoint to the referencePoint
        const dependantTime = referencePoint === 'start' ? new Date(depEventStateStart) : new Date(depEventStateEnd);

        // if start
        //  offset is the difference between the start of the Current State and the start of the Dependant Event
        // if end
        //  offset is the difference between the end of the Depenedant Event and the end of the Current State
        timeOffset =
          dependentPoint === 'start'
            ? differenceInMinutes(dependantTime, new Date(currentStateStart)) / 60
            : differenceInMinutes(new Date(currentStateEnd), dependantTime) / 60;
      }
    }

    const eventState: EventState = {
      id: event.id,
      name: event.title as string,
      eventId: event.eventId,
      start,
      end,
      duration: Math.abs(differenceInSeconds(new Date(start), new Date(end))),
      label,
      desc,
      typeDependency: {
        relativeState,
        referencePoint: referencePoint,
        dependentPoint,
      },
      relativeOffsetHrs: timeOffset,
      source: event.createdBy,
      type: event.eventType.id as EventTypeID,
    };

    eventStates.push(eventState);
  });

  return eventStates.sort(sortByEventState);
};

export const updateEventStatesWithOffsets = (
  eventStates: EventState[],
  offSetValues: Record<EventStateID | string, number | undefined>
): EventState[] => {
  const updatedEventStates: EventState[] = [];
  const offsets = [];

  for (const eventState of eventStates) {
    if (eventState.type === EVENT_TYPE.GAME) continue;

    const offset = offSetValues[eventState.type];
    if (!offset) continue;

    const {
      start: newStart,
      end: newEnd,
      offsetDifference: offsetDifferenceHrs,
      relativeTo,
    } = eventStateOffsetToDateRange(eventState, offset);

    offsets.push({ offsetDifferenceHrs, relativeTo, state: eventState.type });
    if (offsetDifferenceHrs === 0) continue;

    const newDuration = Math.abs(differenceInSeconds(new Date(newStart), new Date(newEnd)));

    updatedEventStates.push({
      ...eventState,
      duration: newDuration,
      start: newStart,
      end: newEnd,
    });
  }

  // check if any of our dependencies changed and update those
  for (const eventState of eventStates) {
    const {
      type: currState,
      typeDependency: { relativeState },
    } = eventState;

    // find the relativeState and offsetData
    const updatedRelativeEventState = updatedEventStates.find((eventState) => eventState.type === relativeState);
    const offsetData = offsets.find((eventState) => eventState.state === relativeState);

    // relative state did not change so we dont need to update this one
    if (!updatedRelativeEventState || !offsetData || !offsetData.offsetDifferenceHrs) continue;

    // how much did the dependency move by
    const { relativeTo, offsetDifferenceHrs } = offsetData;

    // it did change so get the offset of the changed

    // update the start and end time by that offset

    // check if the user updated it already and make that the offset point
    const preUpdatedEventIndex = updatedEventStates.findIndex((eventState) => eventState.type === currState);

    const start = preUpdatedEventIndex ? updatedEventStates[preUpdatedEventIndex]?.start : eventState.start;
    const end = preUpdatedEventIndex ? updatedEventStates[preUpdatedEventIndex]?.end : eventState.end;

    // if start,  subtract hours from start and end
    // if end,   add hours to start and end
    const updatedStart =
      relativeTo === 'start'
        ? subMinutes(new Date(start), offsetDifferenceHrs * 60)
        : addMinutes(new Date(start), offsetDifferenceHrs * 60);
    const updatedEnd =
      relativeTo === 'start'
        ? subMinutes(new Date(end), offsetDifferenceHrs * 60)
        : addMinutes(new Date(end), offsetDifferenceHrs * 60);

    if (preUpdatedEventIndex < 0) {
      updatedEventStates.push({
        ...eventState,
        start: updatedStart,
        end: updatedEnd,
      });
    } else {
      updatedEventStates[preUpdatedEventIndex].start = updatedStart;
      updatedEventStates[preUpdatedEventIndex].end = updatedEnd;
    }
  }

  return updatedEventStates;
};
