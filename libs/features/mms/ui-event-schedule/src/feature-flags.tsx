import { slugify } from '@lths/shared/utils';

const appPrefix = 'MMS';
const featureModule = 'SCHEDULER';

type GenerateIdProps = { title: string; module: string; appPrefix?: string };
const generateId = ({ title, module, appPrefix = 'MMS' }: GenerateIdProps) => {
  return `${appPrefix.toUpperCase()}_${slugify(module).toUpperCase()}--${slugify(title)}`;
};

export const EVENT_SCHEDULER_IMPORT_EVENTS_FLAG = generateId({
  title: 'import events',
  module: featureModule,
  appPrefix,
});
export const EVENT_SCHEDULER_EXPORT_EVENTS_FLAG = generateId({
  title: 'export events',
  module: featureModule,
  appPrefix,
});
export const EVENT_SCHEDULER_CREATE_EVENTS_FLAG = generateId({
  title: 'create events',
  module: featureModule,
  appPrefix,
});
export const EVENT_SCHEDULER_UPDATE_EVENTS_FLAG = generateId({
  title: 'update events',
  module: featureModule,
  appPrefix,
});
export const EVENT_SCHEDULER_UPDATE_EVENT_STATES_FLAG = generateId({
  title: 'update event-states',
  module: featureModule,
  appPrefix,
});
