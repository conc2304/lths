import {
  AddGroupItems,
  AddItem,
  ClearForm,
  ClearGroup,
  FilterFormContextActionType,
  RemoveItem,
  SetDateRange,
  SetFormState,
  SetModalIsOpen,
} from './actions';
import { DateRange } from './date-range';
import { FormSchema, FormState } from './forms';

export type FilterFormContext = {
  formSchema: FormSchema[];
  formState: FormState;
  dateRange: DateRange;
};

export type FilterFormDataContextType = {
  formSchema: FormSchema[];
  formState: FormState;
  dateRange: DateRange;
};

export type FilterFormMethods = {
  setModalIsOpen?: SetModalIsOpen;
  clearForm?: ClearForm;
  addItem?: AddItem;
  removeItem?: RemoveItem;
  addGroupItems?: AddGroupItems;
  clearGroup?: ClearGroup;
  setFormState?: SetFormState;
  setDateRange?: SetDateRange;
};

export type FilterFormContextType = FilterFormDataContextType &
  FilterFormMethods & {
    modalIsOpen: boolean;
  };

export type FilterFormContextDispatchType = (action: FilterFormContextActionType) => void;
