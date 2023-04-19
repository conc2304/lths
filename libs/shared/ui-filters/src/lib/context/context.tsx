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
  dateRange: {
    start: null,
    end: null,
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
