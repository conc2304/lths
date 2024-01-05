export const ensureArray = <T>(v: T | T[]): T[] => (Array.isArray(v) ? v : [v]);
