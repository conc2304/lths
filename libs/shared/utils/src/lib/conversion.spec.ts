import { humanFileSize } from './conversion';

describe('humanFileSize', () => {
  it('converts bytes to human-readable format', () => {
    expect(humanFileSize(1023, false)).toBe('1023 B');
    expect(humanFileSize(1024, false)).toBe('1.0 KiB');
    expect(humanFileSize(1024 * 1024, false)).toBe('1.0 MiB');
    expect(humanFileSize(1024 * 1024 * 1024, false)).toBe('1.0 GiB');
    expect(humanFileSize(1024 * 1024 * 1024 * 1024, false)).toBe('1.0 TiB');
  });

  it('handles decimal places correctly', () => {
    expect(humanFileSize(1560000, true, 2)).toBe('1.56 MB');
    expect(humanFileSize(9876543210, false, 3)).toBe('9.198 GiB');
  });
});
