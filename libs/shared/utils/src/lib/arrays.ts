// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filter = (array: any[], props: string[], search: string): any[] => {
  if (!props || props.length === 0 || !search || search.length === 0 || !array || array.length === 0) return array;
  return array?.filter((item) => props.some((prop) => item[prop]?.toLowerCase().includes(search.toLowerCase())));
};

export const filterObjectsBySearch = (objects: Record<string, unknown>[], searchWord: string) => {
  // Use the filter method to iterate through the objects array
  if (!searchWord || searchWord === '') return objects;

  return objects.filter((obj) => {
    // Use Object.keys to get an array of keys from the object
    const keys = Object.keys(obj);

    // Use some() to check if the searchWord is found in any value of the object's key properties
    return keys.some((key) => {
      const value = obj[key];

      // Check if the value contains the searchWord (case-insensitive)
      return typeof value === 'string' && value.toLowerCase().includes(searchWord.toLowerCase());
    });
  });
};

export const getUniqueValuesByKey = <T, K extends keyof T>(objects: T[], key: K): Exclude<T[K], boolean>[] => {
  const uniqueValues = new Set<Exclude<T[K], boolean>>();

  for (const obj of objects) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      // Check if the value is not a boolean before adding it to uniqueValues
      if (typeof value !== 'boolean') {
        uniqueValues.add(value as Exclude<T[K], boolean>);
      }
    }
  }

  return Array.from(uniqueValues);
};
