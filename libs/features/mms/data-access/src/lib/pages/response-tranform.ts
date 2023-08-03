const newKey = (key: string) => (key === 'sub_properties' ? 'component_data' : key);

const transformToObject = (schema: Record<any, any>) => {
  const obj = {};
  for (const key in schema?.properties) {
    const value = schema?.properties[key];
    if (value?.type === 'object') {
      obj[newKey(key)] = transformToObject(value);
    } else if (value.type === 'array') {
      obj[newKey(key)] = [transformToObject(value?.items)];
    } else {
      obj[key] = value?.placeholder || '';
    }
  }
  return obj;
};

export const convertComponentDetailResponse = (data) => {
  const { schema } = data;
  const default_data = transformToObject(schema);
  const convertedData = { ...data, default_data };
  return convertedData;
};
