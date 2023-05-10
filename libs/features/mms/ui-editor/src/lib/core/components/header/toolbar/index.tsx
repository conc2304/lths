import React from 'react';
import { Box } from '@mui/material';

import { useEditorActions } from '../../../../context';
import { StandardTextField } from '../../../../elements';
import ColorPicker from '../../../../elements/color-picker';
import { HeaderComponentProps } from '../../types';

const HeaderToolbar: React.FC<HeaderComponentProps> = (props) => {
  const {
    __ui_id__: id,
    default_data: { color = '#000000', title },
  } = props;

  const { selectComponent } = useEditorActions();
  const updateComponenetProp = (key, value) => {
    const data = { ...props, default_data: { ...props.default_data, [key]: value } };
    selectComponent(data);
    //onChange({ text: event.target.value });
  };

  const handleTitleChange = (event) => {
    updateComponenetProp('title', event.target.value);
  };
  const handleColorChange = (color: string) => {
    updateComponenetProp('color', color);
  };

  return (
    <Box
      id={`${id}_toolbar`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        margin: 2,
        borderRadius: 1,
        background: '#ffffff',
        padding: 2,
      }}
    >
      <StandardTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <ColorPicker initialColor={color} onChange={handleColorChange} />
    </Box>
  );
};
export default HeaderToolbar;
