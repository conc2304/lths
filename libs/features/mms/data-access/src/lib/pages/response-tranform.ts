import { Component } from '@lths/features/mms/ui-editor';

const newKey = (key: string) => (key === 'sub_properties' ? 'sub_properties_data' : key);

const transformToObject = (schema: Record<any, any>): Record<any, any> => {
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

export const convertComponentDetailResponse = (response) => {
  const { schema } = response;
  const data = transformToObject(schema);
  if (response.component_id === Component.SocialIconButton && data.sub_properties_data.length > 0) {
    data.sub_properties_data = Array(4).fill(data.sub_properties_data[0]);
  }
  const convertedData = { ...response, data };
  return convertedData;
};
