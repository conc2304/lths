import { faker } from '@faker-js/faker';
import { addHours, addMonths, endOfDay, startOfDay, subHours, subMonths } from 'date-fns';
import { upperFirst } from 'lodash';

import { EVENTS_W_STATES, EVENT_TYPE } from './constants';
import { EventState, EventType, MMSEvent } from './types';

export const eventTypesMock: EventType[] = [
  { id: EVENT_TYPE.GAME, label: 'Game' },
  { id: EVENT_TYPE.CONCERT, label: 'Concert' },
  { id: EVENT_TYPE.COMEDY, label: 'Comedy' },
  { id: EVENT_TYPE.ARTS_OTHER, label: 'Arts / Other' },
  //
  { id: EVENT_TYPE.PRE_GAME, label: 'Pre Game' },
  { id: EVENT_TYPE.POST_GAME, label: 'Post Game' },
];

export const eventStateMock: EventState[] = [
  {
    name: 'whatever',
    id: '2134',
    eventId: faker.database.mongodbObjectId(),
    label: 'Pre-Event',
    type: EVENT_TYPE.PRE_GAME,
    duration: 1.5,
    start: new Date(),
    end: new Date(),
    desc: 'before event start',
    relativeOffsetHrs: 3,
    typeDependency: {
      relativeState: EVENT_TYPE.GAME,
      referencePoint: 'start',
      dependentPoint: 'start',
    },
  },
  {
    name: 'whatever',
    id: '2134',
    eventId: faker.database.mongodbObjectId(),
    label: 'In-Event',
    type: EVENT_TYPE.GAME,
    duration: 2800,
    start: new Date(),
    end: new Date(),
    desc: 'Event hours',
    typeDependency: {
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
    type: EVENT_TYPE.POST_GAME,
    duration: 2800,
    start: new Date(),
    end: new Date(),
    desc: 'after event end',
    typeDependency: {
      relativeState: EVENT_TYPE.GAME,
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
  isBackground?: boolean;
  eventId?: string;
};

export const getNewEvent = ({
  eventTypeID,
  completed = false,
  isToday = false,
  isAllDay = undefined,
  monthRange = 2,
  isBackground = false,
  eventId = undefined,
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

  const eventType = isBackground
    ? { label: 'Pre-Game', id: EVENT_TYPE.PRE_GAME }
    : eventTypeID
    ? (Object.values(eventTypesMock).find(({ id }) => id === eventTypeID) as EventType)
    : faker.helpers.arrayElement(eventTypesMock.slice(0, 4));

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
    eventId: eventId ?? faker.database.mongodbObjectId(),
    eventType: eventType,
    createdBy: createdBy,
    createdOn:
      faker.number.float({ max: 1, min: 0 }) > 0.3
        ? faker.date.between({ from: minRange, to: maxRange })
        : faker.date.between({ from: subHours(today, 24), to: today }),
    desc: faker.lorem.sentences(2),
  };
};

const eventsMock_temp: MMSEvent[] = Array.from(
  {
    length: 300,
  },
  () => getNewEvent({})
);

const mockEvents_temp = { events: eventsMock_temp, eventStates: [] as MMSEvent[] };

eventsMock_temp
  .filter((event) => event.eventType.id === EVENT_TYPE.GAME)
  .forEach((event) => {
    const preEvent = getNewEvent({
      eventTypeID: EVENT_TYPE.PRE_GAME,
      eventId: event.eventId,
    });
    const postEvent = getNewEvent({
      eventTypeID: EVENT_TYPE.POST_GAME,
      eventId: event.eventId,
    });

    mockEvents_temp.eventStates.push(preEvent, postEvent);
  });

export const { events: eventsMock, eventStates: eventStateMockEvents } = mockEvents_temp;
