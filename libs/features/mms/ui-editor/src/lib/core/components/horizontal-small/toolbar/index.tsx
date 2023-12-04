import React from 'react';
import { TextField } from '@mui/material';

import { SimpleImagePicker, ToolbarLabel } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HorizontalSmallComponentProps } from '../../types';
const HorizontalSmallToolbar = (props: HorizontalSmallComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, file, action },
    onPropChange,
  } = props;
  const { updateComponentProp, handleTitleChange } = useToolbarChange();
  const handleFileChange = (value: string) => {
    updateComponentProp('file', value);
  };

  return (
    <ToolContainer id={id} aria-label={'HorizontalSmall Toolbar'}>
      <ToolbarLabel label={'HorizontalSmall'} />
      <TextField label={'Title'} value={title} onChange={handleTitleChange} />
      <SimpleImagePicker value={file} onChange={handleFileChange} onReplace={onPropChange} />
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolContainer>
  );
};

export default HorizontalSmallToolbar;
