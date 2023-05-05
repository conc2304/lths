import { createContext, ReactNode, useContext, useReducer } from 'react';

import { FilterFormContextType, FilterFormDataContextType } from '@lths/types/ui-filters';

import {
  addFormItem,
  addItems,
  clearForm,
  clearFormGroup,
  removeFormItem,
  setDateRange,
  setFormState,
  setModalIsOpen,
} from './actions';
import { FilterFormContextReducer } from './reducer';

const INITIAL_STATE: FilterFormContextType = {
  formSchema: [],
  modalIsOpen: false,
  formState: {},
  dateRange: {
    start_date: null,
    end_date: null,
  },
};

const FilterFormContext = createContext<FilterFormContextType | null>(null);

type FilterFormContextProviderProps = { children: ReactNode; externalState?: FilterFormDataContextType };

const FilterFormContextProvider = ({ children }: FilterFormContextProviderProps) => {
  const [state, dispatch] = useReducer(FilterFormContextReducer, INITIAL_STATE);
  const { modalIsOpen, formState, formSchema, dateRange } = state;

  return (
    <FilterFormContext.Provider
      value={{
        modalIsOpen,
        formState,
        formSchema,
        dateRange,
        setModalIsOpen: setModalIsOpen(dispatch),
        clearForm: clearForm(dispatch, state),
        addItem: addFormItem(dispatch),
        removeItem: removeFormItem(dispatch, state),
        addGroupItems: addItems(dispatch),
        clearGroup: clearFormGroup(dispatch),
        setFormState: setFormState(dispatch),
        setDateRange: setDateRange(dispatch),
      }}
    >
      {children}
    </FilterFormContext.Provider>
  );
};

const useFilterFormContext = () => {
  const filterFormStateContext = useContext(FilterFormContext);

  if (!filterFormStateContext) {
    throw new Error('useFilterFormState has to be used within FilterFormContext.Provider>');
  }

  return filterFormStateContext;
};

export { FilterFormContextProvider, useFilterFormContext };
