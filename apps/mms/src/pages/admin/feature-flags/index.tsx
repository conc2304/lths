import { useEffect } from 'react';

import { useLazyGetFeatureFlagsQuery } from '@lths/features/mms/data-access';
import { FeatureFlagManager, generateMockFlags } from '@lths/shared/ui-admin';
const featureFlagData = generateMockFlags(50);

const FeatureFlagPage = () => {
  const [getFeatureFlags, { data: { data: featureFlagData = [] } = { data: [] } }] = useLazyGetFeatureFlagsQuery();

  const init = async () => {
    getFeatureFlags();
  };

  useEffect(() => {
    init();
  }, []);
  return <FeatureFlagManager featureFlags={featureFlagData} />;
};

export default FeatureFlagPage;
