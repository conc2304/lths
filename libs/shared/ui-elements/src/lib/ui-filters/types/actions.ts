import { FilterFormContextType } from './context';
import { DateRange } from './date-range';
import { FormState, FormStateValue } from './forms';
import { FilterFormState } from './state';

type nextState = FilterFormState;

export type AddItem = ({
  parentID,
  itemID,
  item,
}: {
  parentID: string;
  itemID: string;
  item: FormStateValue;
}) => nextState | void;
export type SetModalIsOpen = ({ isOpen }: { isOpen: boolean }) => nextState | void;
export type RemoveItem = ({
  parentID,
  itemID,
}: {
  parentID: string;
  itemID: string;
}) => Promise<FilterFormState | FilterFormContextType | void>;
export type AddGroupItems = ({ parentID, items }: { parentID: string; items: FormStateValue }) => nextState | void;
export type ClearGroup = ({ parentID }: { parentID: string }) => nextState | void;
export type SetFormState = ({ formState }: { formState: FormState }) => nextState | void;
export type SetDateRange = ({ dateRange }: { dateRange: DateRange }) => nextState | void;
export type ClearForm = () => Promise<FilterFormState | FilterFormContextType | void>;

export type FilterFormContextActionType =
  | { type: 'SET_MODAL_OPEN'; payload: { isOpen: boolean } }
  | { type: 'SET_FORM_STATE'; payload: { formState: FormState } }
  | { type: 'SET_DATE_RANGE'; payload: { dateRange: DateRange } }
  | { type: 'CLEAR_ALL_ITEMS'; payload: Record<string, unknown> }
  | {
      type: 'ADD_ITEM';
      payload: { parentID: string; itemID: string; item: FormStateValue };
    }
  | {
      type: 'REMOVE_ITEM';
      payload: { parentID: string; itemID: string };
    }
  | { type: 'REMOVE_GROUP'; payload: { parentID: string } }
  | {
      type: 'ADD_GROUP_ITEMS';
      payload: { parentID: string; items: any };
    };
