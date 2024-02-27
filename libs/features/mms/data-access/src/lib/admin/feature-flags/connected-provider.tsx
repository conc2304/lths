import { ReactNode, useEffect } from 'react';
import { FlagsProvider } from 'react-feature-flags';
import { toast } from 'react-hot-toast';

import { useLazyGetFeatureFlagsQuery } from './api';

type ConnectedFlagsProviderProps = {
  children?: ReactNode;
};

export const ConnectedFlagsProvider = (props: ConnectedFlagsProviderProps) => {
  const { children } = props;

  const [getFeatureFlags, { data }] = useLazyGetFeatureFlagsQuery();

  if (data === null) {
    console.log('no data');
    toast.error('Sorry! Looks like someone deleted all the feature flags, whoops!', { id: 'ft-flags-erased' });
  }
  const enum_values = data ? data.enum_values : [];
  const featureFlagData = enum_values.map((f) => f.value);

  useEffect(() => {
    getFeatureFlags();
  }, []);

  const formattedFlags = featureFlagData.map((f) => ({ isActive: f.enabled, name: f.id }));

  return <FlagsProvider value={formattedFlags}>{children}</FlagsProvider>;
};
