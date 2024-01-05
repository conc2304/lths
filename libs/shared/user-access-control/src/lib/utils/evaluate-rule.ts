import { Rule } from '../types';

export const evaluateRule = <User, Data>(rule: Rule<User, Data> | undefined, user?: User, data?: Data) => {
  if (!rule) {
    // role is not permitted to perform the provided action/permission,
    // permission not present
    return false;
  }

  if (typeof rule === 'function') {
    // ABAC rule, use a access check to determine if the user is allowed access
    return Boolean(rule(data, user));
  }

  // rule is truthy, role has permission
  return true;
};
