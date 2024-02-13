import { FeatureFlag } from '@lths/shared/ui-admin';

declare module 'react-feature-flags' {
  import * as React from 'react';

  const Flags: React.ComponentClass<{
    authorizedFlags: string[];
    exactFlags?: boolean;
    renderOn?: (matchingFlags: any[]) => React.ReactNode;
    renderOff?: (matchingFlags: any[]) => React.ReactNode;
    children?: React.ReactNode;
  }>;

  type Flag = FeatureFlag;

  const FlagsProvider: React.ComponentClass<{ value: Flag[]; children?: React.ReactNode }>;

  export { Flags, FlagsProvider, Flag };
}
