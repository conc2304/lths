import { findClosestNumber } from './numbers';

describe('findClosestNumber', () => {
  it('should find the closest number in an array', () => {
    const numbers = [10, 20, 30, 40, 50];
    const X = 25;
    const result = findClosestNumber(X, numbers);
    expect(result).toBe(20);
  });

  it('should handle an empty array by throwing an error', () => {
    const numbers: number[] = [];
    const X = 25;
    expect(() => findClosestNumber(X, numbers)).toThrow('The input array must not be empty');
  });

  it('should find the closest higher number when selectHigher is true', () => {
    const numbers = [10, 20, 30, 40, 50];
    const X = 25;
    const result = findClosestNumber(X, numbers, true);
    expect(result).toBe(30);
  });

  it('should return the first occurrence when two numbers are equally close', () => {
    const numbers = [10, 20, 25, 30, 35];
    const X = 27.5;
    const result = findClosestNumber(X, numbers);
    expect(result).toBe(25);
  });

  it('should return the higher occurrence when two numbers are equally close and selectHigher is true', () => {
    const numbers = [10, 20, 25, 30, 35];
    const X = 27.5;
    const result = findClosestNumber(X, numbers, true);
    expect(result).toBe(30);
  });
});
