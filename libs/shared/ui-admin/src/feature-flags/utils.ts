import { slugify } from '@lths/shared/utils';

import { FeatureFlag } from './types';

export const getFlagStatusByFlagId = (id: string, flags: FeatureFlag[], fallback = false) => {
  const featureEnable = flags.find((flag) => flag.id === id)?.enabled;
  return featureEnable !== undefined ? featureEnable : fallback;
};

type GenerateIdProps = { title: string; module: string; appPrefix?: string };
export const generateId = ({ title, module, appPrefix = 'MMS' }: GenerateIdProps) => {
  return `${appPrefix.toUpperCase()}_${slugify(module).toUpperCase()}--${slugify(title)}`;
};
