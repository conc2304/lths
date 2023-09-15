import React, { ChangeEvent } from 'react';
import { Button, Stack } from '@mui/material';

import { ToolbarProps } from '../../../../context';
import { ToolbarLabel, OutlinedTextField, GroupLabel, SimpleImagePicker } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { FullHeightCarouselProps } from '../../types';

type CarouselItemProps = ToolbarProps & {
  item: FullHeightCarouselProps;
  handleCloseItem: () => void;
  index?: number;
};

//TODO: Fix lint, create onChange wrapper function, chane event props to start with 'on'

const CarouselItemEditor: React.FC<CarouselItemProps> = ({ item, onPropChange, handleCloseItem, index }) => {
  const { image, img_alt_text, title, description, action } = item;
  const parentKeys = ['sub_component_data'];
  const { handleTitleChange, handleImageChange, handleImageAltChange, handleDescriptionChange } = useToolbarChange();

  const _handleTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleTitleChange(e, index, parentKeys);
  };
  const _handleImageChange = (value: string) => {
    handleImageChange(value, index, parentKeys);
  };

  const _handleImageAltChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleImageAltChange(e, index, parentKeys);
  };
  const _handleDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleDescriptionChange(e, index, parentKeys);
  };

  return (
    <>
      <ToolbarLabel label={'Carousel Item'} />
      <SimpleImagePicker value={image} onChange={_handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={_handleImageAltChange} />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={_handleTitleChange} />
      <OutlinedTextField label={'Description'} value={description} onChange={_handleDescriptionChange} />
      <ActionToolbar action={action} keys={parentKeys} onPropChange={onPropChange} index={index} />

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="outlined" onClick={handleCloseItem} sx={{ padding: '8px 22px', fontSize: 15 }}>
          BACK
        </Button>
      </Stack>
    </>
  );
};

export default CarouselItemEditor;
