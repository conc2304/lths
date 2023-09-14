import { AsyncThunk, PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DateFilter, FilterFormState, FormSchema, FormState, FormStateValue } from '@lths/shared/ui-elements';
import {
  getInitialFormState,
  handleAddFormStateItem,
  handleAddFormStateItems,
  handleRemoveFormStateGroup,
  handleRemoveFormStateItem,
} from '@lths/shared/ui-elements';
import { dateToUTCString } from '@lths/shared/utils';

import { filterApi } from './api';
import { RootState } from '../store';

const initialState: FilterFormState = {
  formSchema: null,
  formState: null,
  dateRange: { start_date: null, end_date: null },
};

export const extractActionName = (input: string): string => {
  const regex = /\/(.*)/;
  const match = input.match(regex);
  return match ? match[1] : input;
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDateRange: (state: FilterFormState, action: PayloadAction<DateFilter>) => {
      const {
        payload: { start_date, end_date },
      } = action;
      const newStartDate = dateToUTCString(start_date);
      const newEndDate = dateToUTCString(end_date);
      state.dateRange.start_date = newStartDate;
      state.dateRange.end_date = newEndDate;
    },
    setFormState: (state: FilterFormState, action: PayloadAction<{ formState: FormState }>) => {
      const {
        payload: { formState },
      } = action;
      state.formState = formState;
    },
    setFormSchema: (state: FilterFormState, action: PayloadAction<FormSchema[]>) => {
      const { payload } = action;
      state.formSchema = payload;
    },
    addFilterItem: (
      state: FilterFormState,
      action: PayloadAction<{
        parentID: string;
        itemID: string;
        item: FormStateValue;
      }>
    ) => {
      state.formState = handleAddFormStateItem(state.formState, action.payload);
    },
    removeFilterItem: (state: FilterFormState, action: PayloadAction<{ parentID: string; itemID: string }>) => {
      state.formState = handleRemoveFormStateItem(state.formState, action.payload);
    },
    removeFilterGroup: (state: FilterFormState, action: PayloadAction<{ parentID: string }>) => {
      state.formState = handleRemoveFormStateGroup(state.formState, action.payload);
    },
    addFilterGroupItems: (
      state: FilterFormState,
      action: PayloadAction<{ parentID: string; items: FormStateValue }>
    ) => {
      state.formState = handleAddFormStateItems(state.formState, action.payload);
    },
    clearFilters: (state: FilterFormState) => {
      state.formState = {};
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(filterApi.endpoints.getAppFilters.matchFulfilled, (state, { payload }) => {
      state.formSchema = payload.data;
      state.formState = getInitialFormState(payload.data);
    });
  },
});

type ReducerAction<T> = (arg: T) => PayloadAction<T>;

export const filterActionWithUpdatedState = <T>(
  action: ReducerAction<T>
): AsyncThunk<RootState, T, { rejectValue: SerializedError }> => {
  const actionName = extractActionName(action['type']);
  return createAsyncThunk<RootState, T>(
    `filters/${actionName}WithUpdatedState`,
    async (payload, { dispatch, getState }) => {
      dispatch(action(payload));
      const updatedState = getState()[filtersSlice.name];
      return updatedState;
    }
  );
};

const { actions, reducer } = filtersSlice;
export const {
  setDateRange,
  setFormState,
  setFormSchema,
  clearFilters,
  addFilterGroupItems,
  addFilterItem,
  removeFilterGroup,
  removeFilterItem,
} = actions;
export const filtersReducer = reducer;

export const setDateRangeAndGetUpdatedState = filterActionWithUpdatedState<DateFilter>(setDateRange);
export const clearFiltersAndGetUpdatedState = filterActionWithUpdatedState<void>(clearFilters);
export const removeFilterItemAndGetUpdatedState = filterActionWithUpdatedState<{ parentID: string; itemID: string }>(
  removeFilterItem
);
