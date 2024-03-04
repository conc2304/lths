import { ChangeEvent } from 'react';
import { MenuItem } from '@mui/material';

import { ToolContainer, OutlinedTextField, GroupLabel, ToolbarLabel } from '../../../../elements';
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
  const handleStyleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('btn_style', event.target.value);
  };
  return (
    <ToolContainer id={id}>
      <ToolbarLabel label={'Full Width Button'} />
      <OutlinedTextField
        label={'Label'}
        value={btn_text}
        onChange={(event) => updateComponentProp('btn_text', event.target.value)}
      />
      <GroupLabel label="Style" />
      <OutlinedTextField value={btn_style} onChange={handleStyleChange} label="Style" select>
        <MenuItem value="PrimaryFill">Primary Fill</MenuItem>
        <MenuItem value="SecondaryOutline">Secondary Outline</MenuItem>
        <MenuItem value="BrandFill">Brand Fill</MenuItem>
      </OutlinedTextField>
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolContainer>
  );
};
export default FullWidthButtonToolbar;
