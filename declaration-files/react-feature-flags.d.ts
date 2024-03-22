declare module 'react-feature-flags' {
  import * as React from 'react';

  const Flags: React.ComponentClass<{
    authorizedFlags: string[];
    exactFlags?: boolean;
    renderOn?: (matchingFlags: any[]) => React.ReactNode;
    renderOff?: (matchingFlags: any[]) => React.ReactNode;
    children?: React.ReactNode;
  }>;

  // Flags Provider Expects this type, there is no dec file so we are explicitly making one
  type Flag = {
    isActive: boolean;
    name: string;
  };

  const FlagsProvider: React.ComponentClass<{ value: Flag[]; children?: React.ReactNode }>;

  export { Flags, FlagsProvider, Flag };
}
