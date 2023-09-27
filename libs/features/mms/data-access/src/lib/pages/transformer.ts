import { Component } from '@lths/features/mms/ui-editor';
import { convertISOStringToDateTimeFormat } from '@lths/shared/utils';

import { ComponentDetailResponse, PageItemsResponse } from './types';
import { formatConstraintsToReadable } from './utils';

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

export const transformComponentDetailResponse = (response: ComponentDetailResponse) => {
  const payload = response.data;
  const { schema } = payload;

  const data = transformToObject(schema);
  if (payload.component_id === Component.SocialIconButton && data.sub_component_data.length > 0) {
    data.sub_component_data = Array(4).fill(data.sub_component_data[0]);
  }

  if (payload.component_id === Component.QuicklinkButtonGroup) {
    const quickLinkButton = data.sub_component_data[0];
    if (quickLinkButton.action.type !== 'native' && quickLinkButton.action.type !== 'web')
      quickLinkButton.action.type = '';
    data.sub_component_data = Array(2).fill(data.sub_component_data[0]);
  }

  const transformedData = { ...payload, data };
  return {
    ...response,
    data: transformedData,
  };
};

export const transformPageListResponse = (response: PageItemsResponse) => {
  const payload = response.data;
  const transformedPayload = payload.map((item) => {
    const { updated_on, constraints } = item;
    const updated_on_formatted = updated_on ? convertISOStringToDateTimeFormat(updated_on) : null;
    const constraints_formatted = formatConstraintsToReadable(constraints);
    return {
      ...item,
      updated_on: updated_on_formatted,
      constraints_formatted,
    };
  });
  return {
    ...response,
    data: transformedPayload,
  };
};
