import { EventStateUI } from './types';

//  !! hardcoding event types bc that is how we do
export enum EVENT_TYPE {
  GAME = 'GAME',
  CONCERT = 'CONCERT',
  COMEDY = 'COMEDY',
  ARTS_OTHER = 'ARTS_OTHER',
}

// !! THIS will break but we have no other way to get labels
export const EVENT_LABEL_MAP = {
  GAME: 'Game',
  CONCERT: 'Concert',
  COMEDY: 'Comedy',
  ARTS_OTHER: 'Arts / Other',
};

//  !! hardcoding EVENT States bc that is still how we do
export enum EVENT_STATE {
  IN_EVENT = 'INGAME',
  PRE_EVENT = 'PREGAME',
  POST_EVENT = 'POSTGAME',
  EVENT_DAY = 'EVENTDAY',
}

// !! also hardcoded ... :(
export const BACKGROUND_EVENT_STATES = ['PREGAME', 'POSTGAME', 'EVENTDAY'];

// !! moar hardcoding of ui
export const UNEDITABLE_EVENT_TYPES = [EVENT_TYPE.GAME, EVENT_TYPE.CONCERT];
export const EVENTS_W_STATES = [EVENT_TYPE.GAME, EVENT_TYPE.CONCERT];

// !! would you believe that i am going to also hard code this UI ?????
export const EventStateUIEventDay: EventStateUI = {
  state: EVENT_STATE.EVENT_DAY,
  label: 'Event Day',
  desc: 'before pre-event start',
  stateDependency: {
    relativeState: EVENT_STATE.PRE_EVENT,
    referencePoint: 'start',
    dependentPoint: 'start',
  },
};

export const EventStateUIPreEvent: EventStateUI = {
  state: EVENT_STATE.PRE_EVENT,
  label: 'Pre-Event',
  desc: 'before event start',
  stateDependency: {
    relativeState: EVENT_STATE.IN_EVENT,
    referencePoint: 'start',
    dependentPoint: 'start',
  },
};

export const EventStateUIInEvent: EventStateUI = {
  state: EVENT_STATE.IN_EVENT,
  label: 'In-Event',
  desc: 'Event hours',
  stateDependency: {
    relativeState: null,
    referencePoint: null,
    dependentPoint: null,
  },
};

export const EventStateUIPostEvent: EventStateUI = {
  state: EVENT_STATE.POST_EVENT,
  label: 'Post-Event',
  desc: 'after event end',
  stateDependency: {
    relativeState: EVENT_STATE.IN_EVENT,
    referencePoint: 'end',
    dependentPoint: 'end',
  },
};
