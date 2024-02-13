import { slugify } from '@lths/shared/utils';

import { FeatureFlag } from './types';

export const getFlagStatusByFlagId = (id: string, flags: FeatureFlag[], fallback = false) => {
  const featureEnable = flags.find((flag) => flag.id === id)?.enabled;
  return featureEnable !== undefined ? featureEnable : fallback;
};

type GenerateIdProps = { title: string; module: string; appPrefix?: string };
export const generateFlagId = ({ title, module, appPrefix = 'MMS' }: GenerateIdProps) => {
  return `${appPrefix.toUpperCase()}_${slugify(module).toUpperCase()}--${slugify(title)}`;
};

type ParsedFlagId = {
  title: string;
  module: string;
  appPrefix: string;
};
export const parseFlagId = (flagId: string): ParsedFlagId => {
  const parts = flagId.split('--');
  const moduleAndAppPrefix = parts[0].split('_');
  const appPrefix = moduleAndAppPrefix[0];
  const module = moduleAndAppPrefix[1];
  const title = parts[1];

  return { title, module, appPrefix };
};
