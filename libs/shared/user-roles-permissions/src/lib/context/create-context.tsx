import { ComponentType, ReactNode, createContext, useContext } from 'react';

import { Rules } from '../types';
import { ensureArray, rolesHavePermissions } from '../utils';

export type ABACProviderProps<Role extends string, Permission extends string, User> = {
  rules: Rules<Role, Permission, User>;
  children?: ReactNode;
  user?: User;
  roles?: Role[];
  permissions?: Permission[];
};

export type ABACContextProps<Permission extends string> = {
  userHasPermissions: <Data>(permissions: Permission | Permission[], data?: Data) => boolean;
};

export type AllowedToProps<Permission extends string> = {
  perform?: Permission | Permission[];
  yes?: ComponentType;
  no?: ComponentType;
  children?: ReactNode;
  data?: any;
};

const createABACContext = <Role extends string, Permission extends string, User>() => {
  const ABACContextDefaults = {
    userHasPermissions: () => {
      console.error(`Can't call userHasPermissions, wrap your app with an <ABACProvider />.`);
      return false;
    },
  };

  const ABACContext = createContext<ABACContextProps<Permission>>(ABACContextDefaults);

  const ABACProvider = ({
    children,
    rules,
    roles = [],
    permissions = [],
    user,
  }: ABACProviderProps<Role, Permission, User>) => {
    const userHasPermissions = (requiredPermissions: Permission[] | Permission, data: any) =>
      rolesHavePermissions(rules, roles, permissions, requiredPermissions, user, data);

    return <ABACContext.Provider value={{ userHasPermissions }}>{children}</ABACContext.Provider>;
  };

  const AllowedTo = ({ perform = [], children, yes: Yes, no: No, data }: AllowedToProps<Permission>) => {
    const ctx = useABAC();

    if (ctx === ABACContextDefaults) {
      console.error(`Can't render <AllowedTo />, wrap your app with an <ABACProvider />.`);
      return null;
    }

    if (ctx.userHasPermissions(ensureArray(perform), data)) {
      return Yes ? <Yes /> : <>{children}</>;
    }

    return No ? <No /> : null;
  };

  const NotAllowedTo = ({ perform = [], children, yes: Yes, no: No, data }: AllowedToProps<Permission>) => {
    const ctx = useABAC();

    if (ctx === ABACContextDefaults) {
      console.error(`Can't render <AllowedTo />, wrap your app with an <ABACProvider />.`);
      return null;
    }

    if (!ctx.userHasPermissions(ensureArray(perform), data)) {
      return Yes ? <Yes /> : <>{children}</>;
    }

    return No ? <No /> : null;
  };

  const useABAC = () => useContext(ABACContext);

  return {
    ABACProvider,
    AllowedTo,
    ABACContext,
    NotAllowedTo,
    ABACContextDefaults,
    useABAC,
  };
};

export default createABACContext;
