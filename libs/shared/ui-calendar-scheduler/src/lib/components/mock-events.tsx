import { faker } from '@faker-js/faker';
import { addHours, addMonths, endOfDay, startOfDay, subHours, subMonths } from 'date-fns';
import { upperFirst } from 'lodash';
import { Event } from 'react-big-calendar';

type GetNewEventProps = { completed?: boolean; isToday?: boolean; isAllDay?: boolean };

export const getNewEvent = ({ completed = false, isToday = false, isAllDay = undefined }: GetNewEventProps): Event => {
  const today = new Date();
  const minRange = isToday ? startOfDay(today) : subMonths(today, 2);
  const maxRange = isToday ? endOfDay(today) : addMonths(today, 2);

  const start = completed
    ? faker.date.between({ from: minRange, to: subHours(today, 48) })
    : faker.date.between({ from: minRange, to: maxRange });
  const end = completed
    ? faker.date.between({ from: start, to: subHours(today, 1) })
    : addHours(start, faker.number.float({ max: 6, min: 0.5 }));

  const allDayEvent = isAllDay !== undefined ? isAllDay : faker.datatype.boolean({ probability: 0.2 });

  return {
    title: `${faker.music.songName()}: ${upperFirst(faker.company.buzzVerb())} ${upperFirst(faker.company.buzzNoun())}`,
    allDay: allDayEvent,
    start: isAllDay ? startOfDay(start) : start,
    end: isAllDay ? endOfDay(start) : end,
  };
};

export const eventsMock: Event[] = Array.from(
  {
    length: 300,
  },
  () => getNewEvent({})
);
