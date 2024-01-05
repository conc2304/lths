import { evaluateRule } from './evaluate-rule';

describe('evaluateRule', () => {
  it('should return true for a true rule', () => {
    expect(evaluateRule(true)).toBe(true);
  });

  it('should return false for a false rule', () => {
    expect(evaluateRule(false)).toBe(false);
  });

  it('should return false for no rule', () => {
    //
    expect(evaluateRule(undefined)).toBe(false);
  });

  it('should execute AccessCheckFunction rule and return its result', () => {
    const accessCheckFunction = jest.fn().mockReturnValue(true);
    const user = { name: 'John' };
    const data = { item: 'item1' };

    expect(evaluateRule(accessCheckFunction, user, data)).toBe(true);
    expect(accessCheckFunction).toHaveBeenCalledWith(data, user);
  });

  it('should return false if AccessCheckFunction rule returns undefined', () => {
    const accessCheckFunction = jest.fn().mockReturnValue(undefined);
    expect(evaluateRule(accessCheckFunction)).toBe(false);
  });
});
