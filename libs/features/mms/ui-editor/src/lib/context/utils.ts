import { v4 as uuid } from 'uuid';

import { ComponentProps } from './types';
const fillUuid = (component: ComponentProps) => ({ ...component, __ui_id__: uuid() });
export const clearExternalIds = (component: ComponentProps) => fillUuid({ ...component, variation_id: '', _id: '' });

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

export const initComponents = (components: ComponentProps[] = []) => {
  return sortAndPopulateDisplayOrder(components.map((component) => fillUuid(component)));
};
export const addNewComponent = (components: ComponentProps[], component: ComponentProps, index?: number) => {
  if (index !== undefined && index >= 0 && index <= components.length) {
    const updatedComponents = [...components];
    updatedComponents.splice(index + 1, 0, clearExternalIds(component));
    return populateDisplayOrder(updatedComponents);
  } else {
    return populateDisplayOrder([...components, clearExternalIds(component)]);
  }
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

const splitStringWithLastNumber = (value: string): { name: string; seq: number } => {
  // Use a regular expression to split the string into parts, eg 'Item 1' or 'Item22' or 'Item'
  const parts = value.match(/^(.*?)(\d+)?$/);
  let name: string,
    seq = 0;
  if (!parts) {
    name = value?.trim();
  }
  //first part is index
  else {
    name = parts[1].trim();
    if (parts[2]) seq = parseInt(parts[2]);
  }
  return { name, seq };
};
const getNextDuplicateName = (components: ComponentProps[], dup: ComponentProps): string => {
  const map: Map<string, number> = new Map();

  const { name: dupName } = splitStringWithLastNumber(dup.name);

  components.forEach((item) => {
    if (item.component_id === dup.component_id) {
      const { name, seq } = splitStringWithLastNumber(item.name);

      if (name.toLowerCase() === dupName.toLowerCase()) {
        map.set(item.component_id, Math.max(map.get(item.component_id) || 0, seq));
      }
    }
  });
  const count = map.get(dup.component_id) || 0;
  const newName = `${dupName} ${count + 1}`;

  return newName;
};

export const duplicateComponent = (components: ComponentProps[], uuid: string) => {
  const index = components.findIndex((o) => o.__ui_id__ === uuid);
  if (index !== -1) {
    const duplicate = { ...clearExternalIds(components[index]) };
    duplicate.name = getNextDuplicateName(components, duplicate);
    return {
      components: populateDisplayOrder([...components.slice(0, index + 1), duplicate, ...components.slice(index + 1)]),
      selectedComponent: duplicate,
    };
  }
};

export const pasteComponent = (
  components: ComponentProps[],
  selectedComponent: ComponentProps,
  component: ComponentProps
) => {
  const isDuplicate = components.find((c) => c.component_id === component.component_id && c.name === component.name);
  const pastedComponent = { ...clearExternalIds(component) };
  if (isDuplicate) {
    pastedComponent.name = getNextDuplicateName(components, pastedComponent);
  }
  const selectedComponentIndex = selectedComponent
    ? components.findIndex((c) => c.__ui_id__ === selectedComponent.__ui_id__)
    : -1;

  return {
    selectedComponent: pastedComponent,
    components: populateDisplayOrder(
      selectedComponentIndex === -1
        ? [...components, pastedComponent]
        : [
            ...components.slice(0, selectedComponentIndex + 1),
            pastedComponent,
            ...components.slice(selectedComponentIndex + 1),
          ]
    ),
  };
};
