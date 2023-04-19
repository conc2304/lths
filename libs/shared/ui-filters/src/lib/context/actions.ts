import { Dispatch } from 'react';
import { DateRange } from 'libs/shared/ui-elements/src/lib/inputs/date-range-selector/types';
import { FilterFormStateActionType, FormState, FormStateValue } from './types';

export const setModalIsOpen = (dispatch: Dispatch<FilterFormStateActionType>) => (isOpen: boolean) => {
  dispatch({ type: 'SET_MODAL_OPEN', isOpen });
};

export const clearForm = (dispatch: Dispatch<FilterFormStateActionType>) => () => {
  dispatch({ type: 'CLEAR_ALL_ITEMS' });
};

export const addFormItem =
  (dispatch: Dispatch<FilterFormStateActionType>) => (parentID: string, itemID: string, item: FormStateValue) => {
    dispatch({ type: 'ADD_ITEM', parentID, itemID, item });
  };

export const removeFormItem = (dispatch: Dispatch<FilterFormStateActionType>) => (parentID: string, itemID: string) => {
  dispatch({ type: 'REMOVE_ITEM', parentID, itemID });
};

export const addItems =
  (dispatch: Dispatch<FilterFormStateActionType>) => (parentID: string, items: FormStateValue) => {
    dispatch({ type: 'ADD_GROUP_ITEMS', parentID, items });
  };

export const clearFormGroup = (dispatch: Dispatch<FilterFormStateActionType>) => (parentID: string) => {
  dispatch({ type: 'REMOVE_GROUP', parentID });
};

export const setFormState = (dispatch: Dispatch<FilterFormStateActionType>) => (formState: FormState) => {
  dispatch({ type: 'SET_FORM_STATE', formState });
};

export const setDateRange = (dispatch: Dispatch<FilterFormStateActionType>) => (dateRange: DateRange) => {
  dispatch({ type: 'SET_DATE_RANGE', dateRange });
};
