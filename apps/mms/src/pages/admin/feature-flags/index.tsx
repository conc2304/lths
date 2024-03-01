import { featureFlagsApi, useUpdateFeatureFlagsMutation } from '@lths/features/mms/data-access';
import { FeatureFlag, FeatureFlagManager, FlagCRUDMethods, flagCrudFnMap } from '@lths/shared/ui-admin';

const FeatureFlagPage = () => {
  const [updateFeatureFlags] = useUpdateFeatureFlagsMutation();

  const flagsCache = featureFlagsApi.endpoints.getFeatureFlags.useQueryState();
  const { data } = flagsCache;
  const enum_values = data ? data.enum_values : [];
  const _id = data ? data._id : 'N/A';
  const featureFlagData = enum_values.map((f) => f.value);

  const handleOnUpdateFlags = (updatedFlag: FeatureFlag, mode: FlagCRUDMethods) => {
    if (!mode) return;

    const payload = flagCrudFnMap[mode](updatedFlag, featureFlagData);
    if (!payload || !_id) return;

    updateFeatureFlags({ id: _id, body: { enum_values: payload } });
  };

  return <FeatureFlagManager featureFlags={featureFlagData || []} onUpdateFlags={handleOnUpdateFlags} />;
};

export default FeatureFlagPage;
