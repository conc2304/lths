import { useState } from 'react';
import { Button, Stack } from '@mui/material';

import { ToolbarProps } from '../../../../context';
import { ToolbarLabel, OutlinedTextField, GroupLabel, SimpleImagePicker, ActionInput } from '../../../../elements';
import { HalfWidthCarouselFloatingTextProps } from '../../types';
//TODO: Fix lint, create onChange wrapper function, chane event props to start with 'on'
type CarouselItemProps = ToolbarProps & {
  item: HalfWidthCarouselFloatingTextProps;
  handleCloseItem: () => void;
  handleUpdateItem: (newComponent: HalfWidthCarouselFloatingTextProps) => void;
};

const CarouselItemEditor: React.FC<CarouselItemProps> = ({ item, onPropChange, handleCloseItem, handleUpdateItem }) => {
  const [localItem, setLocalItem] = useState<HalfWidthCarouselFloatingTextProps>({ ...item });
  const { name, image, img_alt_text, title, action } = localItem;

  const handleFieldChange = (fieldName: string, value: string) => {
    setLocalItem((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleActionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: string,
    index?: number
  ) => {
    setLocalItem((prevData) => ({
      ...prevData,
      action: { ...prevData?.action, [key]: event.target.value },
    }));
  };

  return (
    <>
      <ToolbarLabel label={'Carousel Item'} />

      <OutlinedTextField label={'Name'} value={name} onChange={(e) => handleFieldChange('name', e.target.value)} />

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
