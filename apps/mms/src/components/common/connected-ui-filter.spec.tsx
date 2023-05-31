import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen, cleanup, RenderResult, within, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import mockConfigureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'whatwg-fetch'; // removes the warning/error for SSR fetching

import { store as MMS_Store } from '@lths/features/mms/data-access';
import {
  setDateRange,
  setFormState,
  addFilterItem,
  addFilterGroupItems,
  removeFilterGroup,
  clearFilters,
  removeFilterItem,
} from '@lths/features/mms/data-access';
import { api } from '@lths/shared/data-access';
import { Handlers } from '@lths/shared/mocks';

import { ConnectedUiFilter } from './connected-ui-filter';
import { formStateMock, formSchemaMock } from './mockData';

const middlewares = [thunk];
const mockStore = mockConfigureStore(middlewares);

describe('ConnectedUiFilter', () => {
  let store: MockStoreEnhanced;
  let connectedComponent: RenderResult;
  let component: JSX.Element;

  beforeEach(() => {
    store = mockStore({
      api: api.reducer,
      filters: {
        formSchema: formSchemaMock,
        formState: {
          ...formStateMock,
          location: {
            at_arena: {
              id: 'at_arena',
              title: 'At Arena',
            },
            at_home: {
              id: 'at_home',
              title: 'at_home',
            },
          },
        },

        dateRange: {
          start_date: 'December 17, 2021 03:24:00',
          end_date: 'December 20, 2021 03:24:00',
        },
      },
    });
    store.clearActions();

    // We are not setting up rendering components in before each because
    // when testing async Thunks we test it via store.getActions() which needs its regular dispatch functionality
    // Otherwise we mock dispatch and check that it has been called with the expected params
    /** Note - because we arent using a real store we are not getting selector updates */
  });

  afterEach(() => {
    cleanup();
    store.clearActions();
  });

  // Render Test
  it('should render correctly and displays the expected content', () => {
    // Arrange
    component = RBThemeProvider({ children: <ConnectedUiFilter onFiltersUpdate={jest.fn()} /> });
    connectedComponent = render(<Provider store={store}>{component}</Provider>);
    const appliedFilter = screen.getByText(formStateMock['event_state']['pre_game'].title);
    const { baseElement } = connectedComponent;
    // Act
    // Assert
    expect(connectedComponent).toBeTruthy();
    expect(baseElement).toBeInTheDocument();
    expect(appliedFilter).toBeInTheDocument();
  });

  // Redux Store Interaction Test
  it('should dispatch actions correctly when user updates the time period', () => {
    // Arrange
    store.dispatch = jest.fn();
    component = RBThemeProvider({ children: <ConnectedUiFilter onFiltersUpdate={jest.fn()} /> });
    connectedComponent = render(<Provider store={store}>{component}</Provider>);
    jest.clearAllMocks();

    // Act
    fireEvent.click(connectedComponent.getByText('UPDATE PERIOD'));

    // Assert
    expect(store.dispatch).toHaveBeenCalledWith(setDateRange(expect.anything()));
    expect(store.dispatch).toHaveBeenCalledWith(setFormState(expect.anything()));
  });

  it('should dispatch clearFilters when a user clicks on Clear All', async () => {
    // Arrange
    component = RBThemeProvider({ children: <ConnectedUiFilter onFiltersUpdate={jest.fn()} /> });
    connectedComponent = render(<Provider store={store}>{component}</Provider>);
    const clearAllButton = connectedComponent.queryByText('Clear All');

    // Act
    fireEvent.click(clearAllButton);

    // Assertions
    expect(store.getActions()).toContainEqual(clearFilters());
  });

  it('should dispatch actions correctly when user ADDS ALL items in a filter groups', async () => {
    // Arrange
    store.dispatch = jest.fn();
    component = RBThemeProvider({ children: <ConnectedUiFilter onFiltersUpdate={jest.fn()} /> });
    connectedComponent = render(<Provider store={store}>{component}</Provider>);
    const modalOpenButton = connectedComponent.getByText('FILTER');
    expect(modalOpenButton).toBeInTheDocument();
    fireEvent.click(modalOpenButton);
    // Verify Modal has Opened
    expect(screen.queryByText('Apply Filters')).toBeInTheDocument();

    // Act - Click on the toggle all button
    fireEvent.click(connectedComponent.getByText('All States'));

    // Assert
    expect(store.dispatch).toHaveBeenCalledWith(addFilterGroupItems(expect.anything()));
    expect(store.dispatch).not.toHaveBeenCalledWith(removeFilterGroup(expect.anything()));
  });

  it('should dispatch actions correctly when user REMOVES ALL items in a filter groups', async () => {
    // FormState Filter Mock has all of the Location Filters Set
    // Arrange
    store.dispatch = jest.fn();
    component = RBThemeProvider({ children: <ConnectedUiFilter onFiltersUpdate={jest.fn()} /> });
    connectedComponent = render(<Provider store={store}>{component}</Provider>);
    const modalOpenButton = connectedComponent.getByText('FILTER');
    expect(modalOpenButton).toBeInTheDocument();
    fireEvent.click(modalOpenButton);

    expect(screen.queryByText('Apply Filters')).toBeInTheDocument();

    // Act
    fireEvent.click(connectedComponent.getByText('All Locations'));

    // Assert
    expect(store.dispatch).toHaveBeenCalledWith(removeFilterGroup(expect.anything()));
    expect(store.dispatch).not.toHaveBeenCalledWith(addFilterGroupItems(expect.anything()));
  });

  it('should dispatch actions correctly when user REMOVES ONE items', async () => {
    // Arrange
    component = RBThemeProvider({ children: <ConnectedUiFilter onFiltersUpdate={jest.fn()} /> });
    connectedComponent = render(<Provider store={store}>{component}</Provider>);

    const filterItemRemoveButtons = connectedComponent.queryAllByTestId('CloseIcon');
    expect(filterItemRemoveButtons.length).toBe(3);

    const filterParentID = Object.keys(formStateMock)[0];
    const testItem = formStateMock[filterParentID];
    const testFilterItem = testItem[Object.keys(testItem)[0]];
    const testItemLabel = testFilterItem.title;
    const testButtonElem = screen.getByText(testItemLabel).parentElement as HTMLElement;
    const removeChipButton = within(testButtonElem).getByTestId('CloseIcon');

    // Act
    fireEvent.click(removeChipButton);

    // Assert
    expect(store.getActions()).toContainEqual(
      removeFilterItem({ itemID: testFilterItem.id, parentID: filterParentID })
    );
  });

  it('should dipatch actions correnctly when user ADDS ONE item', async () => {
    // Arrange
    store.dispatch = jest.fn();
    component = RBThemeProvider({ children: <ConnectedUiFilter onFiltersUpdate={jest.fn()} /> });
    connectedComponent = render(<Provider store={store}>{component}</Provider>);
    jest.clearAllMocks();
    const modalOpenButton = connectedComponent.getByText('FILTER');
    expect(modalOpenButton).toBeInTheDocument();
    fireEvent.click(modalOpenButton);

    // Verify Modal is Open
    expect(screen.queryByText('Apply Filters')).toBeInTheDocument();

    const targetLabel = 'No Event';
    const targetElem = connectedComponent.getByText(targetLabel);

    // Act - Click on Checkbox Item
    fireEvent.click(targetElem);

    // Assert
    expect(store.dispatch).toHaveBeenCalledWith(
      addFilterItem({
        itemID: 'no_event',
        parentID: expect.any(String),
        item: { no_event: { id: 'no_event', title: targetLabel } },
      })
    );
  });
});

