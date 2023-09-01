import { ComponentProps } from '../../../context';

export const rootKey = 'default_data';

export function getValue(data: object, name: string, value: number | string | object | undefined | null) {
  return typeof value === 'object' ? { ...(data[name] || {}), ...value } : value;
}

export const mergeKeys = (keys: string[]) => {
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
 *   default_data: {
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
 * const updatedData1 = updateRecursive('link_key', 'default_data.link_text', 'abc', data, 1);
 * console.log(updatedData1.default_data.link_text[1].link_key === 'abc'); // Output: true
 *
 * const updatedData2 = updateRecursive('action', 'default_data.link_text', { type: 'webview' }, data, 1);
 * console.log(updatedData2.default_data.link_text[1].action.type === 'webview'); // Output: true
 *
 * const updatedData3 = updateRecursive('title', 'default_data', 'Test Title++', data);
 * console.log(updatedData3.default_data.title === 'Test Title++'); // Output: true
 *
 * const updatedData4 = updateRecursive('colors', 'default_data', 'green', data);
 * console.log(updatedData4.default_data.colors === 'green'); // Output: true
 *
 * const updatedData5 = updateRecursive('red', 'default_data.colors', 'yes', data, 0);
 * console.log(updatedData5.default_data.colors[0].red === 'yes'); // Output: true
 */

export function updateNestedProp(
  data: ComponentProps,
  propName: string,
  value: number | string | object | undefined | null,
  index: number,
  keys: string[]
) {
  const updatedObject = { ...data };

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
              [propName]: getValue(obj[key], propName, value),
            }
          : obj[key].map((item: any, i: number) =>
              i === index
                ? {
                    ...item,
                    [propName]: getValue(item, propName, value),
                  }
                : item
            );
    } else {
      obj[key] = updateRecursive({ ...obj[key] }, keyIndex + 1);
    }

    return obj;
  }

  return updateRecursive(updatedObject, 0);
}
