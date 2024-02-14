import { EnumGroup } from '@lths/features/mms/data-access';
import { FeatureFlag } from '@lths/shared/ui-admin';

export const enumValues: { name: string; value: FeatureFlag }[] = [
  {
    name: 'MMS_SCHEDULER--import-events',
    value: {
      title: 'IMPORT EVENTS',
      id: 'MMS_SCHEDULER--import-events',
      enabled: true,
      description: 'Ability to import external calendars into MMS',
      module: 'Scheduler',
    },
  },
  {
    name: 'MMS_SCHEDULER--export-events',
    value: {
      title: 'EXPORT EVENTS',
      id: 'MMS_SCHEDULER--export-events',
      enabled: true,
      description: 'Ability to download calendars as PDF or CSV',
      module: 'Scheduler',
    },
  },
  {
    name: 'MMS_SCHEDULER--create-events',
    value: {
      title: 'CREATE EVENTS',
      id: 'MMS_SCHEDULER--create-events',
      enabled: true,
      description: 'Ability to create new events the MMS scheduler',
      module: 'Scheduler',
    },
  },
  {
    name: 'MMS_SCHEDULER--update-events',
    value: {
      title: 'UPDATE EVENTS',
      id: 'MMS_SCHEDULER--update-events',
      enabled: true,
      description: 'Ability to update existing events the MMS scheduler',
      module: 'Scheduler',
    },
  },
  {
    name: 'MMS_SCHEDULER--update-event-states',
    value: {
      title: 'UPDATE EVENT STATES',
      id: 'MMS_SCHEDULER--update-event-states',
      enabled: true,
      description: "Ability to update existing events' event-states in the MMS scheduler",
      module: 'Scheduler',
    },
  },
];

export const enumGoup = EnumGroup.FEATURE_FLAGS;

export const FEATURE_FLAG_ENUM_DATA_MOCK = {
  _id: '65cd3500712d2da4cc1f8a31',
  enum_group: enumGoup,
  enum_values: enumValues,
};
