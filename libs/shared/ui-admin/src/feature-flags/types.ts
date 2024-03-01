export type FeatureFlag = {
  description: string;
  enabled: boolean;
  title: string;
  module: string;
  id: string;
};

export type FlagCRUDMethods = 'create' | 'update' | 'delete';

export type FlagCRUDPayloadFn = (flag: FeatureFlag, flags: FeatureFlag[]) => EnumValue<FeatureFlag>[];

// ! duplicate of what is in data access to avoid circular dep probs
export type EnumValue<TData = string> = {
  display_order: number;
  name: string;
  value: TData;
};
