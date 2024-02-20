import { EventStateUI } from './types';

//  !! hardcoding event types bc that is how we do
export enum EVENT_TYPE {
  GAME = 'GAME',
  CONCERT = 'CONCERT',
  COMEDY = 'COMEDY',
  ARTS_OTHER = 'ARTS_OTHER',
  PRE_GAME = 'PRE_GAME',
  POST_GAME = 'POST_GAME',
}

// !! THIS will break but we have no other way to get labels
export const EVENT_LABEL_MAP = {
  GAME: 'Game',
  CONCERT: 'Concert',
  COMEDY: 'Comedy',
  ARTS_OTHER: 'Arts / Other',
  PRE_GAME: 'Pre Game',
  POST_GAME: 'Post Game',
};

// !! also hardcoded ... :(
export const BACKGROUND_EVENT_TYPES = [EVENT_TYPE.POST_GAME.toString(), EVENT_TYPE.PRE_GAME.toString()];

// !! moar hardcoding of ui
export const UNEDITABLE_EVENT_TYPES = [EVENT_TYPE.GAME, EVENT_TYPE.CONCERT];
export const EVENTS_W_STATES = [EVENT_TYPE.GAME, EVENT_TYPE.CONCERT];

export const EVENT_STATE_SORT_ORDER = {
  PRE_GAME: -1,
  GAME: 0,
  POST_GAME: 1,
};

// !! would you believe that i am going to also hard code this UI ?????
export const EventStateUIPreEvent: EventStateUI = {
  type: EVENT_TYPE.PRE_GAME,
  label: 'Pre-Event',
  desc: 'before event start',
  typeDependency: {
    relativeState: EVENT_TYPE.GAME,
    referencePoint: 'start',
    dependentPoint: 'start',
  },
};

export const EventStateUIInEvent: EventStateUI = {
  type: EVENT_TYPE.GAME,
  label: 'In-Event',
  desc: 'Event hours',
  typeDependency: {
    relativeState: null,
    referencePoint: null,
    dependentPoint: null,
  },
};

export const EventStateUIPostEvent: EventStateUI = {
  type: EVENT_TYPE.POST_GAME,
  label: 'Post-Event',
  desc: 'after event end',
  typeDependency: {
    relativeState: EVENT_TYPE.GAME,
    referencePoint: 'end',
    dependentPoint: 'end',
  },
};
