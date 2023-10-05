import React, { ChangeEvent } from 'react';
import { Button, Stack } from '@mui/material';

import { ToolbarProps } from '../../../../context';
import { OutlinedTextField, GroupLabel, SimpleImagePicker, EditableListItemTextWithClose } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HalfWidthCarouselFloatingTextProps } from '../../types';

//TODO: Fix lint, create onChange wrapper function, chane event props to start with 'on'
type CarouselItemProps = ToolbarProps & {
  item: HalfWidthCarouselFloatingTextProps;
  onClose: () => void;
  index?: number;
};

const CarouselItemEditor: React.FC<CarouselItemProps> = ({ item, onPropChange, onClose, index }) => {
  const { name, image = '', img_alt_text = '', title = '', action = {type: 'webview', page_id: '', page_link: '' } } = item || {};
  const parentKeys = ['sub_component_data'];
  const { handleTitleChange, handleImageChange, handleImageAltChange, handleNameValueChange } = useToolbarChange();

  const _handleNameChange = (value: string) => {
    if(index < 0) return;
    handleNameValueChange(value, index, parentKeys);
  };

  const _handleTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(index < 0) return;
    handleTitleChange(e, index, parentKeys);
  };

  const _handleImageChange = (value: string) => {
    if(index < 0) return;
    handleImageChange(value, index, parentKeys);
  };

  const _handleImageAltChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(index < 0) return;
    handleImageAltChange(e, index, parentKeys);
  };

  return (
    <>
      <EditableListItemTextWithClose text={name || 'Carousel Item'} onSave={_handleNameChange} onClose={onClose} />
      <SimpleImagePicker value={image} onChange={_handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={_handleImageAltChange} />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={_handleTitleChange} />
      <ActionToolbar action={action} onPropChange={onPropChange} keys={parentKeys} index={index} />
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="outlined" onClick={onClose} sx={{ padding: '8px 22px', fontSize: 15 }}>
          BACK
        </Button>
      </Stack>
    </>
  );
};

export default CarouselItemEditor;
