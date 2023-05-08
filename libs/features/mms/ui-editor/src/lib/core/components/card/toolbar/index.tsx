import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';

import { useEditorActions } from '../../../../context';
import { StandardTextField } from '../../../../elements';
import { CardComponentProps } from '../../types';

const ToolbarComponent: React.FC<CardComponentProps> = (props) => {
  const {
    componentId,
    default_data: { image, title, desc },
    onChange,
  } = props;

  const { updateComponent, selectComponent } = useEditorActions();
  const updateComponenetProp = (key, value) => {
    const data = { ...props, default_data: { ...props.default_data, [key]: value } };
    selectComponent(data);
    //onChange({ text: event.target.value });
  };

  const handleTitleChange = (event) => {
    updateComponenetProp('title', event.target.value);
  };
  const handleDescChange = (event) => {
    updateComponenetProp('desc', event.target.value);
  };
  const handleImageChange = (event) => {
    // onChange({ teimageUrlxt: event.target.value });
  };

  return (
    <Box
      id={`${componentId}_toolbar`}
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
      <StandardTextField label={'Image URL'} value={image} onChange={handleImageChange} />
      <StandardTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <StandardTextField label={'Description'} value={desc} onChange={handleDescChange} />
    </Box>
  );
};
export default ToolbarComponent;
