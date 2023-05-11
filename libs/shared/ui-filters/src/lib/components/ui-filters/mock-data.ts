import {
  getPrevFullDayRange,
  getPrevFullHalfYearRange,
  getPrevFullHourRange,
  getPrevFullMonthRange,
  getPrevFullQuarterRange,
  getPrevFullWeekRange,
  getPrevFullYearRange,
} from '@lths/shared/utils';
import { DateFilterOptions, FormSchema, FormState } from '@lths/types/ui-filters';

export const DateRangeFilterOptions_Mock: DateFilterOptions = [
  {
    label: '1 Hour',
    dateRange: getPrevFullHourRange,
  },
  {
    label: '1 Day',
    dateRange: getPrevFullDayRange,
  },
  {
    label: '7 Days',
    dateRange: getPrevFullWeekRange,
    isDefaultValue: true,
  },
  {
    // Previous full Month
    label: '30 Days',
    dateRange: getPrevFullMonthRange,
  },
  {
    // Previous Quarter
    label: '3 Months',
    dateRange: getPrevFullQuarterRange,
  },
  {
    // Previous full half year
    label: '6 Months',
    dateRange: getPrevFullHalfYearRange,
  },
  {
    // Previous full year
    label: '12 Months',
    dateRange: getPrevFullYearRange,
  },
];

export const formState_Mock: FormState = {
  event_state: {
    pre_game: {
      title: 'Pre-game',
      id: 'pre_game',
    },
  },
};

export const formSchema_Mock: FormSchema[] = [
  {
    title: 'Event States',
    info: {
      description: 'Mock Description of filter',
      url: 'linkto.info.com',
    },
    id: 'event_state',
    seq: 0,
    type: null,
    data: [
      {
        type: 'checkbox',
        title: null,
        seq: -10,
        default_value: ['pre_game'],
        data: [
          {
            title: 'Pre-game',
            id: 'pre_game',
            seq: 1,
          },
          {
            title: 'No Event',
            id: 'no_event',
            seq: 5,
          },
          {
            title: 'During the Event',
            id: 'during_event',
            seq: 3,
          },
          {
            title: 'Event day',
            id: 'event_day',
            seq: 2,
          },
          {
            title: 'Post event',
            id: 'post_event',
            seq: 4,
          },
        ],
      },
    ],
  },
  {
    title: 'Location',
    id: 'location',
    info: {
      description: 'Mock Description of Location Filter',
      url: 'example.com',
    },
    seq: 1,
    data: [
      {
        type: 'checkbox',
        title: null,
        seq: 2,
        default_value: ['at_home'],
        data: [
          {
            title: 'At arena',
            id: 'at_arena',
            seq: 1,
          },
          {
            title: 'At home',
            id: 'at_home',
            seq: 2,
          },
        ],
      },
    ],
  },
  {
    title: 'User Segments',
    id: 'user_segments',
    type: null,
    info: {
      url: 'url.com',
      description: 'Info About User Segments',
    },
    seq: [3, 10],
    data: [
      {
        type: 'checkbox',
        title: null,
        default_value: [],
        data: [
          {
            title: 'Single-event Attendees',
            id: 'single_event_attendees',
          },
          {
            title: 'Mighty Program Members',
            id: 'mighty_program_members',
          },
          {
            title: 'Premium Members',
            id: 'premium_members',
          },
        ],
      },
    ],
  },
];
