import { Component } from '@lths/features/mms/ui-editor';

const newKey = (key: string) => (key === 'sub_properties' ? 'sub_component_data' : key);

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

  if (response.component_id === Component.QuicklinkButtonGroup) {
    const quickLinkButton = data.sub_component_data[0];
    if (quickLinkButton.action.type !== 'native' && quickLinkButton.action.type !== 'web')
      quickLinkButton.action.type = '';
    data.sub_component_data = Array(2).fill(data.sub_component_data[0]);
  }

  const convertedData = { ...response, data };

  return convertedData;
};
