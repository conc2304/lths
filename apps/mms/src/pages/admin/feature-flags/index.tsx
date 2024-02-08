import { useEffect } from 'react';

import { FeatureFlagManager, generateMockFlags } from '@lths/shared/ui-admin';

const featureFlagData = generateMockFlags(50);

const FeatureFlagPage = () => {
  const init = async () => {
    console.log('init');
  };

  useEffect(() => {
    init();
  }, []);
  return <FeatureFlagManager featureFlags={featureFlagData} />;
};

export default FeatureFlagPage;
