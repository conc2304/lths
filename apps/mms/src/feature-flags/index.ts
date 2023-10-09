import { Flag } from 'react-feature-flags';

import { EVENT_SCHEDULER_FLAGS } from './calendar-scheduler';

export const MMS_FEATURE_FLAGS: Flag[] = [...EVENT_SCHEDULER_FLAGS];

export const getFlagStatusByName = (name: string, fallback = false) => {
  const featureEnable = MMS_FEATURE_FLAGS.find((flag) => flag.name === name)?.isActive;
  return featureEnable !== undefined ? featureEnable : fallback;
};
