import { validate } from 'uuid';

import { ComponentProps } from './types';
import {
  sortAndPopulateDisplayOrder,
  initComponents,
  addNewComponent,
  swapComponent,
  duplicateComponent,
} from './utils';

const defaultProps: ComponentProps = {
  name: 'ComponentProps',
  __ui_id__: null,
  _id: null,
  image_url: null,
  data: null,
  schema: null,
  component_id: '',
  display_order: undefined,
  variation_id: '',
  description: null,
  category: null,
};
describe('Component Display Order', () => {
  it('should sort components by display_order in ascending order', () => {
    const components: ComponentProps[] = [
      { ...defaultProps, name: 'ComponentProps A', display_order: 3 },
      { ...defaultProps, name: 'ComponentProps B', display_order: 1 },
      { ...defaultProps, name: 'ComponentProps C', display_order: 2 },
    ];

    const result = sortAndPopulateDisplayOrder(components);

    const expectedOrder = [1, 2, 3];
    const displayOrders = result.map((c) => c.display_order);
    expect(displayOrders).toEqual(expectedOrder);
  });

  it('should increment display_order for components with the same display_order', () => {
    const components: ComponentProps[] = [
      { ...defaultProps, name: 'ComponentProps A', display_order: 1 },
      { ...defaultProps, name: 'ComponentProps B', display_order: 2 },
      { ...defaultProps, name: 'ComponentProps C', display_order: 2 },
    ];

    const result = sortAndPopulateDisplayOrder(components);

    const expectedOrder = [1, 2, 3];
    const displayOrders = result.map((c) => c.display_order);
    expect(displayOrders).toEqual(expectedOrder);
  });

  it('should handle components with undefined display_order values', () => {
    const components: ComponentProps[] = [
      { ...defaultProps, name: 'ComponentProps A' },
      { ...defaultProps, name: 'ComponentProps B', display_order: 2 },
      { ...defaultProps, name: 'ComponentProps C' },
      { ...defaultProps, name: 'ComponentProps D', display_order: 2 },
    ];

    const result = sortAndPopulateDisplayOrder(components);

    const expectedOrder = [1, 2, 3, 4];
    const displayOrders = result.map((c) => c.display_order);
    expect(displayOrders).toEqual(expectedOrder);
  });

  it('should handle an empty array', () => {
    const components: ComponentProps[] = [];

    const result = sortAndPopulateDisplayOrder(components);

    expect(result).toEqual([]);
  });

  it('should set the display_order of the first component to 1 if it is greater than 0', () => {
    const components: ComponentProps[] = [
      { ...defaultProps, name: 'ComponentProps A', display_order: 3 },
      { ...defaultProps, name: 'ComponentProps B', display_order: 2 },
      { ...defaultProps, name: 'ComponentProps C', display_order: 4 },
    ];

    const result = sortAndPopulateDisplayOrder(components);

    expect(result[0].display_order).toBe(1);
  });

  it('should handle components with no defined display_order', () => {
    const components: ComponentProps[] = [
      { ...defaultProps, name: 'ComponentProps A' },
      { ...defaultProps, name: 'ComponentProps B' },
      { ...defaultProps, name: 'ComponentProps C' },
    ];

    const result = sortAndPopulateDisplayOrder(components);

    const expectedOrder = [1, 2, 3];
    const displayOrders = result.map((c) => c.display_order);
    expect(displayOrders).toEqual(expectedOrder);
  });
});
describe('Component Navigator', () => {
  it('should initialize and populate display_order for components with UUID', () => {
    const components = [
      { ...defaultProps, name: 'Component A' },
      { ...defaultProps, name: 'Component B' },
      { ...defaultProps, name: 'Component C' },
    ];

    const initializedComponents = initComponents(components);

    // Check if __ui_id__ (UUID) is assigned to each component
    initializedComponents.forEach((component) => {
      expect(component.__ui_id__).toBeDefined();
      //expect(uuid.validate(component.__ui_id__)).toBe(true);
    });

    expect(initializedComponents).toEqual(
      expect.arrayContaining(
        components.map((o, i) =>
          expect.objectContaining({
            ...o,
            __ui_id__: initializedComponents[i].__ui_id__,
            display_order: initializedComponents[i].display_order,
          })
        )
      )
    );
  });

  it('should add a new component, populate display_order & uuid and clear external ids', () => {
    const existingComponents = [
      { ...defaultProps, name: 'Component A', display_order: 1 },
      { ...defaultProps, name: 'Component B', display_order: 2 },
    ];
    const newComponent = { ...defaultProps, name: 'New Component' };

    const updatedComponents = addNewComponent(existingComponents, newComponent);

    const lastComponent = updatedComponents[updatedComponents.length - 1];
    // Check if display_order & uuid are populated for the new component
    expect(lastComponent.display_order).toBe(3);
    expect(validate(lastComponent.__ui_id__)).toBeTruthy();
    // Check if mangodb ids are cleared
    expect(lastComponent.variation_id).toBe('');
    expect(lastComponent._id).toBe('');
  });

  it('should swap two components and preserve display_order', () => {
    const components = [
      { ...defaultProps, name: 'Component A', display_order: 1 },
      { ...defaultProps, name: 'Component B', display_order: 2 },
      { ...defaultProps, name: 'Component C', display_order: 3 },
    ];
    const dragIndex = 0;
    const hoverIndex = 2;

    const swappedComponents = swapComponent(components, dragIndex, hoverIndex);

    // Check if the components are swapped correctly while preserving display_order
    expect(swappedComponents).toEqual([
      { ...defaultProps, name: 'Component B', display_order: 1 },
      { ...defaultProps, name: 'Component C', display_order: 2 },
      { ...defaultProps, name: 'Component A', display_order: 3 },
    ]);
  });

  it('should duplicate a component and adjust display_order', () => {
    const currentIndex = 1;
    const components = initComponents([
      { ...defaultProps, name: 'Component A', display_order: 1 },
      { ...defaultProps, name: 'Component B', display_order: 2 },
      { ...defaultProps, name: 'Component C', display_order: 3 },
      { ...defaultProps, name: 'Component A 1', display_order: 1 },
    ]);
    const currentUuid = components[currentIndex].__ui_id__;

    const duplicatedComponents = duplicateComponent(components, currentUuid);

    const duplicatedIndex = currentIndex + 1;
    expect(duplicatedComponents.find((o) => o.__ui_id__ === currentUuid).display_order).toBe(2);
    expect(duplicatedComponents[duplicatedIndex].display_order).toBe(3);
    expect(validate(duplicatedComponents[duplicatedIndex].__ui_id__)).toBeTruthy();
    // Check if mangodb ids are cleared
    expect(duplicatedComponents[duplicatedIndex].variation_id).toBe('');
    expect(duplicatedComponents[duplicatedIndex]._id).toBe('');
  });

  it('should duplicate a component and continue from previous numbering', () => {
    const currentIndex = 1;
    const components = initComponents([
      { ...defaultProps, component_id: 'componentB', name: 'Component B 1', display_order: 1 },
      { ...defaultProps, component_id: 'componentB', name: 'Component B 2', display_order: 2 },
      { ...defaultProps, component_id: 'componentC', name: 'Component C', display_order: 3 },
      { ...defaultProps, component_id: 'componentB', name: 'Component B 3', display_order: 1 },
    ]);
    const currentUuid = components[currentIndex].__ui_id__;
    const duplicatedComponents = duplicateComponent(components, currentUuid);
    const duplicatedName = `Component B 4`;
    const duplicatedIndex = currentIndex + 1;
    expect(duplicatedComponents[duplicatedIndex].name).toBe(duplicatedName);
  });
});
