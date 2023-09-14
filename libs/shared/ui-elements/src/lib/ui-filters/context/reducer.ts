import produce from 'immer';

import { FilterFormContextType, FilterFormContextActionType } from '../../ui-filters/types';

export const formFilterContextReducer = (state: FilterFormContextType, action: FilterFormContextActionType) => {
  try {
    switch (action.type) {
      case 'ADD_ITEM':
        return produce(state, (draft) => {
          if (!draft.formState[action.payload.parentID]) {
            draft.formState[action.payload.parentID] = action.payload.item;
          } else {
            draft.formState[action.payload.parentID] = {
              ...state.formState[action.payload.parentID],
              ...action.payload.item,
            };
          }
        });

      case 'REMOVE_ITEM':
        return produce(state, (draft) => {
          if (!draft.formState[action.payload.parentID]) return;
          delete draft.formState[action.payload.parentID][action.payload.itemID];
          if (!Object.keys(draft.formState[action.payload.parentID]).length)
            delete draft.formState[action.payload.parentID];
        });

      case 'REMOVE_GROUP':
        return produce(state, (draft) => {
          delete draft.formState[action.payload.parentID];
        });
      case 'ADD_GROUP_ITEMS':
        return produce(state, (draft) => {
          draft.formState[action.payload.parentID] = {
            ...state.formState[action.payload.parentID],
            ...action.payload.items,
          };
        });
      case 'CLEAR_ALL_ITEMS': {
        return produce(state, (draft) => {
          draft.formState = {};
        });
      }
      case 'SET_MODAL_OPEN': {
        return produce(state, (draft) => {
          draft.modalIsOpen = action.payload.isOpen;
        });
      }
      case 'SET_FORM_STATE': {
        return produce(state, (draft) => {
          draft.formState = { ...action.payload.formState };
        });
      }
      case 'SET_DATE_RANGE': {
        return produce(state, (draft) => {
          draft.dateRange = { ...action.payload.dateRange };
        });
      }
      default:
        throw new Error(`Unhandled action: ${action}`);
    }
  } catch (e) {
    console.warn(e);
  }
};

export const FilterFormContextReducer = produce(formFilterContextReducer);
