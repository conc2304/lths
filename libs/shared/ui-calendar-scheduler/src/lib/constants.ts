import { Messages } from 'react-big-calendar';

export const CALENDAR_MESSAGES: Messages = {
  date: 'Date',
  time: 'Time',
  event: 'Event',
  allDay: 'All Day',
  week: 'Week',
  work_week: 'Work Week',
  day: 'Day',
  month: 'Month',
  previous: 'Back',
  next: 'Next',
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  today: 'Today',
  agenda: 'Agenda',
  noEventsInRange: 'There are no events in this range.',
  showMore: (total) => `+${total} more`,
  year: 'Year', // year has been added to the Messages interface by us
};

export const TMZ = 'PST';

export const DEFAULT_LIST_VIEW_COL_HEADER = [
  {
    id: 'title',
    label: 'Title',
    sortable: true,
  },
  {
    id: 'start',
    label: 'Start Time',
    sortable: true,
  },

  {
    id: 'end',
    label: 'End Time',
    sortable: true,
  },
  {
    id: 'isAll',
    label: 'Is All Day',
    sortable: true,
  },
];
