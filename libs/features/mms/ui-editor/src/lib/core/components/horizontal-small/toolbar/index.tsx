import React from 'react';

import { SimpleImagePicker, ToolbarLabel, OutlinedTextField } from '../../../../elements';
import { ToolPreviewContainer, ActionToolbar } from '../../common';
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
    <ToolPreviewContainer onPropChange={onPropChange} id={id} aria-label={'HorizontalSmall Toolbar'}>
      <ToolbarLabel label={'HorizontalSmall'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <SimpleImagePicker value={file} onChange={handleFileChange} onReplace={onPropChange} />
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolPreviewContainer>
  );
};

export default HorizontalSmallToolbar;
