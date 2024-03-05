import React from 'react';

import { SimpleImagePicker, ToolbarLabel, OutlinedTextField  } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HorizontalMediumProps } from '../../types';
const HorizontalMediumToolbar = (props: HorizontalMediumProps) => {
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
    <ToolContainer id={id} aria-label={'HorizontalMedium Toolbar'}>
      <ToolbarLabel label={'HorizontalMedium'} />
      <OutlinedTextField  label={'Title'} value={title} onChange={handleTitleChange} />
      <SimpleImagePicker value={file} onChange={handleFileChange} onReplace={onPropChange} />
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolContainer>
  );
};

export default HorizontalMediumToolbar;
