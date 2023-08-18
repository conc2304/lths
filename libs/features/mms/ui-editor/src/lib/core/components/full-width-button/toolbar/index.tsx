import { Stack } from '@mui/material';

import { ToolContainer, BasicTextField, ActionInput } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { FullWidthButtonComponentProps } from '../../types';

const FullWidthButtonToolbar = (props: FullWidthButtonComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { label, action },
  } = props;
  console.log(props);

  const { updateComponentProp, handleActionChange } = useToolbarChange();

  return (
    <ToolContainer id={id}>
      <Stack spacing={2}>
        <BasicTextField
          label={'Label'}
          value={label}
          onChange={(event) => updateComponentProp('label', event.target.value)}
        />
        <ActionInput action={action} handleActionChange={handleActionChange} />
      </Stack>
    </ToolContainer>
  );
};

export default FullWidthButtonToolbar;
