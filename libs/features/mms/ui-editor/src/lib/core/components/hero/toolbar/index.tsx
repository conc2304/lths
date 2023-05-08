import React from 'react';
import { Box } from '@mui/material';

import { useEditorActions } from '../../../../context';
import { StandardTextField } from '../../../../elements';
import { HeroComponentProps } from '../../types';

const ToolbarComponent: React.FC<HeroComponentProps> = (props) => {
  const {
    componentId,
    default_data: { image, title, link_title, component_data = [] },
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
  const handleLinkTitleChange = (event) => {
    updateComponenetProp('link_title', event.target.value);
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
      <StandardTextField label={'Links Title'} value={link_title} onChange={handleLinkTitleChange} />
      {component_data.map((link, index) => {
        const { icon, title } = link;
        return (
          <Box>
            <StandardTextField label={'Icon URL'} value={icon} onChange={handleImageChange} />
            <StandardTextField label={'Link Title'} value={title} onChange={handleLinkTitleChange} />
          </Box>
        );
      })}
    </Box>
  );
};
export default ToolbarComponent;
