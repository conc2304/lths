import { ChangeEvent } from 'react';
import { Box, Divider } from '@mui/material';

import { BasicTextField, ToolContainer, ImagePicker } from '../../../../elements';
import { QuickLinkListToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HeroComponentProps } from '../../types';

const ToolbarComponent = (props: HeroComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, title, link_title, component_data = [] },
  } = props;

  const { handleTitleChange, handleLinkTitleChange, handleImageChange, updateComponentProp } = useToolbarChange();
  const handleActionChange = (event: ChangeEvent<HTMLInputElement>, index: number, key: string) => {
    updateComponentProp(key, event.target.value, index);
  };

  return (
    <ToolContainer id={id}>
      <ImagePicker value={image} onChange={handleImageChange} />
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <Divider />
      <BasicTextField label={'Links Title'} value={link_title} onChange={handleLinkTitleChange} />
      <Box sx={{ gap: 0 }}>
        <QuickLinkListToolbar data={component_data} onChange={handleActionChange} />
      </Box>
    </ToolContainer>
  );
};
export default ToolbarComponent;
