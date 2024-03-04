import { ChangeEvent } from 'react';
import { MenuItem } from '@mui/material';

import { ToolbarLabel, OutlinedTextField, ToolContainer } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { TextButtonProps } from '../../types';
import { sizes } from '../utils';

const TextButtonToolbar = (props: TextButtonProps) => {
  const {
    __ui_id__: id,
    data: { btn_text, btn_text_size, action },
    onPropChange,
  } = props;
  const { updateComponentProp } = useToolbarChange();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('btn_text', event.target.value);
  };
  const handleStyleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('btn_text_size', event.target.value);
  };

  return (
    <ToolContainer id={id} aria-label="Text Button">
      <ToolbarLabel  label={'Text Link'} />
      <OutlinedTextField
        label={'Title'}
        value={btn_text}
        onChange={(e) => handleTitleChange(e)}
      />
      <OutlinedTextField
        value={btn_text_size}
        onChange={handleStyleChange}
        label="Text Size"
        select
      >
        {sizes.map((s) => (
          <MenuItem key={`option-${s.value}`} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </OutlinedTextField>
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolContainer>
  );
};
export default TextButtonToolbar;
