import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';

import { ToolContainer, OutlinedTextField, GroupLabel } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { FullWidthButtonComponentProps } from '../../types';
const FullWidthButtonToolbar = (props: FullWidthButtonComponentProps) => {
  const {
    __ui_id__: id,
    data: { btn_text, action, btn_style },
    onPropChange,
  } = props;

  const { updateComponentProp } = useToolbarChange();
  const handleStyleChange = (event: SelectChangeEvent) => {
    updateComponentProp('btn_style', event.target.value);
  };
  return (
    <ToolContainer id={id}>
      <Stack spacing={2}>
        <GroupLabel label={'Full Width Button'} />
        <GroupLabel label={btn_text} />
        <OutlinedTextField
          label={'Label'}
          value={btn_text}
          onChange={(event) => updateComponentProp('btn_text', event.target.value)}
        />
        <GroupLabel label="Style" />
        <FormControl fullWidth>
          <InputLabel sx={{ color: 'gray' }}>Style</InputLabel>
          <Select value={btn_style} onChange={handleStyleChange} label="Style">
            <MenuItem value="PrimaryFill">Primary Fill</MenuItem>
            <MenuItem value="SecondaryOutline">Secondary Outline</MenuItem>
            <MenuItem value="BrandFill">Brand Fill</MenuItem>
          </Select>
        </FormControl>
        <ActionToolbar action={action} onPropChange={onPropChange} />
      </Stack>
    </ToolContainer>
  );
};
export default FullWidthButtonToolbar;