describe('ConnectedUiFilter - Data Fetching', () => {
  let store: ToolkitStore;
  let connectedComponent: RenderResult;
  let component: JSX.Element;
  const server = setupServer(...Handlers.default);

  beforeEach(() => {
    server.listen();
    store = MMS_Store;
  });

  afterEach(() => {
    cleanup();
    server.resetHandlers();
  });

  afterAll(() => server.close());
  it('should fetch the filter form data if it does not have it available', async () => {
    // Arrange

    const handleUpdateFiters_Mock = jest.fn();
    component = RBThemeProvider({ children: <ConnectedUiFilter onFiltersUpdate={handleUpdateFiters_Mock} /> });
    connectedComponent = render(<Provider store={store}>{component}</Provider>);
    const { baseElement } = connectedComponent;

    // Force the page to wait for something dependent on the api call
    // so that the api call returns a response before the test ends
    await waitFor(() => {
      expect(screen.getByText('1 Day')).toBeInTheDocument();
    });

    // Act

    // Assert
    expect(baseElement).toBeInTheDocument();
    expect(handleUpdateFiters_Mock).toHaveBeenCalledTimes(1);
    expect(handleUpdateFiters_Mock).toHaveBeenCalledWith({
      metrics: expect.any(Object),
      date_range: { start_date: expect.any(String), end_date: expect.any(String) },
    });
  });
});
