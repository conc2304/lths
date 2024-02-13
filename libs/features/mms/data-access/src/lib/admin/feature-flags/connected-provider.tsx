import { ReactNode, useEffect } from 'react';
import { FlagsProvider } from 'react-feature-flags';

import { useLazyGetFeatureFlagsQuery } from './api';

type ConnectedFlagsProviderProps = {
  children?: ReactNode;
};

export const ConnectedFlagsProvider = (props: ConnectedFlagsProviderProps) => {
  const { children } = props;

  const [getFeatureFlags, { data: featureFlagData = [] }] = useLazyGetFeatureFlagsQuery();

  useEffect(() => {
    getFeatureFlags();
  }, []);

  console.log({ featureFlagData });

  const formattedFlags = featureFlagData.slice().map((f) => ({ isActive: f.enabled, name: f.id }));

  return <FlagsProvider value={formattedFlags}>{children}</FlagsProvider>;
};
