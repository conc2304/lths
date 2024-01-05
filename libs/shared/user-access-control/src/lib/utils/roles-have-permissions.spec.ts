import { rolesHavePermissions } from './roles-have-permissions';

describe('rolesHavePermissions', () => {
  it('returns true when roles have all required permissions', () => {
    const rules = { admin: { read: true } };
    expect(rolesHavePermissions(rules, ['admin'], [], 'read')).toBe(true);
  });

  it('returns false when roles lack some required permissions', () => {
    const rules = { admin: { write: true } };
    expect(rolesHavePermissions(rules, ['admin'], [], ['read', 'write'])).toBe(false);
  });

  it('returns true when global permissions cover the required permissions', () => {
    const rules = { read: true };
    expect(rolesHavePermissions(rules, ['admin'], ['read'], 'read')).toBe(true);
  });

  it('returns false when neither roles nor global permissions cover the required permissions', () => {
    const rules = { write: true };
    expect(rolesHavePermissions(rules, ['admin'], ['write'], 'read')).toBe(false);
  });

  it('returns true when ABAC function-based permission grants access', () => {
    const abacPermission = jest.fn().mockReturnValue(true);
    const rules = { read: abacPermission };
    expect(rolesHavePermissions(rules, ['admin'], ['read'], 'read')).toBe(true);
    expect(abacPermission).toHaveBeenCalledWith(undefined, undefined);
  });

  it('handles requiredPermissions as both a single string and an array', () => {
    const rules = { read: true };
    expect(rolesHavePermissions(rules, ['admin'], ['read'], 'read')).toBe(true);
    expect(rolesHavePermissions(rules, ['admin'], ['read'], ['read'])).toBe(true);
  });

  it('returns false when no permissions are provided and the role does not have the required permission', () => {
    const rules = { admin: { write: true, read: undefined } }; // 'admin' does not have 'read' permission
    expect(rolesHavePermissions(rules, ['admin'], [], 'read')).toBe(false);
  });

  it('returns false when no permissions are provided', () => {
    const rules = {};
    expect(rolesHavePermissions(rules, ['admin'], [], 'read')).toBe(false);
  });

  it('returns true when multiple roles collectively have all required permissions', () => {
    const rules = {
      admin: { write: true },
      editor: { read: true },
    };

    expect(rolesHavePermissions(rules, ['admin', 'editor'], [], ['read', 'write'])).toBe(true);
  });
});
