import { capitalizeString, hashString } from './string';

describe('string.ts', () => {
  describe('hashString', () => {
    it('should repeatedly hash a string correctly', () => {
      const input = 'hello world';
      const expectedHash = 1794106052; // Replace with the expected hash value for 'hello world'

      // it sure always return the same value for the hash map
      expect(hashString(input)).toEqual(expectedHash);
      expect(hashString(input)).toEqual(expectedHash);
      expect(hashString(input)).toEqual(expectedHash);
      expect(hashString(input)).toEqual(expectedHash);
    });

    it('should handle an empty string', () => {
      const input = '';
      const expectedHash = 0; // The hash of an empty string is typically 0

      const result = hashString(input);

      expect(result).toEqual(expectedHash);
    });
  });

  describe('capitalizeString function', () => {
    it('should capitalize the first letter of each word in a string separated by spaces', () => {
      expect(capitalizeString('hello world')).toBe('Hello World');
    });

    it('should handle empty string', () => {
      expect(capitalizeString('')).toBe('');
    });

    it('should handle string with one word', () => {
      expect(capitalizeString('javascript')).toBe('Javascript');
    });

    it('should handle string with custom splitter and joiner', () => {
      expect(capitalizeString('hello_world_test', '_', '-')).toBe('Hello-World-Test');
    });

    it('should handle string with multiple spaces and custom joiner', () => {
      expect(capitalizeString('   hello   world   ', ' ', '-')).toBe('Hello-World');
    });

    it('should handle string with leading and trailing spaces', () => {
      expect(capitalizeString('   hello   world   ')).toBe('Hello World');
    });
  });
});
