import createABACContext, { ABACContextProps, ABACProviderProps, AllowedToProps } from './create-context';

export const { AllowedTo, NotAllowedTo, ABACContextDefaults, ABACProvider, ABACContext, useABAC } =
  createABACContext() as unknown as {
    ABACContextDefaults: ABACContextProps<any>;
    ABACContext: ABACContextProps<any>;
    AllowedTo: <Permission extends string>(props: AllowedToProps<Permission>) => JSX.Element;
    NotAllowedTo: <Permission extends string>(props: AllowedToProps<Permission>) => JSX.Element;
    ABACProvider: <Role extends string, Permission extends string, User>(
      props: ABACProviderProps<Role, Permission, User>
    ) => JSX.Element;
    useABAC: <Permission extends string>() => ABACContextProps<Permission>;
  };
