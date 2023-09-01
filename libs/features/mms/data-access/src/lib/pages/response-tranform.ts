const transformToObject = (schema: Record<any, any>) => {
  const obj = {};
  for (const key in schema?.properties) {
    const value = schema?.properties[key];
    if (value?.type === 'object') {
      obj[key] = transformToObject(value);
    } else if (value.type === 'array') {
      obj[key] = [transformToObject(value?.items)];
    } else {
      obj[key] = value?.placeholder || '';
    }
  }
  return obj;
};

export const convertComponentDetailResponse = (response) => {
  const { schema } = response;
  const data = transformToObject(schema);
  const convertedData = { ...response, data };
  return convertedData;
};
