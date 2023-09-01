import { useState } from 'react';
import { Stack } from '@mui/system';

import { ActionInput, SimpleImagePicker, OutlinedTextField, GroupLabel } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { FullHeightFloatingTextProps } from '../../types';

const FullHeightFloatingTextToolbar = (props: FullHeightFloatingTextProps) => {
  const {
    __ui_id__: id,
    data: { image, title, description, action },
    onPropChange,
  } = props;

  const { handleTitleChange, handleDescChange, handleActionChange, updateComponentProp } = useToolbarChange();
  const [actionType, setActionType] = useState<string>(action?.type);

  return (
    <ToolContainer id={id}>
      <Stack spacing={2}>
        <SimpleImagePicker
          value={image}
          onChange={(value) => updateComponentProp('image', value)}
          onReplace={onPropChange}
        />
        <OutlinedTextField label={'Image alt text'} onChange={(e) => updateComponentProp('image', e.target.value)} />
        <GroupLabel label={'Text'} />
        <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
        <OutlinedTextField label={'Description'} value={description} onChange={handleDescChange} />
        <ActionInput action={action} handleActionChange={handleActionChange} />
      </Stack>
    </ToolContainer>
  );
};
export default FullHeightFloatingTextToolbar;
