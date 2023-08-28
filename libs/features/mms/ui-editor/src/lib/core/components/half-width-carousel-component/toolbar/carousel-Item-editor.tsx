import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';

import { ToolbarProps } from '../../../../context';
import { ToolbarLabel, OutlinedTextField, GroupLabel, SimpleImagePicker, ActionInput } from '../../../../elements';
import { HalfWidthCarouselProps } from '../../types';

//TODO: Fix lint, create onChange wrapper function, change event prop names to start with 'on'
type CarouselItemProps = ToolbarProps & {
  item: HalfWidthCarouselProps;
  handleCloseItem: () => void;
  handleUpdateItem: (newComponent: HalfWidthCarouselProps) => void;
};

const CarouselItemEditor: React.FC<CarouselItemProps> = ({ item, onPropChange, handleCloseItem, handleUpdateItem }) => {
  const [localItem, setLocalItem] = useState<HalfWidthCarouselProps>({ ...item });
  const { image, image_alt_text, title, description, action } = localItem;

  const handleFieldChange = (fieldName: string, value: string) => {
    setLocalItem((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleActionChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, key: string) => {
    setLocalItem((prevData) => ({
      ...prevData,
      action: { ...prevData?.action, [key]: event.target.value },
    }));
  };

  return (
    <>
      <ToolbarLabel label={'Carousel Item'} />
      <SimpleImagePicker
        value={image}
        onChange={(value) => handleFieldChange('image', value)}
        onReplace={onPropChange}
      />
      <OutlinedTextField
        label={'Image alt-text'}
        value={image_alt_text}
        onChange={(e) => handleFieldChange('image_alt_text', e.target.value)}
      />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={(e) => handleFieldChange('title', e.target.value)} />
      <OutlinedTextField
        label={'Description'}
        value={description}
        onChange={(e) => handleFieldChange('description', e.target.value)}
      />
      <GroupLabel label={'Action'} />
      <ActionInput action={action} handleActionChange={handleActionChange} />
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="outlined" onClick={handleCloseItem} sx={{ padding: '8px 22px', fontSize: 15 }}>
          CANCEL
        </Button>
        <Button
          variant="contained"
          onClick={() => handleUpdateItem(localItem)}
          sx={{ padding: '8px 22px', fontSize: 15 }}
        >
          UPDATE
        </Button>
      </Stack>
    </>
  );
};

export default CarouselItemEditor;
