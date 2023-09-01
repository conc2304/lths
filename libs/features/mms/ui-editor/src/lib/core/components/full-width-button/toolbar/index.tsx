import { Stack } from '@mui/material';

import { ToolContainer, BasicTextField } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { FullWidthButtonComponentProps } from '../../types';

const FullWidthButtonToolbar = (props: FullWidthButtonComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { label, action },
    onPropChange,
  } = props;
  console.log(props);

  const { updateComponentProp } = useToolbarChange();

  return (
    <ToolContainer id={id}>
      <Stack spacing={2}>
        <BasicTextField
          label={'Label'}
          value={label}
          onChange={(event) => updateComponentProp('label', event.target.value)}
        />
        <ActionToolbar action={action} onPropChange={onPropChange} />
      </Stack>
    </ToolContainer>
  );
};

export default FullWidthButtonToolbar;
