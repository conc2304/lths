import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';

import { ToolbarProps } from '../../../../context';
import { ToolbarLabel, OutlinedTextField, GroupLabel, SimpleImagePicker } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { FullHeightCarouselProps } from '../../types';

type CarouselItemProps = ToolbarProps & {
  item: FullHeightCarouselProps;
  handleCloseItem: () => void;
  handleUpdateItem: (newComponent: FullHeightCarouselProps) => void;
};

//TODO: Fix lint, create onChange wrapper function, chane event props to start with 'on'

const CarouselItemEditor: React.FC<CarouselItemProps> = ({ item, onPropChange, handleCloseItem, handleUpdateItem }) => {
  const [localItem, setLocalItem] = useState<FullHeightCarouselProps>({ ...item });
  const { image, img_alt_text, title, description, action } = localItem;

  const handleFieldChange = (fieldName: string, value: string) => {
    setLocalItem((prevData) => ({
      ...prevData,
      [fieldName]: value,
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
        value={img_alt_text}
        onChange={(e) => handleFieldChange('img_alt_text', e.target.value)}
      />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={(e) => handleFieldChange('title', e.target.value)} />
      <OutlinedTextField
        label={'Description'}
        value={description}
        onChange={(e) => handleFieldChange('description', e.target.value)}
      />
      <ActionToolbar action={action} onPropChange={onPropChange} />

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
