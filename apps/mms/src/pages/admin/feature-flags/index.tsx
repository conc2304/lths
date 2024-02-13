import { featureFlagsApi, useUpdateFeatureFlagsMutation } from '@lths/features/mms/data-access';
import { FeatureFlag, FeatureFlagManager } from '@lths/shared/ui-admin';

const FeatureFlagPage = () => {
  const [updateFeatureFlags] = useUpdateFeatureFlagsMutation();

  const flagsCache = featureFlagsApi.endpoints.getFeatureFlags.useQueryState();
  const featureFlagData = flagsCache?.data?.data?.enum_values || [];

  const handleOnUpdateFlags = (updatedFlag: FeatureFlag) => {
    // check if the feature flag is there and update that flag and then send all of the flags
    const flagIndex = featureFlagData.findIndex((flag) => flag.id === updatedFlag.id);
    const isNewFtFlag = flagIndex === -1;

    // if new flag just add to the full payload we are sending,
    // otherwise replace the flag in place with the updated flag
    const featFlags: FeatureFlag[] = isNewFtFlag
      ? [updatedFlag, ...featureFlagData]
      : featureFlagData.map((flag) => {
          return updatedFlag.id === flag.id ? updatedFlag : flag;
        });
    updateFeatureFlags(featFlags);
  };

  return <FeatureFlagManager featureFlags={featureFlagData || []} onUpdateFlags={handleOnUpdateFlags} />;
};

export default FeatureFlagPage;
