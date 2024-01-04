import { v4 as uuid } from 'uuid';

import { Component } from '@lths/features/mms/ui-editor';
import { convertISOStringToDateTimeFormat } from '@lths/shared/utils';

import { ComponentDetailResponse, PageItemsResponse, UpdatePageDetailRequest } from './types';
import { formatConstraintsToReadable } from './utils';

const newKey = (key: string) => (key === 'sub_properties' ? 'sub_component_data' : key);

const transformToObject = (schema: Record<any, any>): Record<any, any> => {
  const obj = {};
  for (const key in schema?.properties) {
    const value = schema?.properties[key];
    if (value?.type === 'object') {
      obj[newKey(key)] = transformToObject(value);
    } else if (value.type === 'array') {
      obj[newKey(key)] = [];
      if (value?.items?.properties && Object.keys(value?.items?.properties).length > 0)
        obj[newKey(key)].push(transformToObject(value?.items));
    } else {
      obj[key] = value?.placeholder || '';
    }
  }
  return obj;
};

export const transformComponentDetailResponse = (response: ComponentDetailResponse) => {
  const payload = response.data;
  const { schema, constraints } = payload;

  const data = transformToObject(schema);
  if (payload.component_id === Component.SocialIconButton && data.sub_component_data.length > 0) {
    data.sub_component_data = Array(4).fill(data.sub_component_data[0]);
  } else if (data.sub_component_data && data.sub_component_data.length > 0) {
    if (payload.component_id === Component.QuicklinkButtonGroup) {
      const quickLinkButton = data.sub_component_data[0];
      if (quickLinkButton.action.type !== 'native' && quickLinkButton.action.type !== 'web')
        quickLinkButton.action.type = '';
      data.sub_component_data = Array(2).fill(data.sub_component_data[0]);
    } else if (payload.component_id === Component.SegmentGroup) {
      data.sub_component_data = [...Array(3)].map(() => ({ ...data.sub_component_data[0], segment_id: uuid() }));
    }
  }

  payload.constraints = constraints || [];

  const transformedData = { ...payload, data };
  return {
    ...response,
    data: transformedData,
  };
};

export const transformPageListResponse = (response: PageItemsResponse) => {
  const payload = response.data;
  const transformedPayload = Array.isArray(payload)
    ? payload.map((item) => {
        const { updated_on, constraints } = item;
        const updated_on_formatted = updated_on ? convertISOStringToDateTimeFormat(updated_on) : null;
        const constraints_formatted = formatConstraintsToReadable(constraints);
        return {
          ...item,
          updated_on: updated_on_formatted,
          constraints_formatted,
        };
      })
    : [];
  return {
    ...response,
    data: transformedPayload,
  };
};

export const transformUpdatePageDetailRequest = (request: UpdatePageDetailRequest) => {
  const { components, selectedComponent, hasUnsavedEdits, ...payload } = request;
  const transformedComponents = components.map((component) => {
    const {
      schema,
      __ui_id__,
      data: { editor_meta_data, ...componentData } = {},
      errors,
      ...restOfComponent
    } = component;
    if (componentData && componentData.sub_component_data && Array.isArray(componentData.sub_component_data)) {
      componentData.sub_component_data = componentData.sub_component_data.map((sub_component) => {
        const {
          schema,
          __ui_id__,
          data: { editor_meta_data, ...subComponentData },
          errors,
          ...restOfSubComponent
        } = sub_component;
        if (
          restOfComponent.component_id === Component.HeroCarousel &&
          restOfSubComponent.component_id === Component.HeroGameBox
        ) {
          delete subComponentData.title;
          delete subComponentData.show_greetings;
        }

        return { ...restOfSubComponent, data: subComponentData };
      });
    }
    return { ...restOfComponent, data: componentData };
  });
  return { ...payload, components: transformedComponents };
};
