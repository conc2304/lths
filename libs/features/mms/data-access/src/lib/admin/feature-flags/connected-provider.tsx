import { ReactNode, useEffect } from 'react';
import { FlagsProvider } from 'react-feature-flags';
// import { toast } from 'react-hot-toast';

import { toastQueueService } from '@lths/shared/ui-elements';

import { useLazyGetFeatureFlagsQuery } from './api';
import { useAppSelector } from '../../store';

type ConnectedFlagsProviderProps = {
  children?: ReactNode;
};

export const ConnectedFlagsProvider = (props: ConnectedFlagsProviderProps) => {
  const { children } = props;
  const auth = useAppSelector((state) => state.auth);

  const [getFeatureFlags, { data }] = useLazyGetFeatureFlagsQuery();

  if (data === null) {
    toastQueueService.addToastToQueue('Sorry! Looks like someone deleted all the feature flags, whoops!', {
      // adding id makes sure that it doenst respawn multiple times
      id: 'ft-flags-erased',
      type: 'error',
    });
  }
  const enum_values = data ? data.enum_values : [];
  const featureFlagData = enum_values.map((f) => f.value);

  // this gets called on app load, but we dont have authorization to make the call until authenticated, so do it again!
  useEffect(() => {
    getFeatureFlags();
  }, [auth]);

  const formattedFlags = featureFlagData.map((f) => ({ isActive: f.enabled, name: f.id }));

  return <FlagsProvider value={formattedFlags}>{children}</FlagsProvider>;
};
