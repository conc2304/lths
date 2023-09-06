const newKey = (key: string) => (key === 'sub_properties' ? 'sub_properties_data' : key);

const transformToObject = (schema: Record<any, any>): Record<any,any> => {
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
  const properties_data = transformToObject(schema);
  if(data.component_id === "cQuickLinkButtonGroup") {
    const quickLinkButton = properties_data.sub_properties_data[0];
    if (quickLinkButton.action.type !== 'native' && quickLinkButton.action.type !== 'webview') quickLinkButton.action.type = '';
    properties_data.sub_properties_data = Array(2).fill(properties_data.sub_properties_data[0]);
  }
  const convertedData = { ...data, properties_data };
  return convertedData;
};
