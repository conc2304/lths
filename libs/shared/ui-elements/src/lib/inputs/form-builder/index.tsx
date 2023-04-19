import { Grid } from '@mui/material';
import { FormSchema } from '@lths/shared/ui-filters';

import { formatWithSeq, groupItemsBySeq, sortBySeq } from '../filter-form/utils';
import { VerticalFormGroup } from '../vertical-form-group';

type FormProps = {
  formSchema: FormSchema[];
};

export const Form = (props: FormProps) => {
  const { formSchema = [] } = props;

  const formattedData = formatWithSeq([...formSchema]);
  const sortedData = sortBySeq([...formattedData]);
  const groupedData = groupItemsBySeq([...sortedData]);
  const renderingData = groupedData;

  return (
    <div>
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
            <Grid item key={`${colPos}--colItem`} className="FormColumn--root">
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
                    <Grid item key={`${formGroupSchema.id}--rowItem`} className="FormRow--root">
                      <VerticalFormGroup formSchema={formGroupSchema} />
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
