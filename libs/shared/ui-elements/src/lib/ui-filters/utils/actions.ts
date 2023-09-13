import { produce } from 'immer';

import { FormState, FormStateValue } from '../../ui-filters';

export const handleAddFormStateItem = (
  formState: FormState = {},
  payload: { parentID: string; item: FormStateValue }
) => {
  const { parentID, item } = payload;
  if (!formState) return {};
  const newState = produce(formState, (draft) => {
    if (!draft[parentID]) {
      draft[parentID] = item;
    } else {
      draft[parentID] = {
        ...formState[parentID],
        ...item,
      };
    }
  });
  return newState;
};

export const handleAddFormStateItems = (
  formState: FormState = {},
  payload: { parentID: string; items: FormStateValue }
) => {
  const { parentID, items } = payload;
  if (!formState) return {};

  const newState = produce(formState, (draft) => {
    draft[parentID] = {
      ...formState[parentID],
      ...items,
    };
  });

  return newState;
};

export const handleRemoveFormStateGroup = (formState: FormState, payload: { parentID: string }) => {
  const { parentID } = payload;
  if (!formState) return {};

  const newState = produce(formState, (draft) => {
    delete draft[parentID];
  });
  return newState;
};

export const handleRemoveFormStateItem = (formState: FormState, payload: { parentID: string; itemID: string }) => {
  const { parentID, itemID } = payload;
  if (!formState) return {};

  const nextState = produce(formState, (draft) => {
    if (!draft[parentID]) return formState;
    delete draft[parentID][itemID];
    if (!Object.keys(draft[parentID]).length) delete draft[parentID];
  });

  return nextState;
};
