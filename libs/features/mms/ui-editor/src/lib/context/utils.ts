import { v4 as uuid } from 'uuid';

import { ComponentProps } from './types';
const fillUuid = (component: ComponentProps) => ({ ...component, __ui_id__: uuid() });
const clearExternalIds = (component: ComponentProps) => fillUuid({ ...component, variation_id: '', _id: '' });

export function sort(components: ComponentProps[]): ComponentProps[] {
  if (components.length === 0) return components;
  // Sort the components array in ascending order by display_order
  components.sort((a, b) => {
    if (a.display_order === undefined && b.display_order === undefined) {
      return 0;
    }
    if (a.display_order === undefined) {
      return 1;
    }
    if (b.display_order === undefined) {
      return -1;
    }
    return a.display_order - b.display_order;
  });

  return components;
}

export function populateDisplayOrder(components: ComponentProps[]): ComponentProps[] {
  if (components.length === 0) return components;

  // Map through the sorted components and update display_order
  return components.map((component, index) => {
    return { ...component, display_order: index + 1 };
  });
}

export function sortAndPopulateDisplayOrder(components: ComponentProps[]): ComponentProps[] {
  return populateDisplayOrder(sort(components));
}

export const initComponents = (components: ComponentProps[]) => {
  return sortAndPopulateDisplayOrder(components.map((component) => fillUuid(component)));
};
export const addNewComponent = (components: ComponentProps[], component: ComponentProps) => {
  return populateDisplayOrder([...components, clearExternalIds(component)]);
};
export const renameComponent = (component: ComponentProps, name: string) => {
  return !component ? null : !name || name.trim() === '' ? component : { ...component, name };
};
export const swapComponent = (components: ComponentProps[], dragIndex: number, hoverIndex: number) => {
  const dragged = components[dragIndex];
  const updatedComponents = [...components];
  //preserve the order of the components
  updatedComponents.splice(dragIndex, 1);
  updatedComponents.splice(hoverIndex, 0, dragged);

  return populateDisplayOrder(updatedComponents);
};
export const DUPLICATE_NAME_SUFFIX = ' Duplicate';
export const duplicateComponent = (components: ComponentProps[], uuid: string) => {
  const index = components.findIndex((o) => o.__ui_id__ === uuid);
  if (index !== -1) {
    const duplicate = { ...clearExternalIds(components[index]) };
    duplicate.name = duplicate.name + DUPLICATE_NAME_SUFFIX;
    return populateDisplayOrder([...components.slice(0, index + 1), duplicate, ...components.slice(index + 1)]);
  }
};
