import { Event } from 'react-big-calendar';

export const BaseColumnValue = (event: Event, column: string) => {
  return event[column as keyof Event] || false;
};
