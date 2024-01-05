import { ensureArray } from './ensure-array';
import { roleHasPermission } from './role-has-permission';
import { AccessCheckFunction, Rules } from '../types';

export const rolesHavePermissions = <Role extends string, Permission extends string, User, Data>(
  rules: Rules<Role, Permission, User>,
  roles: Role[],
  permissions: Permission[],
  requiredPermissions: Permission[] | Permission,
  user?: User,
  data?: Data
) =>
  // for *every* required permission
  ensureArray(requiredPermissions).every(
    (permission) =>
      // check that *some* role has that permission
      roles.some((role) => roleHasPermission(rules, role, permission, user, data)) ||
      // or this specific permission is granted
      Boolean(
        permissions.includes(permission)
          ? typeof rules[permission] === 'function'
            ? // is abac permission
              (rules[permission] as AccessCheckFunction<User, Data>)(data, user)
            : // permission doesn't need an action
              true
          : // permission not included
            false
      )
  );
