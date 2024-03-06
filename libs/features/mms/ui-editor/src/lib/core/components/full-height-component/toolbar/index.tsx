import { ChangeEvent } from 'react';

import { SimpleImagePicker, OutlinedTextField, GroupLabel } from '../../../../elements';
import { ToolPreviewContainer, ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { FullHeightFloatingTextProps } from '../../types';

const FullHeightFloatingTextToolbar = (props: FullHeightFloatingTextProps) => {
  const {
    __ui_id__: id,
    data: { image, title, description, action },
    onPropChange,
  } = props;

  const { handleTitleChange, updateComponentProp, handleImageAltChange } = useToolbarChange();
  const handleDescChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    updateComponentProp('description', event.target.value, index);
  };

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id}>
      <SimpleImagePicker
        value={image}
        onChange={(value) => updateComponentProp('image', value)}
        onReplace={onPropChange}
      />
      <OutlinedTextField label={'Image alt text'} onChange={handleImageAltChange} />
      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField label={'Description'} value={description} onChange={handleDescChange} />
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolPreviewContainer>
  );
};
export default FullHeightFloatingTextToolbar;
