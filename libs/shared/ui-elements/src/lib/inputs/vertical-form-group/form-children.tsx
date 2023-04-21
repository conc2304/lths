import { Checkbox, Divider, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { FilterFormStateContextType, FormSchema, FormStateValue } from '@lths/shared/ui-filters';
import { getPluralizeLastWord, sortBySeq } from 'libs/shared/ui-elements/src/lib/inputs/filter-form/utils';
import { ChangeEvent, memo } from 'react';

type FormElementsProps = {
  formSchema: FormSchema;
  groupTitle: string;
  groupID: string;
};
export const FormChildren = (props: FormElementsProps & FilterFormStateContextType): JSX.Element => {
  const {
    groupTitle,
    groupID,
    formState,
    addItem,
    removeItem,
    clearGroup,
    addGroupItems,
    formSchema: { default_value, data },
  } = props;
  const elementType = props.formSchema.type;
  const sortedFields = sortBySeq(data as FormSchema[], 'asc');

  switch (elementType) {
    case 'checkbox':
      type handleCheckProps = { checked: boolean; id: string; title: string };

      const handleCheckBoxChange = ({ checked, id, title }: handleCheckProps) => {
        const item = { [id]: { id, title } };

        if (checked) {
          addItem && addItem(groupID, id, item);
        } else {
          removeItem && removeItem(groupID, id);
        }
      };

      const handleToggleAll = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;

        if (!checked) {
          clearGroup && clearGroup(groupID);
        } else {
          const grouIDValues: FormStateValue = {};
          sortedFields.forEach((elem) => {
            const { id, title } = elem;
            grouIDValues[elem.id as string] = { id, title };
          });
          addGroupItems && addGroupItems(groupID, grouIDValues);
        }
      };

      const pluralizedLastWord = getPluralizeLastWord(groupTitle);
      const allTitle = `All ${pluralizedLastWord}`;
      const formStateLength = formState?.[groupID] ? Object.keys(formState[groupID]).length : 0;
      const isParentIndeterminate = formStateLength > 0 && formStateLength !== sortedFields.length;

      return (
        <>
          <FormControlLabel
            label={allTitle}
            value={`${pluralizedLastWord}--togle`}
            control={
              <Checkbox
                checked={formStateLength === sortedFields.length}
                indeterminate={isParentIndeterminate}
                color="secondary"
                onChange={handleToggleAll}
              />
            }
          />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          {/* Individual Parts of form */}
          {sortedFields?.map((item) => {
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
                    color="secondary"
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
        </>
      );
    case 'radio':
      // TODO - NOT FULLY IMPLEMENTED
      return (
        <RadioGroup defaultValue={default_value?.[0]} name={groupID}>
          {sortedFields.map((item) => {
            const { title, id } = item;
            return (
              <>
                <FormControlLabel
                  value={id}
                  control={<Radio color="secondary" name={id} value={id} />}
                  label={title}
                  key={id}
                />
              </>
            );
          })}
        </RadioGroup>
      );
    default:
      return <></>;
  }
};
