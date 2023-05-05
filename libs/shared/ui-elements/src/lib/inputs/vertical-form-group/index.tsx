import { FormGroup, Typography, styled } from '@mui/material';
import {
  AddGroupItems,
  AddItem,
  ClearGroup,
  FormSchema,
  FormState,
  FormStateValue,
  RemoveItem,
} from '@lths/types/ui-filters';
import { FormChildren } from 'libs/shared/ui-elements/src/lib/inputs/form-children';

type VerticalFormGroupProps = {
  formSchema: FormSchema;
  formState: FormState;
  onAddItem: AddItem;
  onRemoveItem: RemoveItem;
  onClearGroup: ClearGroup;
  onAddGroupItems: AddGroupItems;
};

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 400,
  lineHeight: '2.625rem',
  marginRight: theme.spacing(1.5),
  letterSpacing: '0.15px',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  fontSize: '0.75rem',
  fontWeight: 400,
  lineHeight: '2.625rem',
  letterSpacing: '0.15px',
  marginBottom: theme.spacing(2.75),
}));

export const VerticalFormGroup = (props: VerticalFormGroupProps) => {
  const { formSchema, onAddItem, onRemoveItem, onClearGroup, onAddGroupItems, formState } = props;
  const { title, subtitle, info, data, id: groupID } = formSchema;

  const isNewFormGroup = null && data && data.length > 1;
  const formGroupData = isNewFormGroup ? formSchema : data ? data[0] : null;

  return (
    <div className="VerticalFormGroup-root">
      <div className="VerticalFormGroup--title">
        <Title variant="h4">{title || ''}</Title>

        {/* TODO - INFO popover to go here once its available */}
        {/*  {info?.description && <InfoPopUp description={info.description} url={info.url} />} */}

        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>
      {formGroupData && (
        <FormGroup sx={{ my: 2 }}>
          <FormChildren
            formState={formState}
            formSchema={formGroupData}
            groupTitle={title as string}
            groupID={groupID as string}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            onClearGroup={onClearGroup}
            onAddGroupItems={onAddGroupItems}
          />
        </FormGroup>
      )}
    </div>
  );
};
