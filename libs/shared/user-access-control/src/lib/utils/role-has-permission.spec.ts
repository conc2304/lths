import * as evaluateRuleModule from './evaluate-rule';
import { roleHasPermission } from './role-has-permission';

describe('roleHasPermission', () => {
  it('returns false if no rules are defined for the role', () => {
    const rules = {};
    expect(roleHasPermission(rules, 'admin', 'read')).toBe(false);
  });

  it('returns true if the role has the permission set to true', () => {
    const rules = { admin: { read: true } };
    expect(roleHasPermission(rules, 'admin', 'read')).toBe(true);
  });

  it('returns false if the role has the permission set to false', () => {
    const rules = { admin: { read: false } };
    expect(roleHasPermission(rules, 'admin', 'read')).toBe(false);
  });

  it('calls evaluateRule for AccessCheckFunction rules', () => {
    // Spy on evaluateRule and mock its implementation for this test only
    const mockEvaluateRule = jest.spyOn(evaluateRuleModule, 'evaluateRule');
    mockEvaluateRule.mockImplementation(() => true);

    const mockAccessCheckFunction = jest.fn();
    const rules = { admin: { read: mockAccessCheckFunction } };
    const user = { name: 'John' };
    const data = { document: 'Doc1' };

    expect(roleHasPermission(rules, 'admin', 'read', user, data)).toBe(true);

    // Check if evaluateRule was called
    expect(mockEvaluateRule).toHaveBeenCalledWith(mockAccessCheckFunction, user, data);

    // Restore the original implementation of evaluateRule after the test
    mockEvaluateRule.mockRestore();
  });

  it('returns false if the role does not have the specified permission', () => {
    const rules = { admin: { read: undefined, write: true } };
    expect(roleHasPermission(rules, 'admin', 'read')).toBe(false);
  });
});
