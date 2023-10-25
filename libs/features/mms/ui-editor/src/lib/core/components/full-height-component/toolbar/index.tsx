import { ChangeEvent } from 'react';
import { Stack } from '@mui/system';

import { SimpleImagePicker, OutlinedTextField, GroupLabel } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { ActionToolbar } from '../../common';
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
    <ToolContainer id={id}>
      <Stack spacing={2}>
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
      </Stack>
    </ToolContainer>
  );
};
export default FullHeightFloatingTextToolbar;
