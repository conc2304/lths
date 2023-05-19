import { FormState } from '@lths/types/ui-filters';

import {
  handleAddFormStateItem,
  handleAddFormStateItems,
  handleRemoveFormStateGroup,
  handleRemoveFormStateItem,
} from './actions';

describe('Filters - Form State Handlers', () => {
  let formState: FormState;
  beforeEach(() => {
    formState = {
      group1: {
        item1: { id: 'item1', title: 'Item 1', value: 'Value 1' },
        item2: { id: 'item2', title: 'Item 2', value: 'Value 2' },
      },
      group2: {
        item3: { id: 'item3', title: 'Item 3', value: 'Value 3' },
      },
    };
  });

  it('handleAddFormStateItem should correctly add item to formState', () => {
    const payload = {
      parentID: 'group2',
      item: { item4: { id: 'item4', title: 'Item 4', value: 'Value 4' } },
    };
    const newState = handleAddFormStateItem(formState, payload);
    expect(newState).toEqual({
      ...formState,
      group2: {
        ...formState.group2,
        ...payload.item,
      },
    });
  });

  it('handleAddFormStateItems should correctly add multiple items to formState', () => {
    const payload = {
      parentID: 'group3',
      items: {
        item5: { id: 'item5', title: 'Item 5', value: 'Value 5' },
        item6: { id: 'item6', title: 'Item 6', value: 'Value 6' },
      },
    };
    const newState = handleAddFormStateItems(formState, payload);
    expect(newState).toEqual({
      ...formState,
      group3: payload.items,
    });
  });

  it('handleClearGroup should correctly clear a group from formState', () => {
    const payload = { parentID: 'group1' };
    const newState = handleRemoveFormStateGroup(formState, payload);
    expect(newState).toEqual({
      group2: formState.group2,
    });
  });

  it('handleRemoveItem should correctly remove an item from formState', () => {
    const payload = { parentID: 'group1', itemID: 'item1' };
    const newState = handleRemoveFormStateItem(formState, payload);
    expect(newState).toEqual({
      group1: {
        item2: { id: 'item2', title: 'Item 2', value: 'Value 2' },
      },
      group2: formState.group2,
    });
  });
});
