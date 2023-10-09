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
import { addHours, subHours } from 'date-fns';

import {
  EVENT_STATE,
  EventStateUIPostEvent,
  EventStateUIPreEvent,
  EventStateUIInEvent,
  EVENT_STATE_SORT_ORDER,
} from './constants';
import { EventState, EventStateID, EventStateUI } from './types';

export const EventStateUIMap = (eventStateID: EventStateID): EventStateUI => {
  switch (eventStateID) {
    case EVENT_STATE.PRE_EVENT:
      return EventStateUIPreEvent;
    case EVENT_STATE.IN_EVENT:
      return EventStateUIInEvent;
    case EVENT_STATE.POST_EVENT:
      return EventStateUIPostEvent;
    default:
      return {
        stateDependency: {
          relativeState: null,
          referencePoint: null,
          dependentPoint: null,
        },
        state: eventStateID,
        label: eventStateID,
        desc: 'N/A',
      };
  }
};

export const sortByEventState = (a: EventState, b: EventState) => {
  const aVal = EVENT_STATE_SORT_ORDER[a.state] !== undefined ? EVENT_STATE_SORT_ORDER[a.state] : 10;
  const bVal = EVENT_STATE_SORT_ORDER[b.state] !== undefined ? EVENT_STATE_SORT_ORDER[b.state] : 10;

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
    GAME: '#FDD58C',
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
    stateDependency: { dependentPoint, referencePoint },
    relativeOffsetHrs,
    start,
    end,
  } = eventState;

  // difference from the original offset and the new offset to calculate new start/end time
  const offsetDifference = offset - relativeOffsetHrs;
  let startTime = new Date(start);
  let endTime = new Date(end);

  const referenceTime = referencePoint === 'start' ? startTime : endTime;

  if (dependentPoint === 'start') {
    startTime = subHours(referenceTime, offsetDifference);
  } else {
    endTime = addHours(referenceTime, offsetDifference);
  }

  return {
    start: startTime.toISOString(),
    end: endTime.toISOString(),
    offsetDifference,
    relativeTo: dependentPoint,
  };
};

export const updateEventStatesWithOffsets = (
  eventStates: EventState[],
  offSetValues: Record<EventStateID | string, number | undefined>
): EventState[] => {
  const updatedEventStates: EventState[] = [];
  const offsets = [];

  for (const eventState of eventStates) {
    if (eventState.state === EVENT_STATE.IN_EVENT) continue;

    const offset = offSetValues[eventState.state];

    const {
      start: newStart,
      end: newEnd,
      offsetDifference,
      relativeTo,
    } = offset !== undefined
      ? eventStateOffsetToDateRange(eventState, offset)
      : { start: eventState.start, end: eventState.end, offsetDifference: null, relativeTo: null };

    offsets.push({ offsetDifference, relativeTo, state: eventState.state });

    updatedEventStates.push({
      ...eventState,
      start: newStart,
      end: newEnd,
    });
  }

  // check if any of our dependencies changed and update those
  for (const eventState of eventStates) {
    //
    const {
      state: currState,
      stateDependency: { relativeState },
    } = eventState;

    // find the relativeState and offsetData
    const updatedRelativeEventState = updatedEventStates.find((eventState) => eventState.state === relativeState);
    const offsetData = offsets.find((eventState) => eventState.state === relativeState);

    // relative state did not change so we dont need to update this one
    if (!updatedRelativeEventState || !offsetData || !offsetData.offsetDifference) continue;

    // how much did the dependency move by
    const { relativeTo, offsetDifference } = offsetData;

    // it did change so get the offset of the changed

    // update the start and end time by that offset

    // check if the user updated it already and make that the offset point
    const preUpdatedEventIndex = updatedEventStates.findIndex((eventState) => eventState.state === currState);

    const start = preUpdatedEventIndex ? updatedEventStates[preUpdatedEventIndex]?.start : eventState.start;
    const end = preUpdatedEventIndex ? updatedEventStates[preUpdatedEventIndex]?.end : eventState.end;

    // if start,  subtract hours from start and end
    // if end,   add hours to start and end
    const updatedStart =
      relativeTo === 'start'
        ? subHours(new Date(start), offsetDifference)
        : addHours(new Date(start), offsetDifference);
    const updatedEnd =
      relativeTo === 'start' ? subHours(new Date(end), offsetDifference) : addHours(new Date(end), offsetDifference);

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
