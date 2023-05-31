import { configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';

import { api } from '@lths/shared/data-access';
import { Handlers } from '@lths/shared/mocks';
import { FormStateValue } from '@lths/types/ui-filters';

import {
  setDateRange,
  addFilterItem,
  removeFilterItem,
  removeFilterGroup,
  addFilterGroupItems,
  clearFilters,
  filtersReducer,
  setFormState,
  extractActionName,
} from './slice';

describe('Filters Slice', () => {
  let store: ToolkitStore;
  const server = setupServer(...Handlers.default);

  beforeEach(() => {
    server.listen();
    store = configureStore({
      reducer: { filters: filtersReducer, [api.reducerPath]: api.reducer },
    });
    store.dispatch(setFormState({ formState: {} }));
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should handle setDateRange action', () => {
    // Arrange
    // Act
    store.dispatch(
      setDateRange({ start_date: new Date(2023, 5, 15).toUTCString(), end_date: new Date(2023, 6, 15).toUTCString() })
    );
    // Assert
    expect(store.getState().filters.dateRange.start_date).toEqual('Thu, 15 Jun 2023 04:00:00 GMT');
    expect(store.getState().filters.dateRange.end_date).toEqual('Sat, 15 Jul 2023 04:00:00 GMT');
  });

  it('should handle addFilterItem action', () => {
    // Arrange
    const testItem: FormStateValue = { item1: { id: 'item1', title: 'Item 1', value: 'Value 1' } };
    const testGroupID = 'group1';
    const payload = {
      parentID: testGroupID,
      itemID: 'item1',
      item: testItem,
    };
    // Act
    store.dispatch(addFilterItem(payload));
    // Assert
    expect(store.getState().filters.formState[testGroupID]).toEqual(testItem);
  });

  it('should handle removeFilterItem action', () => {
    // Arrange
    const testItem: FormStateValue = { item1: { id: 'item1', title: 'Item 1', value: 'Value 1' } };
    const testGroupID = 'group1';
    const addPayload = {
      parentID: testGroupID,
      itemID: 'item1',
      item: testItem,
    };
    const removePayload = {
      parentID: testGroupID,
      itemID: 'item1',
    };
    store.dispatch(addFilterItem(addPayload));
    expect(store.getState().filters.formState[testGroupID]).toBeDefined();
    // Act
    store.dispatch(removeFilterItem(removePayload));
    // Assert
    expect(store.getState().filters.formState[testGroupID]).toBeUndefined();
  });

  it('should handle removeFilterGroup action', () => {
    // Arrange
    const testGroupID = 'group1';
    const payload = { parentID: testGroupID };
    store.dispatch(
      addFilterGroupItems({
        parentID: testGroupID,
        items: { item1: { id: 'item1', title: 'Item 1', value: 'Value 1' } },
      })
    );
    expect(store.getState().filters.formState[testGroupID]).toBeDefined();
    // Act
    store.dispatch(removeFilterGroup(payload));
    // Assert
    expect(store.getState().filters.formState[testGroupID]).toBeUndefined();
  });

  it('should handle addFilterGroupItems action', () => {
    // Arrange
    const testGroupID = 'group1';
    const items = {
      item1: { id: 'item1', title: 'Item 1', value: 'Value 1' },
      item2: { id: 'item2', title: 'Item 2', value: 'Value 2' },
    };
    //Act
    store.dispatch(addFilterGroupItems({ parentID: testGroupID, items }));
    // Assert
    expect(store.getState().filters.formState[testGroupID]).toEqual(items);
  });

  it('should handle clearFilters action', () => {
    // Arrange
    store.dispatch(
      addFilterGroupItems({ parentID: 'group1', items: { item1: { id: 'item1', title: 'Item 1', value: 'Value 1' } } })
    );
    expect(store.getState().filters.formState['group1']).toBeDefined();
    // Act
    store.dispatch(clearFilters());
    // Assert
    expect(store.getState().filters.formState).toEqual({});
  });
});

describe('extractActionName', () => {
  it('should return the string after the "/" when input contains "/"', () => {
    const input = '/test';
    const output = extractActionName(input);
    expect(output).toEqual('test');
  });

  it('should return the input string as it is when it does not contain "/"', () => {
    const input = 'test';
    const output = extractActionName(input);
    expect(output).toEqual('test');
  });
});
