import { endOfMonth, format, startOfMonth } from 'date-fns';

import { CalendarMonth } from './index';
import { generateEvents } from '../../../mock-events';

import type { Meta } from '@storybook/react';

const Story: Meta<typeof CalendarMonth> = {
  component: CalendarMonth,
  title: 'Features/Calendar/Month [Year View]',
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'large'] },
  },
};
export default Story;

const date = new Date(2023, 0, 15);
const mockEvents = generateEvents(15, {
  minEventDate: startOfMonth(date),
  maxEventDate: endOfMonth(date),
});

const handleDateClick = (args: any) => {
  const events = JSON.stringify(args?.events);
  alert(
    `Clicked on Date: ${format(args?.date, 'MMMM dd')}  \r\n
    Events: ${events} \r\n
    Anchor: ${args?.anchorEl.toString()} \r\n
    Popper Placement: ${args?.popperPlacement} \r\n
    `
  );
};
const handleWeekClick = (date: Date) => {
  const weekOf = format(date, 'EEE, MMMM d');
  alert(`Clicked on Week : ${weekOf}`);
};
const handleMonthClick = (date: Date) => {
  const month = format(date, 'MMMM');
  alert(`Clicked on Month: ${month}`);
};

export const Primary = {
  args: {
    date: date,
    events: mockEvents,
    onDateClick: handleDateClick,
    onMonthClick: handleMonthClick,
    onWeekClick: handleWeekClick,
    showWeekNumber: true,
    selectedDateId: 15,
    size: 'large',
  },
};
