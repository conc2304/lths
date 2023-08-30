import { Event } from 'react-big-calendar';

import { EVENT_STATE, EVENT_TYPE } from './constants';

export type EventType = { id: EventTypeID | string; label: string };

export type EventTypeID = EVENT_TYPE.GAME | EVENT_TYPE.CONCERT;

export type EventStateID =
  | EVENT_STATE.IN_EVENT
  | EVENT_STATE.PRE_EVENT
  | EVENT_STATE.POST_EVENT
  | EVENT_STATE.EVENT_DAY;

export interface EventStateBase {
  id: string;
  eventId: string;
  duration: number | undefined;
  start: Date | string;
  end: Date | string;
  relativeOffsetHrs: number;
  source?: string;
  type?: EventTypeID;
  name: string;
}

export type EventStateUI = {
  state: EventStateID;
  label: string;
  desc: string;
  /**
   * Information on how this event state depends on another event state.
   */
  stateDependency: {
    /**
     * The event state that this is relative to.
     */
    relativeState: EventStateID | null;

    /**
     * If it's relative to the "start" or "end" of the relativeState.
     */
    referencePoint: 'start' | 'end' | null;

    /**
     * If it's the "start" or "end" of the current event that changes relative to the relativeState's referencePoint.
     */
    dependentPoint: 'start' | 'end' | null;
  };
};

export type EventState = EventStateUI & EventStateBase;

export type EventStates = EventState[];

export interface MMSEvent extends Event {
  id: string;
  eventId: string;
  isBackgroundEvent?: boolean;
  eventType?: EventType;
  desc?: string | JSX.Element;
  createdBy?: string;
  createdOn?: Date;
  eventStates?: EventState[];
  eventState?: string;
}

export type EventFormValues = {
  eventName: string;
  isAllDay: boolean;
  startDateTime: Date | null;
  endDateTime: Date | null;
  eventType: EventType;
  description?: string;
  eventId?: string;
  id?: string;
};
