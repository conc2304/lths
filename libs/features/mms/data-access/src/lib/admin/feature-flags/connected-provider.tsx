import { ReactNode, useEffect } from 'react';
import { FlagsProvider } from 'react-feature-flags';

import { useLazyGetFeatureFlagsQuery } from './api';

type ConnectedFlagsProviderProps = {
  children?: ReactNode;
};

export const ConnectedFlagsProvider = (props: ConnectedFlagsProviderProps) => {
  const { children } = props;

  const [getFeatureFlags, { data: { enum_values = [] } = { enum_values: [] } }] = useLazyGetFeatureFlagsQuery();
  const featureFlagData = enum_values.map((f) => f.value);

  useEffect(() => {
    getFeatureFlags();
  }, []);

  const formattedFlags = featureFlagData.map((f) => ({ isActive: f.enabled, name: f.id }));

  return <FlagsProvider value={formattedFlags}>{children}</FlagsProvider>;
};
