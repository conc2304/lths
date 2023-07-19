import { ChangeEvent } from 'react';
import { Checkbox, Divider, FormControlLabel, Stack } from '@mui/material';

import {
  AddGroupItems,
  AddItem,
  ClearGroup,
  FormSchema,
  FormState,
  FormStateValue,
  RemoveItem,
} from '@lths/types/ui-filters';

import { getPluralizeLastWord } from '../filter-form/utils';

type handleCheckProps = { checked: boolean; id: string; title: string };

type CheckBoxItemProps = {
  formFields: FormSchema[];
  groupTitle: string;
  groupID: string;
  formState: FormState;
  onAddItem: AddItem;
  onRemoveItem: RemoveItem;
  onClearGroup: ClearGroup;
  onAddGroupItems: AddGroupItems;
  orientation?: 'vertical' | 'horizontal';
};

export const CheckBoxItems = (props: CheckBoxItemProps): JSX.Element => {
  const {
    groupTitle,
    groupID,
    formState,
    onAddItem: addItem,
    onRemoveItem: removeItem,
    onClearGroup: clearGroup,
    onAddGroupItems: addGroupItems,
    formFields,
    orientation = 'vertical',
  } = props;

  const handleCheckBoxChange = ({ checked, id, title }: handleCheckProps) => {
    const item = { [id]: { id, title } };

    if (checked) {
      addItem({ parentID: groupID, itemID: id, item });
    } else {
      removeItem({ parentID: groupID, itemID: id });
    }
  };

  const handleToggleAll = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (!checked) {
      clearGroup && clearGroup({ parentID: groupID });
    } else {
      const grouIDValues: FormStateValue = {};
      formFields.forEach((elem) => {
        const { id, title } = elem;
        grouIDValues[elem.id as string] = { id, title };
      });
      addGroupItems && addGroupItems({ parentID: groupID, items: grouIDValues });
    }
  };

  const pluralizedLastWord = getPluralizeLastWord(groupTitle);
  const allTitle = `All ${pluralizedLastWord}`;
  const formStateLength = formState?.[groupID] ? Object.keys(formState[groupID]).length : 0;
  const isParentIndeterminate = formStateLength > 0 && formStateLength !== formFields.length;
  const isVertical = orientation === 'vertical';

  return (
    <Stack direction={isVertical ? 'column' : 'row'} flexWrap="wrap">
      <FormControlLabel
        label={allTitle}
        value={`${pluralizedLastWord}--toggle`}
        control={
          <Checkbox
            checked={formStateLength === formFields.length}
            indeterminate={isParentIndeterminate}
            onChange={handleToggleAll}
          />
        }
      />
      <Divider
        variant="middle"
        sx={{
          mt: 1,
          mb: 1,
          height: !isVertical ? '2.2rem' : null,
          mx: (theme) => (isVertical ? null : theme.spacing(2)),
        }}
        orientation={isVertical ? 'horizontal' : 'vertical'}
      />
      {/* Individual Parts of form */}
      {formFields?.map((item) => {
        const { title, id } = item;
        const itemID = id as string;
        const isChecked = !!formState?.[groupID]?.[itemID];

        return (
          <FormControlLabel
            label={title}
            value={id}
            key={id}
            control={
              <Checkbox
                checked={isChecked}
                onChange={({ target: { checked } }) =>
                  handleCheckBoxChange({ checked, id: itemID, title: title as string })
                }
                name={id}
                value={id}
              />
            }
          />
        );
      })}
    </Stack>
  );
};
