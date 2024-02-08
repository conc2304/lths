import { FeatureFlagManager } from '@lths/shared/ui-admin';

import { generateMockFlags } from './mockFeatures';

const featureFlagData = generateMockFlags(50);

const FeatureFlagPage = () => {
  // Api Calls

  return <FeatureFlagManager featureFlags={featureFlagData} />;
};

export default FeatureFlagPage;
