import { Dispatch } from 'react';

import { formFilterContextReducer } from './reducer';
import {
  DateRange,
  FilterFormContextActionType,
  FilterFormContextType,
  FormState,
  FormStateValue,
} from '../../ui-filters';

export const setModalIsOpen =
  (dispatch: Dispatch<FilterFormContextActionType>) =>
  ({ isOpen }: { isOpen: boolean }) => {
    dispatch({ type: 'SET_MODAL_OPEN', payload: { isOpen } });
  };

export const clearForm = (dispatch: Dispatch<FilterFormContextActionType>, state: FilterFormContextType) => () => {
  const action: FilterFormContextActionType = {
    type: 'CLEAR_ALL_ITEMS',
    payload: {},
  };
  dispatch(action);
  const nextState = formFilterContextReducer(state, action);
  return Promise.resolve(nextState);
};

export const addFormItem =
  (dispatch: Dispatch<FilterFormContextActionType>) =>
  ({ parentID, itemID, item }: { parentID: string; itemID: string; item: FormStateValue }) => {
    dispatch({ type: 'ADD_ITEM', payload: { parentID, itemID, item } });
  };

export const removeFormItem =
  (dispatch: Dispatch<FilterFormContextActionType>, state: FilterFormContextType) =>
  ({ parentID, itemID }: { parentID: string; itemID: string }) => {
    const action: FilterFormContextActionType = { type: 'REMOVE_ITEM', payload: { parentID, itemID } };
    dispatch(action);
    const nextState = formFilterContextReducer(state, action);
    return Promise.resolve(nextState);
  };

export const addItems =
  (dispatch: Dispatch<FilterFormContextActionType>) =>
  ({ parentID, items }: { parentID: string; items: FormStateValue }) => {
    dispatch({ type: 'ADD_GROUP_ITEMS', payload: { parentID, items } });
  };

export const clearFormGroup =
  (dispatch: Dispatch<FilterFormContextActionType>) =>
  ({ parentID }: { parentID: string }) => {
    dispatch({ type: 'REMOVE_GROUP', payload: { parentID } });
  };

export const setFormState =
  (dispatch: Dispatch<FilterFormContextActionType>) =>
  ({ formState }: { formState: FormState }) => {
    dispatch({ type: 'SET_FORM_STATE', payload: { formState } });
  };

export const setDateRange =
  (dispatch: Dispatch<FilterFormContextActionType>) =>
  ({ dateRange }: { dateRange: DateRange }) => {
    dispatch({ type: 'SET_DATE_RANGE', payload: { dateRange } });
  };
