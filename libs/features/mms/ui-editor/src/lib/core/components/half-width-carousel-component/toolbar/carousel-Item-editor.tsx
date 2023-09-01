import React, { ChangeEvent } from 'react';
import { Button, Stack } from '@mui/material';

import { ToolbarProps } from '../../../../context';
import { ToolbarLabel, OutlinedTextField, GroupLabel, SimpleImagePicker } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HalfWidthCarouselProps } from '../../types';

type CarouselItemProps = ToolbarProps & {
  item: HalfWidthCarouselProps;
  onClose: () => void;
  index?: number;
};

const CarouselItemEditor: React.FC<CarouselItemProps> = ({
  item,
  onPropChange,
  onClose,

  index,
}) => {
  const { image, image_alt_text, title, description, action } = item;
  const parentKeys = ['sub_properties_data'];
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
      <OutlinedTextField label={'Image alt-text'} value={image_alt_text} onChange={_handleImageAltChange} />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={_handleTitleChange} />
      <OutlinedTextField label={'Description'} value={description} onChange={_handleDescriptionChange} />
      <ActionToolbar action={action} keys={parentKeys} onPropChange={onPropChange} index={index} />
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="outlined" onClick={onClose} sx={{ padding: '8px 22px', fontSize: 15 }}>
          BACK
        </Button>
      </Stack>
    </>
  );
};

export default CarouselItemEditor;
