export type FeatureFlag = {
  description: string;
  enabled: boolean;
  title: string;
  module: string;
  id: string;
};

export type FlagCRUDMethods = 'create' | 'update' | 'delete';

export type FlagCRUDPayloadFn = (flag: FeatureFlag, flags: FeatureFlag[]) => EnumValue<FeatureFlag>[];

type EnumValue<TData = string> = {
  display_order: number;
  name: string;
  value: TData;
};
