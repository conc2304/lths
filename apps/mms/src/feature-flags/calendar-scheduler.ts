import { Flag } from 'react-feature-flags';

import {
  EVENT_SCHEDULER_CREATE_EVENTS_FLAG,
  EVENT_SCHEDULER_EXPORT_EVENTS_FLAG,
  EVENT_SCHEDULER_IMPORT_EVENTS_FLAG,
  EVENT_SCHEDULER_UPDATE_EVENTS_FLAG,
  EVENT_SCHEDULER_UPDATE_EVENT_STATES_FLAG,
} from '@lths/features/mms/ui-event-schedule';

export const EVENT_SCHEDULER_FLAGS: Flag[] = [
  {
    name: EVENT_SCHEDULER_IMPORT_EVENTS_FLAG,
    isActive: true,
  },
  {
    name: EVENT_SCHEDULER_EXPORT_EVENTS_FLAG,
    isActive: true,
  },
  {
    name: EVENT_SCHEDULER_CREATE_EVENTS_FLAG,
    isActive: true,
  },
  {
    name: EVENT_SCHEDULER_UPDATE_EVENTS_FLAG,
    isActive: true,
  },
  {
    name: EVENT_SCHEDULER_UPDATE_EVENT_STATES_FLAG,
    isActive: true,
  },
];
