import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { AddGroupItems, AddItem, ClearGroup, FormSchema, FormState, RemoveItem } from '@lths/types/ui-filters';

import { CheckBoxItem } from './checkbox-item';
import { sortBySeq } from '../filter-form/utils';

type FormElementsProps = {
  formSchema: FormSchema;
  groupTitle: string;
  groupID: string;
  formState: FormState;
  onAddItem: AddItem;
  onRemoveItem: RemoveItem;
  onClearGroup: ClearGroup;
  onAddGroupItems: AddGroupItems;
};
export const FormChildren = (props: FormElementsProps): JSX.Element => {
  const {
    groupTitle,
    groupID,
    formState,
    onAddItem: addItem,
    onRemoveItem: removeItem,
    onClearGroup: clearGroup,
    onAddGroupItems: addGroupItems,
    formSchema: { default_value, data },
  } = props;

  const elementType = props.formSchema.type;
  const sortedFields = sortBySeq(data as FormSchema[], 'asc');

  switch (elementType) {
    case 'checkbox':
      return (
        <CheckBoxItem
          groupTitle={groupTitle}
          groupID={groupID}
          formState={formState}
          onAddItem={addItem}
          onRemoveItem={removeItem}
          onClearGroup={clearGroup}
          formFields={sortedFields}
          onAddGroupItems={addGroupItems}
        />
      );

    case 'radio':
      // TODO - NOT FULLY IMPLEMENTED
      return (
        <RadioGroup defaultValue={default_value?.[0]} name={groupID}>
          {sortedFields.map((item) => {
            const { title, id } = item;
            return (
              <FormControlLabel
                value={id}
                control={<Radio color="secondary" name={id} value={id} />}
                label={title}
                key={id}
              />
            );
          })}
        </RadioGroup>
      );
    default:
      return <></>;
  }
};
