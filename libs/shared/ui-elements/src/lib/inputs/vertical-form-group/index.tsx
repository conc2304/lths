import { Box, FormGroup, Skeleton, Typography, styled } from '@mui/material';

import { InfoTooltip } from '../../data-display';
import { AddGroupItems, AddItem, ClearGroup, FormSchema, FormState, RemoveItem } from '../../ui-filters/types';
import { FormChildren } from '../form-children';

type VerticalFormGroupProps = {
  isLoading?: boolean;
  formSchema?: FormSchema;
  formState?: FormState;
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
  const { isLoading, formSchema, formState } = props;
  const { onAddItem, onRemoveItem, onClearGroup, onAddGroupItems } = props;

  if (isLoading || !formSchema || Object.keys(formSchema).length === 0 || !formState) {
    return (
      <div className="VerticalFormGroup-root">
        <div className="VerticalFormGroup--title">
          <Box>
            <Title variant="h4">{<Skeleton variant="text" width={150} />}</Title>
          </Box>
        </div>
        <FormGroup sx={{ my: 2 }}>
          <FormChildren
            orientation="vertical"
            isLoading={isLoading}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            onClearGroup={onClearGroup}
            onAddGroupItems={onAddGroupItems}
          />
        </FormGroup>
      </div>
    );
  }

  const { title, subtitle, info, data, id: groupID } = formSchema;

  const isNewFormGroup = null && data && data.length > 1;
  const formGroupData = isNewFormGroup ? formSchema : data ? data[0] : null;
  return (
    <div className="VerticalFormGroup-root">
      <div className="VerticalFormGroup--title">
        <Box display="flex" alignItems={'center'} justifyContent={'start'}>
          <Title variant="h4">{title || ''}</Title>
          {info?.description && (
            <Box display={'flex'} alignItems={'start'}>
              <InfoTooltip
                description={info.description}
                title={title || ''}
                action={{ url: info.url, title: 'Learn More' }}
              />
            </Box>
          )}
        </Box>

        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>
      {formGroupData && (
        <FormGroup sx={{ my: 2 }}>
          <FormChildren
            orientation="vertical"
            isLoading={isLoading}
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
