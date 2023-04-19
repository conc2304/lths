type FormDataType = 'checkbox' | 'range' | 'textfield' | 'textarea' | 'select' | 'radio' | null;

export type Seq = number | [number, number] | undefined;

export type FormSchema = {
  title?: string | null;
  subtitle?: string | null;
  info?: {
    description: string;
    url: string;
  };
  seq?: Seq;
  id?: string;
  type?: FormDataType;
  default_value?: Array<string | { id: string; value: string | number }>;
  data?: FormSchema[];
};

export type FormStateValue = { [id: string]: { id?: string; title?: string | null; value?: string | number } };
export type FormState = {
  [id: string]: FormStateValue;
};

export type FilterFormStateType = {
  modalIsOpen: boolean;
  formState: FormState;
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
};

export type FilterFormStateContextType = FilterFormStateType & {
  setModalIsOpen?: (isOpen: boolean) => void;
  clearForm?: () => void;
  addItem?: (parentID: string, itemID: string, item: FormStateValue) => void;
  removeItem?: (parentID: string, itemID: string) => void;
  addGroupItems?: (parentID: string, items: FormStateValue) => void;
  clearGroup?: (parentID: string) => void;
  setFormState?: (formState: FormState) => void;
};

export type FilterFormStateActionType =
  | { type: 'SET_MODAL_OPEN'; isOpen: boolean }
  | { type: 'SET_FORM_STATE'; formState: FormState }
  | { type: 'CLEAR_ALL_ITEMS' }
  | { type: 'ADD_ITEM'; parentID: string; itemID: string; item: FormStateValue }
  | { type: 'REMOVE_ITEM'; parentID: string; itemID: string }
  | { type: 'REMOVE_GROUP'; parentID: string }
  | { type: 'ADD_GROUP_ITEMS'; parentID: string; items: any };

export type FilterFormStateDispatchType = (action: FilterFormStateActionType) => void;
