import produce from 'immer';

import { FilterFormStateActionType, FilterFormStateContextType } from './types';

export const reducer = (draft: FilterFormStateContextType, action: FilterFormStateActionType) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (!draft.formState[action.parentID]) {
        draft.formState[action.parentID] = action.item;
        break;
      }

      draft.formState[action.parentID] = { ...draft.formState[action.parentID], ...action.item };
      break;
    case 'REMOVE_ITEM':
      delete draft.formState[action.parentID][action.itemID];
      if (!Object.keys(draft.formState[action.parentID]).length) delete draft.formState[action.parentID];
      break;
    case 'REMOVE_GROUP':
      delete draft.formState[action.parentID];
      break;
    case 'ADD_GROUP_ITEMS':
      draft.formState[action.parentID] = { ...draft.formState[action.parentID], ...action.items };
      break;
    case 'CLEAR_ALL_ITEMS': {
      draft.formState = {};
      break;
    }
    case 'SET_MODAL_OPEN': {
      draft.modalIsOpen = action.isOpen;
      break;
    }
    case 'SET_FORM_STATE': {
      draft.formState = action.formState;
      break;
    }
    case 'SET_DATE_RANGE': {
      draft.dateRange = action.dateRange;
      break;
    }
    default:
      throw new Error(`Unhandled action: ${action}`);
  }
};
export const FilterFormStateReducer = produce(reducer);
