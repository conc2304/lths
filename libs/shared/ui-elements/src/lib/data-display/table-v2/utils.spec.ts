import { getComparator, descendingComparator } from './utils';

describe('Sorting Helper Functions', () => {
  it('getComparator returns a valid comparator function', () => {
    const ascComparator = getComparator('asc');
    const descComparator = getComparator('desc');

    expect(ascComparator('a', 'b')).toBe(-1);
    expect(ascComparator('b', 'a')).toBe(1);
    expect(Math.abs(ascComparator('a', 'a'))).toBe(0);

    expect(descComparator('a', 'b')).toBe(1);
    expect(descComparator('b', 'a')).toBe(-1);
    expect(Math.abs(descComparator('a', 'a'))).toBe(0);
  });

  it('descendingComparator works correctly', () => {
    expect(descendingComparator(1, 2)).toBe(1);
    expect(descendingComparator(2, 1)).toBe(-1);
    expect(Math.abs(descendingComparator(1, 1))).toBe(0);

    expect(descendingComparator('abc', 'def')).toBe(1);
    expect(descendingComparator('def', 'abc')).toBe(-1);
    expect(Math.abs(descendingComparator('abc', 'abc'))).toBe(0);

    const dateA = new Date('2022-01-01');
    const dateB = new Date('2022-02-01');
    const dateC = new Date('2022-01-01');
    expect(descendingComparator(dateA, dateB)).toBe(1);
    expect(descendingComparator(dateB, dateA)).toBe(-1);
    expect(Math.abs(descendingComparator(dateA, dateC))).toBe(0);
  });
});
