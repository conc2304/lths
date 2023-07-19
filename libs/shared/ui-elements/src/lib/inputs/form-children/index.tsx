import { FormControlLabel, Radio, RadioGroup, Skeleton, Stack } from '@mui/material';

import { AddGroupItems, AddItem, ClearGroup, FormSchema, FormState, RemoveItem } from '@lths/types/ui-filters';

import { CheckBoxItems } from './checkbox-items';
import { sortBySeq } from '../filter-form/utils';

type FormElementsProps = {
  isLoading?: boolean;
  formSchema?: FormSchema;
  groupTitle?: string;
  groupID?: string;
  formState?: FormState;
  onAddItem: AddItem;
  onRemoveItem: RemoveItem;
  onClearGroup: ClearGroup;
  onAddGroupItems: AddGroupItems;
  orientation?: 'vertical' | 'horizontal';
};
export const FormChildren = (props: FormElementsProps): JSX.Element => {
  const {
    isLoading = false,
    orientation = 'vertical',
    groupTitle = '',
    groupID = '',
    formState = {},
    formSchema = {},
    onAddItem: addItem,
    onRemoveItem: removeItem,
    onClearGroup: clearGroup,
    onAddGroupItems: addGroupItems,
  } = props;

  if (isLoading || !formSchema || !Object.keys(formSchema).length) {
    return (
      <Stack justifyContent={'flex-start'} direction={orientation === 'vertical' ? 'column' : 'row'} spacing={2} mr={1}>
        {new Array(Math.floor(Math.random() * (6 - 3) + 3)).fill('').map((_, i) => (
          <Skeleton key={i} width={100} height={30} />
        ))}
      </Stack>
    );
  } else {
    const { default_value, data, type: elementType } = formSchema;
    const sortedFields = sortBySeq(data as FormSchema[], 'asc');

    console.log('HERE 1');
    switch (elementType) {
      case 'checkbox':
        return (
          <CheckBoxItems
            orientation={orientation}
            groupTitle={groupTitle}
            groupID={groupID}
            formState={formState}
            formFields={sortedFields}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onClearGroup={clearGroup}
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
  }
};
