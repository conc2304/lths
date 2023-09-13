import { Grid } from '@mui/material';

import { AddGroupItems, AddItem, ClearGroup, FormSchema, FormState, RemoveItem } from '../../ui-filters';
import { formatWithSeq, groupItemsBySeq, sortBySeq } from '../filter-form/utils';
import { VerticalFormGroup } from '../vertical-form-group';

type FormProps = {
  isLoading?: boolean;
  formSchema?: FormSchema[];
  formState?: FormState;
  onAddItem: AddItem;
  onRemoveItem: RemoveItem;
  onClearGroup: ClearGroup;
  onAddGroupItems: AddGroupItems;
};

export const Form = (props: FormProps) => {
  const {
    isLoading = false,
    formSchema,
    formState = {},
    onAddItem,
    onRemoveItem,
    onClearGroup,
    onAddGroupItems,
  } = props;

  if (isLoading || !formSchema || !Object.keys(formSchema).length) {
    return (
      <div data-testid="form-builder">
        <Grid
          className="Form--root"
          container
          columnGap={{ xs: 6, md: 11 }}
          columns={{ xs: 4, sm: 4, md: 4 }}
          direction="row"
          justifyContent="space-between"
          alignItems="top"
        >
          {[1, 2, 3].map((colPos) => {
            return (
              // columns
              <Grid item key={`${colPos}--colItem`} className="FormColumn--root" data-testid={`form-column-${colPos}`}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  className="FormColumnRowContainer--root"
                >
                  <Grid item className="FormRow--root" data-testid="vertical-form-group">
                    <VerticalFormGroup
                      isLoading={isLoading}
                      onAddItem={onAddItem}
                      onRemoveItem={onRemoveItem}
                      onClearGroup={onClearGroup}
                      onAddGroupItems={onAddGroupItems}
                    />
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }

  const formattedData = formatWithSeq([...formSchema]);
  const sortedData = sortBySeq([...formattedData]);
  const groupedData = groupItemsBySeq([...sortedData]);
  const renderingData = groupedData;

  return (
    <div data-testid="form-builder">
      <Grid
        className="Form--root"
        container
        columnGap={{ xs: 6, md: 11 }}
        columns={{ xs: 4, sm: 4, md: 4 }}
        direction="row"
        justifyContent="space-between"
        alignItems="top"
      >
        {Object.keys(renderingData).map((colPos) => {
          const columnData = renderingData[colPos];

          return (
            // columns
            <Grid item key={`${colPos}--colItem`} className="FormColumn--root" data-testid="form-column">
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                className="FormColumnRowContainer--root"
              >
                {columnData.map((formGroupSchema) => {
                  // rows
                  return (
                    <Grid
                      item
                      key={`${formGroupSchema.id}--rowItem`}
                      className="FormRow--root"
                      data-testid="vertical-form-group"
                    >
                      <VerticalFormGroup
                        formSchema={formGroupSchema}
                        formState={formState}
                        onAddItem={onAddItem}
                        onRemoveItem={onRemoveItem}
                        onClearGroup={onClearGroup}
                        onAddGroupItems={onAddGroupItems}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
