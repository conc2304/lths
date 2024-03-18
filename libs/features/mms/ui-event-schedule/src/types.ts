import { Event } from 'react-big-calendar';

import { EVENT_TYPE } from './constants';

export type EventType = { id: EventTypeID | string; label: string };

export type EventTypeID =
  | EVENT_TYPE.GAME
  | EVENT_TYPE.CONCERT
  | EVENT_TYPE.GAME
  | EVENT_TYPE.PRE_GAME
  | EVENT_TYPE.POST_GAME;

export type EventStateID = EVENT_TYPE.GAME | EVENT_TYPE.PRE_GAME | EVENT_TYPE.POST_GAME;

export interface EventStateBase {
  id: string;
  eventId: string;
  duration: number | undefined;
  start: Date | string;
  end: Date | string;
  relativeOffsetHrs: number | null;
  source?: string;
  type: EventTypeID;
  name: string;
}

export type EventStateUI = {
  type: EventTypeID;
  label: string;
  desc: string;
  /**
   * Information on how this event state depends on another event state.
   */
  typeDependency: {
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
  eventType: EventType;
  desc: string | JSX.Element;
  createdBy?: string;
  createdOn?: Date;
  location?: 'home' | 'away';
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
