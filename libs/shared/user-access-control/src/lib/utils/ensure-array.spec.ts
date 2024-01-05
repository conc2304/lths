import { ensureArray } from './ensure-array';

describe('ensureArray', () => {
  it('should wrap a single number in an array', () => {
    expect(ensureArray(1)).toEqual([1]);
  });

  it('should return the same array for an array of numbers', () => {
    expect(ensureArray([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should wrap a string in an array', () => {
    expect(ensureArray('test')).toEqual(['test']);
  });

  it('should return the same array for an array of strings', () => {
    expect(ensureArray(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('should wrap an object in an array', () => {
    const obj = { key: 'value' };
    expect(ensureArray(obj)).toEqual([obj]);
  });

  it('should return an empty array when given an empty array', () => {
    expect(ensureArray([])).toEqual([]);
  });

  it('should wrap null in an array', () => {
    expect(ensureArray(null)).toEqual([null]);
  });

  it('should wrap undefined in an array', () => {
    expect(ensureArray(undefined)).toEqual([undefined]);
  });
});
