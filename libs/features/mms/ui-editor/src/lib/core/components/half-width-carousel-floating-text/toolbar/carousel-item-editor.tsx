import React, { ChangeEvent } from 'react';
import { Button, Stack } from '@mui/material';

import { ToolbarProps } from '../../../../context';
import { ToolbarLabel, OutlinedTextField, GroupLabel, SimpleImagePicker } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HalfWidthCarouselFloatingTextProps } from '../../types';
//TODO: Fix lint, create onChange wrapper function, chane event props to start with 'on'
type CarouselItemProps = ToolbarProps & {
  item: HalfWidthCarouselFloatingTextProps;
  handleCloseItem: () => void;
  index?: number;
};

const CarouselItemEditor: React.FC<CarouselItemProps> = ({ item, onPropChange, handleCloseItem, index }) => {
  const { image, img_alt_text, title, action } = item;
  const parentKeys = ['sub_properties_data'];
  const { handleTitleChange, handleImageChange, handleImageAltChange } = useToolbarChange();

  const _handleTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleTitleChange(e, index, parentKeys);
  };

  const _handleImageChange = (value: string) => {
    handleImageChange(value, index, parentKeys);
  };

  const _handleImageAltChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleImageAltChange(e, index, parentKeys);
  };

  return (
    <>
      <ToolbarLabel label={'Carousel Item'} />
      <SimpleImagePicker value={image} onChange={_handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={_handleImageAltChange} />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={_handleTitleChange} />
      <ActionToolbar action={action} onPropChange={onPropChange} keys={parentKeys} index={index} />
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="outlined" onClick={handleCloseItem} sx={{ padding: '8px 22px', fontSize: 15 }}>
          BACK
        </Button>
      </Stack>
    </>
  );
};

export default CarouselItemEditor;
