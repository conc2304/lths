import { ABACAction, Rule, Rules } from '../types';

export const ensureArray = <T>(v: T | T[]): T[] => (Array.isArray(v) ? v : [v]);

export const roleHasPermission = <Role extends string, Permission extends string, User, Data>(
  rules: Rules<Role, Permission, User>,
  role: Role,
  permission: Permission,
  user?: User,
  data?: Data
) => {
  if (!(role in rules)) {
    // no rules defined for role
    return false;
  }

  // rule for the provided permission for the provided role
  // true, false or (data, user) => boolean
  const rule = (rules[role] as Record<Permission, any>)[permission];

  return evaluateRule(rule, user, data);
};

export const evaluateRule = <User, Data>(rule: Rule<User, Data>, user?: User, data?: Data) => {
  if (!rule) {
    // role is not permitted to perform the provided action/permission,
    // permission not present
    return false;
  }

  if (typeof rule === 'function') {
    // ABAC rule, use a predicate to determine if the user is allowed access
    return Boolean(rule(data, user));
  }

  // rule is truthy, role has permission
  return true;
};

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
              (rules[permission] as ABACAction<User, Data>)(data, user)
            : // permission doesn't need a predicate
              true
          : // permission not included
            false
      )
  );
