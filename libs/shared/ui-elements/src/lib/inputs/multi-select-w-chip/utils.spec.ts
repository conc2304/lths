import { SelectOptionProp, SelectOptionInternal } from './types';
import { normalizeOption } from './utils';

describe('normalizeOption function', () => {
  it('should normalize array option correctly', () => {
    const option: SelectOptionProp = [1, 'Option 1'];
    const normalizedOption: SelectOptionInternal = normalizeOption(option);
    expect(normalizedOption).toEqual([1, 'Option 1']);
  });

  it('should normalize object option correctly', () => {
    const option: SelectOptionProp = { id: '2', value: 'Option 2' };
    const normalizedOption: SelectOptionInternal = normalizeOption(option);
    expect(normalizedOption).toEqual(['2', 'Option 2']);
  });

  it('should throw error for invalid option format', () => {
    const invalidOption = { id: '3' } as SelectOptionProp; // force typing even throught its wrong
    expect(() => normalizeOption(invalidOption)).toThrowError('Invalid Option');
  });

  it('should throw error for invalid option type', () => {
    const invalidOption: any = 123; // Invalid option type
    expect(() => normalizeOption(invalidOption)).toThrowError('Invalid Option');
  });
});
