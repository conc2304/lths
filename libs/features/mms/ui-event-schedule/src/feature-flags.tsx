import { ReactNode } from 'react';
import { Flag, FlagsProvider } from 'react-feature-flags';

export const eventSchedularPrefix = 'MMS_EVENT_SCHEDULER';

export const EVENT_SCHEDULER_IMPORT_EVENTS_FLAG = `${eventSchedularPrefix}--import-events`;
export const EVENT_SCHEDULER_EXPORT_EVENTS_FLAG = `${eventSchedularPrefix}--export-events`;
export const EVENT_SCHEDULER_CREATE_EVENTS_FLAG = `${eventSchedularPrefix}--create-events`;
export const EVENT_SCHEDULER_UPDATE_EVENTS_FLAG = `${eventSchedularPrefix}--update-events`;
export const EVENT_SCHEDULER_UPDATE_EVENT_STATES_FLAG = `${eventSchedularPrefix}--update-event-states`;

export const MOCK_EVENT_SCHEDULER_FLAGS: Flag[] = [
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

export const FlagsProviderMock = ({ children, value = [] }: { children: ReactNode; value?: Flag[] }) => {
  const providerValue = [...MOCK_EVENT_SCHEDULER_FLAGS, ...(value || [])];

  return <FlagsProvider value={providerValue}>{children}</FlagsProvider>;
};
