import { FeatureFlagManager, generateMockFlags } from '@lths/shared/ui-admin';

const featureFlagData = generateMockFlags(50);

const FeatureFlagPage = () => {
  // Api Calls

  return <FeatureFlagManager featureFlags={featureFlagData} />;
};

export default FeatureFlagPage;
