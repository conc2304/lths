import { createContext, ReactNode, useContext, useReducer } from 'react';

import {
  addFormItem,
  addItems,
  clearForm,
  clearFormGroup,
  removeFormItem,
  setFormState,
  setModalIsOpen,
} from './actions';
import { FilterFormStateReducer } from './reducer';
import { FilterFormStateContextType } from './types';

const INITIAL_STATE: FilterFormStateContextType = {
  modalIsOpen: false,
  formState: {},
  // these methods will be overwritten in the provider
  // adding them here so that typescript does not get hangry about not passing these in
  setModalIsOpen: () => {
    throw new Error('setModalIsOpen is not initialized with dispatch');
  },
  clearForm: () => {
    throw new Error('clearForm() is not initialized with dispatch');
  },
  addItem: () => {
    throw new Error('addItem() is not initialized with dispatch');
  },
  removeItem: () => {
    throw new Error('removeItem() is not initialized with dispatch');
  },
  addGroupItems: () => {
    throw new Error('addGroupItems() is not initialized with dispatch');
  },
  clearGroup: () => {
    throw new Error('clearGroup() is not initialized with dispatch');
  },
  setFormState: () => {
    throw new Error('setFormState() is not initialized with dispatch');
  },
};

const FilterFormStateContext = createContext<FilterFormStateContextType | null>(null);

const FilterFormStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(FilterFormStateReducer, INITIAL_STATE);
  const { modalIsOpen, formState } = state;

  return (
    <FilterFormStateContext.Provider
      value={{
        modalIsOpen,
        formState,
        setModalIsOpen: setModalIsOpen(dispatch),
        clearForm: clearForm(dispatch),
        addItem: addFormItem(dispatch),
        removeItem: removeFormItem(dispatch),
        addGroupItems: addItems(dispatch),
        clearGroup: clearFormGroup(dispatch),
        setFormState: setFormState(dispatch),
      }}
    >
      {children}
    </FilterFormStateContext.Provider>
  );
};

const useFilterFormState = () => {
  const filterFormStateContext = useContext(FilterFormStateContext);

  if (!filterFormStateContext) {
    throw new Error('useFilterFormState has to be used within FilterFormStateContext.Provider>');
  }

  return filterFormStateContext;
};

export { FilterFormStateProvider, useFilterFormState };
