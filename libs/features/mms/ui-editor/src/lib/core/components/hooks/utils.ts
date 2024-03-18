import { ComponentProps } from '../../../context';

export const rootKey = 'data';

export function getValue(data: object, name: string, value: number | string | boolean | object | undefined | null) {
  if (!data) return value;
  return typeof value === 'object' ? { ...(data[name] || {}), ...value } : value;
}

function setNestedPropValue(obj: Record<string, any>, path: string[], value: any) {
  if (!path || path.length === 0) return obj;
  const updatedObj = { ...obj };

  let currentLevel = updatedObj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    currentLevel[key] = { ...currentLevel[key] };
    currentLevel = currentLevel[key];
  }

  const lastKey = path[path.length - 1];
  //[key] = > if [key] is {} object and we may want to preserve other properties in the object
  const extractedValue = getValue(currentLevel[lastKey], lastKey, value);
  currentLevel[lastKey] =
    typeof currentLevel[lastKey] === 'object' && typeof extractedValue === 'object'
      ? { ...currentLevel[lastKey], ...extractedValue }
      : extractedValue;

  return updatedObj;
}
export const mergeChildKeys = (keys: string[], currKey: string) => {
  return keys ? [...keys, currKey] : [currKey];
};
export const mergeParentKeys = (keys: string[]) => {
  return keys ? [rootKey, ...keys] : [rootKey];
};

/**
 * Update a nested property in an object using an array of keys with optional array index support.
 *
 * @param {string[]} propName - An array of keys representing the path to the nested property.
 * @param {string|object} value - The new value to assign to the property.
 * @param {number|array} index - Index for array properties, must be the last property in keyPath.
 * @param {string[]} keys - An array of parent keys representing the nested path. Parent comes before child and grandchild.
 * @returns {object} - The updated object with the modified property.
 *
 *
 *
 * @example
 * const data = {
 *   data: {
 *     title: 'Test Title',
 *     text_size: '2',
 *     colors: ['red'],
 *     link_text: [
 *       { link_key: '1', action: { page_id: 'welcome', type: 'a', page_link: 'test' } },
 *       { link_key: '2', action: { page_id: 'home', page_link: 'parking' } },
 *     ],
 *   },
 * };
 *
 * const updatedData1 = updateRecursive('link_key', 'data.link_text', 'abc', data, 1);
 * console.log(updatedData1.data.link_text[1].link_key === 'abc'); // Output: true
 *
 * const updatedData2 = updateRecursive('action', 'data.link_text', { type: 'web' }, data, 1);
 * console.log(updatedData2.data.link_text[1].action.type === 'web'); // Output: true
 *
 * const updatedData3 = updateRecursive('title', 'data', 'Test Title++', data);
 * console.log(updatedData3.data.title === 'Test Title++'); // Output: true
 *
 * const updatedData4 = updateRecursive('colors', 'data', 'green', data);
 * console.log(updatedData4.data.colors === 'green'); // Output: true
 *
 * const updatedData5 = updateRecursive('red', 'data.colors', 'yes', data, 0);
 * console.log(updatedData5.data.colors[0].red === 'yes'); // Output: true
 */

export function updateNestedProp(
  data: ComponentProps,
  propName: string[] | string,
  value: number | string | boolean | object | undefined | null,
  index: number,
  keys: string[] = []
) {
  const updatedObject = { ...data };
  const paths = typeof propName === 'string' ? [propName] : propName;

  function updateRecursive(obj: any, keyIndex: number) {
    const key = keys[keyIndex];
    if (!obj[key]) {
      obj[key] = keyIndex === keys.length - 1 && index >= 0 ? [] : {};
    }

    if (keyIndex === keys.length - 1) {
      obj[key] =
        index === undefined
          ? {
              ...obj[key],
              ...setNestedPropValue(obj[key], paths, value),
            }
          : obj[key].map((item: any, i: number) => {
              return i === index
                ? {
                    ...item,
                    [paths[0]]:
                      paths.length === 1
                        ? getValue(item, paths[0], value)
                        : setNestedPropValue(
                            item[paths[0]],
                            paths.filter((o, ind) => ind > 0),
                            value
                          ),
                  }
                : item;
            });
    } else {
      obj[key] = updateRecursive({ ...obj[key] }, keyIndex + 1);
    }

    return obj;
  }

  return updateRecursive(updatedObject, 0);
}

/**
 * Swap array items of a nested array property in an object using an array of keys.
 *
 * @param {ComponentProps} data - The object to modify.
 * @param {number|array} index1 -  Index of item to replace array item at index2.
 * @param {number|array} index2 - Index of item to replace array item at index1.
 * @param {string[]} keys - An array of keys representing the nested path. Parent keys are before their child key.
 * @returns {object} - The updated object with the modified property.
 * 
 */

export function swapArrayItems(
  data: ComponentProps,
  index1: number,
  index2: number,
  keys: string[] = []
) {
  const updatedObject = { ...data };

  function updateRecursive(obj: any, keyIndex: number) {
    const key = keys[keyIndex];
    if (!obj[key]) {
      return obj; // Swap can not be made return before creating new key path.
    }

    if (keyIndex === keys.length - 1) {
      if(Array.isArray(obj[key]) && (0 <= index1 && index1 < obj[key].length) && (0 <= index2 && index2 < obj[key].length)) {
        const updatedArray = [...obj[key]];
        const value1 = updatedArray[index1];
        updatedArray[index1] = updatedArray[index2];
        updatedArray[index2] = value1;
        
        obj[key] = updatedArray
      }
    } else {
      obj[key] = updateRecursive({ ...obj[key] }, keyIndex + 1);
    }

    return obj;
  }

  return updateRecursive(updatedObject, 0);
}
