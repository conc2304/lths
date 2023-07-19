import { FilterGroupResponse, FormSchema } from '@lths/types/ui-filters';

// keeping around as reference,
// new data gets transformed in response into old data format
export const old_data: FormSchema[] = [
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

const New_DATA: FilterGroupResponse[] = [
  {
    _id: '64b726883e606c3000a5fb91',
    name: 'event_states',
    description: 'Event States',
    is_active: true,
    created_at: '2023-07-18T19:53:41.055Z',
    updated_at: '2023-07-18T19:53:41.055Z',
    __v: 0,
    filter_items: [
      {
        _id: '64b727ce3e606c3000a5fcdf',
        filter_group_id: '64b726883e606c3000a5fb91',
        name: 'Pre-event',
        is_active: true,
        created_at: '2023-07-18T19:53:41.056Z',
        updated_at: '2023-07-18T19:53:41.056Z',
        __v: 0,
      },
      {
        _id: '64b727d93e606c3000a5fcec',
        filter_group_id: '64b726883e606c3000a5fb91',
        name: 'Post-event',
        is_active: true,
        created_at: '2023-07-18T19:53:41.056Z',
        updated_at: '2023-07-18T19:53:41.056Z',
        __v: 0,
      },
      {
        _id: '64b727e63e606c3000a5fcfb',
        filter_group_id: '64b726883e606c3000a5fb91',
        name: 'Event day',
        is_active: true,
        created_at: '2023-07-18T19:53:41.056Z',
        updated_at: '2023-07-18T19:53:41.056Z',
        __v: 0,
      },
    ],
  },
  {
    _id: '64b728763e606c3000a5fd92',
    name: 'location',
    description: 'Location',
    filter_items: [
      {
        _id: '64b728a93e606c3000a5fdc7',
        filter_group_id: '64b728763e606c3000a5fd92',
        name: 'At Arena',
        is_active: true,
        created_at: '2023-07-18T19:53:41.056Z',
        updated_at: '2023-07-18T19:53:41.056Z',
        __v: 0,
      },
      {
        _id: '64b728de3e606c3000a5fdff',
        filter_group_id: '64b728763e606c3000a5fd92',
        name: 'Out of Arena',
        is_active: true,
        created_at: '2023-07-18T19:53:41.056Z',
        updated_at: '2023-07-18T19:53:41.056Z',
        __v: 0,
      },
    ],
    is_active: true,
    created_at: '2023-07-18T19:53:41.055Z',
    updated_at: '2023-07-18T19:53:41.055Z',
    __v: 0,
  },
  {
    _id: '64b729073e606c3000a5fe2b',
    name: 'user_segments',
    description: 'User Segments',
    filter_items: [
      {
        _id: '64b729213e606c3000a5fe47',
        filter_group_id: '64b729073e606c3000a5fe2b',
        name: 'Premium Members',
        is_active: true,
        created_at: '2023-07-18T19:53:41.056Z',
        updated_at: '2023-07-18T19:53:41.056Z',
        __v: 0,
      },
      {
        _id: '64b7292c3e606c3000a5fe55',
        filter_group_id: '64b729073e606c3000a5fe2b',
        name: 'Mighty Program Members',
        is_active: true,
        created_at: '2023-07-18T19:53:41.056Z',
        updated_at: '2023-07-18T19:53:41.056Z',
        __v: 0,
      },
      {
        _id: '64b729433e606c3000a5fe6e',
        filter_group_id: '64b729073e606c3000a5fe2b',
        name: 'Single Event Attendees',
        is_active: true,
        created_at: '2023-07-18T19:53:41.056Z',
        updated_at: '2023-07-18T19:53:41.056Z',
        __v: 0,
      },
    ],
    is_active: true,
    created_at: '2023-07-18T19:53:41.055Z',
    updated_at: '2023-07-18T19:53:41.055Z',
    __v: 0,
  },
];

const payload = { data: New_DATA };

export default payload;
