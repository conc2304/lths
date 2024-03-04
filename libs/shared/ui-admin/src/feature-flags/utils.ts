import { getUniqueValuesByKey, slugify } from '@lths/shared/utils';

import { EnumValue, FeatureFlag, FlagCRUDMethods, FlagCRUDPayloadFn } from './types';

type GenerateIdProps = { title: string; module: string; appPrefix?: string };

type ParsedFlagId = {
  title: string;
  module: string;
  appPrefix: string;
};

export const generateFlagId = ({ title, module, appPrefix = 'MMS' }: GenerateIdProps) => {
  return `${appPrefix.toUpperCase()}_${slugify(module).toUpperCase()}--${slugify(title)}`;
};

export const getFlagStatusByFlagId = (id: string, flags: FeatureFlag[], fallback = false) => {
  const featureEnable = flags.find((flag) => flag.id === id)?.enabled;
  return featureEnable !== undefined ? featureEnable : fallback;
};

export const parseFlagId = (flagId: string): ParsedFlagId => {
  const parts = flagId.split('--');
  const moduleAndAppPrefix = parts[0].split('_');
  const appPrefix = moduleAndAppPrefix[0];
  const module = moduleAndAppPrefix[1];
  const title = parts[1];

  return { title, module, appPrefix };
};

export const createFeatureFlagPayload: FlagCRUDPayloadFn = (newFlag, flags) => {
  const ftFlagAdded = [...flags, newFlag];

  return ftFlagAdded.map((f) => {
    return {
      display_order: 0,
      name: f.id,
      value: f,
    };
  });
};

export const updateFeatureFlagPayload: FlagCRUDPayloadFn = (editedFlag, flags) => {
  return flags.map((f) => {
    return {
      display_order: 0,
      name: f.id,
      value: f.id !== editedFlag.id ? f : editedFlag,
    };
  });
};

export const deleteFeatureFlagPayload: FlagCRUDPayloadFn = (deletedFlag, flags) => {
  return flags
    .filter((f) => f.id !== deletedFlag.id)
    .map((f) => ({
      display_order: 0,
      name: f.id,
      value: f,
    }));
};

export const flagCrudFnMap: Record<FlagCRUDMethods, FlagCRUDPayloadFn> = {
  create: createFeatureFlagPayload,
  update: updateFeatureFlagPayload,
  delete: deleteFeatureFlagPayload,
};

export const getFtFlagOverviewData = (enumsFlags: EnumValue<FeatureFlag>[] = []) => {
  const featureFlagData = enumsFlags.map((f) => f.value);

  const numFlags = featureFlagData?.length ? featureFlagData?.length : 0;
  const featuresEnabled = featureFlagData ? featureFlagData.filter((f) => f.enabled).length : 0;
  const featuresDisabled = numFlags - featuresEnabled;
  const numModules = getUniqueValuesByKey(featureFlagData, 'module').length;

  return {
    'Total Flags': numFlags,
    'Total Modules': numModules,
    'Features Enabled': featuresEnabled,
    'Features Disabled': featuresDisabled,
  };
};
