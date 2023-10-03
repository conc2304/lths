import { faker } from '@faker-js/faker';
import { addHours, addMinutes, addMonths, endOfDay, startOfDay, subHours, subMinutes, subMonths } from 'date-fns';
import { upperFirst } from 'lodash';

import { EVENTS_W_STATES, EVENT_STATE, EVENT_TYPE } from './constants';
import { EventState, EventType, MMSEvent } from './types';

export const eventTypesMock: EventType[] = [
  { id: EVENT_TYPE.GAME, label: 'Hockey Game' },
  { id: EVENT_TYPE.CONCERT, label: 'Concert' },
  { id: EVENT_TYPE.COMEDY, label: 'Comedy' },
  { id: EVENT_TYPE.ARTS_OTHER, label: 'Arts / Other' },
];

export const eventStateMock: EventState[] = [
  {
    name: 'whatever',
    id: '2134',
    eventId: faker.database.mongodbObjectId(),
    label: 'Pre-Event',
    state: EVENT_STATE.PRE_EVENT,
    duration: 1.5,
    start: new Date(),
    end: new Date(),
    desc: 'before event start',
    relativeOffsetHrs: 3,
    stateDependency: {
      relativeState: EVENT_STATE.IN_EVENT,
      referencePoint: 'start',
      dependentPoint: 'start',
    },
  },
  {
    name: 'whatever',
    id: '2134',
    eventId: faker.database.mongodbObjectId(),
    label: 'In-Event',
    state: EVENT_STATE.IN_EVENT,
    duration: 2800,
    start: new Date(),
    end: new Date(),
    desc: 'Event hours',
    stateDependency: {
      relativeState: null,
      referencePoint: null,
      dependentPoint: null,
    },
    relativeOffsetHrs: 3,
  },
  {
    name: 'whatever',
    id: '2134',

    eventId: faker.database.mongodbObjectId(),
    label: 'Post-Event',
    state: EVENT_STATE.POST_EVENT,
    duration: 2800,
    start: new Date(),
    end: new Date(),
    desc: 'after event end',
    stateDependency: {
      relativeState: EVENT_STATE.IN_EVENT,
      referencePoint: 'end',
      dependentPoint: 'end',
    },
    relativeOffsetHrs: 3,
  },
];

type GetNewEventProps = {
  eventTypeID?: string;
  completed?: boolean;
  isToday?: boolean;
  isAllDay?: boolean;
  monthRange?: number;
};
export const getNewEvent = ({
  eventTypeID,
  completed = false,
  isToday = false,
  isAllDay = undefined,
  monthRange = 2,
}: GetNewEventProps): MMSEvent => {
  const today = new Date();
  const minRange = isToday ? startOfDay(today) : subMonths(today, monthRange);
  const maxRange = isToday ? endOfDay(today) : addMonths(today, monthRange);

  const start = completed
    ? faker.date.between({ from: minRange, to: subHours(today, 48) })
    : faker.date.between({ from: minRange, to: maxRange });
  const end = completed
    ? faker.date.between({ from: start, to: subHours(today, 1) })
    : addHours(start, faker.number.float({ max: 6, min: 0.5 }));

  const eventType = eventTypeID
    ? (Object.values(eventTypesMock).find(({ id }) => id === eventTypeID) as EventType)
    : faker.helpers.arrayElement(eventTypesMock);

  const allDayEvent =
    isAllDay !== undefined
      ? isAllDay
      : EVENTS_W_STATES.map((e) => e.toString()).includes(eventType.id.toString())
      ? false
      : faker.datatype.boolean({ probability: 0.2 });

  let createdBy: string;

  switch (eventType.id) {
    case EVENT_TYPE.GAME:
      createdBy = 'http://api.nhl.com/anaheim ';
      break;
    case EVENT_TYPE.CONCERT:
      createdBy = 'http://api.ticketmaster.com';
      break;
    default:
      createdBy = faker.person.fullName();
  }

  return {
    title: `${faker.music.songName()}: ${upperFirst(faker.company.buzzVerb())} ${upperFirst(faker.company.buzzNoun())}`,
    allDay: allDayEvent,
    start: allDayEvent ? startOfDay(start) : start,
    end: allDayEvent ? endOfDay(start) : end,
    id: faker.database.mongodbObjectId(),
    eventId: faker.database.mongodbObjectId(),
    eventType: eventType,
    createdBy: createdBy,
    createdOn:
      faker.number.float({ max: 1, min: 0 }) > 0.3
        ? faker.date.between({ from: minRange, to: maxRange })
        : faker.date.between({ from: subHours(today, 24), to: today }),
    desc: faker.lorem.sentences(2),
    eventStates: eventStateMock,
  };
};

const eventsMock_temp: MMSEvent[] = Array.from(
  {
    length: 300,
  },
  () => getNewEvent({})
);

const getEventStatesMockEvents = (events: MMSEvent[]) => {
  const eventStatesEvents: MMSEvent[] = [];

  events.forEach((event, i) => {
    const { start: eventStart, end: eventEnd, eventStates, eventType } = event;
    if (!eventStart || !eventEnd) return;
    if (!!eventType && !EVENTS_W_STATES.map((e) => e.toString()).includes(eventType.id.toString())) return;

    let stateStart: Date;
    let stateEnd: Date;

    const preEventLength = 15 * faker.number.int({ max: 16, min: 2 });
    const postEventLength = 15 * faker.number.int({ max: 16, min: 2 });

    eventStates?.forEach((eventState, j) => {
      switch (eventState.state) {
        case EVENT_STATE.PRE_EVENT:
          stateStart = subMinutes(eventStart, preEventLength);
          stateEnd = eventStart;
          break;
        case EVENT_STATE.IN_EVENT:
          stateStart = eventStart;
          stateEnd = eventEnd;
          break;
        case EVENT_STATE.POST_EVENT:
          stateStart = eventEnd;
          stateEnd = addMinutes(eventStart, postEventLength);
          break;

        default:
          break;
      }

      if (typeof events[i].eventStates !== 'undefined') {
        const updatedEvent = {
          ...events[i],
          eventStates: [...(events[i].eventStates || [])],
        };

        updatedEvent.eventStates[j] = {
          ...updatedEvent.eventStates[j],
          start: stateStart,
          end: stateEnd,
        };

        events[i] = updatedEvent;
      }

      eventStatesEvents.push({
        title: event.title,
        allDay: false,
        start: stateStart,
        end: stateEnd,
        id: faker.database.mongodbObjectId(),
        eventId: faker.database.mongodbObjectId(),
        isBackgroundEvent: true,
        eventType: eventType,
        createdBy: undefined,
        createdOn: undefined,
        desc: undefined,
        eventStates: undefined,
        eventState: eventState.label,
      });
    });
  });

  return { events, eventStates: eventStatesEvents };
};

export const { events: eventsMock, eventStates: eventStateMockEvents } = getEventStatesMockEvents(eventsMock_temp);
