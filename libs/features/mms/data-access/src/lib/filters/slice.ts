import { AsyncThunk, PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getInitialFormState } from '@lths/shared/ui-filters';
import { dateToString } from '@lths/shared/utils';
import { DateFilter, FilterFormState, FormSchema, FormState, FormStateValue } from '@lths/types/ui-filters';

import { filterApi } from './api';
import { RootState } from '../store';

const initialState: FilterFormState = {
  formSchema: null,
  formState: null,
  dateRange: { start_date: null, end_date: null },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDateRange: (state: FilterFormState, action: PayloadAction<DateFilter>) => {
      const {
        payload: { start_date, end_date },
      } = action;
      const newStartDate = dateToString(start_date);
      const newEndDate = dateToString(end_date);
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
      if (!state.formState[action.payload.parentID]) {
        state.formState[action.payload.parentID] = action.payload.item;
      } else {
        state.formState[action.payload.parentID] = {
          ...state.formState[action.payload.parentID],
          ...action.payload.item,
        };
      }
    },
    removeFilterItem: (state: FilterFormState, action: PayloadAction<{ parentID: string; itemID: string }>) => {
      if (!state.formState[action.payload.parentID]) return;
      delete state.formState[action.payload.parentID][action.payload.itemID];
      if (!Object.keys(state.formState[action.payload.parentID]).length)
        delete state.formState[action.payload.parentID];
    },
    removeFilterGroup: (state: FilterFormState, action: PayloadAction<{ parentID: string }>) => {
      delete state.formState[action.payload.parentID];
    },
    addFilterGroupItems: (
      state: FilterFormState,
      action: PayloadAction<{ parentID: string; items: FormStateValue }>
    ) => {
      state.formState[action.payload.parentID] = {
        ...state.formState[action.payload.parentID],
        ...action.payload.items,
      };
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
  return createAsyncThunk<RootState, T>(
    `filters/${action.name}WithUpdatedState`,
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
