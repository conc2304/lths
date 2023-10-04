import React from 'react';
import { Button, Stack } from '@mui/material';

import { ToolbarProps } from '../../../../context';
import { SimpleImagePicker, EditableListItemTextWithClose } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { CardViewCarouselProps } from '../../types';

type CarouselItemProps = ToolbarProps & {
  item: CardViewCarouselProps;
  onClose: () => void;
  index?: number;
};

const CarouselItemEditor: React.FC<CarouselItemProps> = ({ item, onPropChange, onClose, index }) => {
  const { name, image = '', action = { type: 'webview', page_id: '', page_link: '' } } = item || {};
  const parentKeys = ['sub_component_data'];
  const { handleImageChange, handleNameValueChange } = useToolbarChange();

  const _handleNameChange = (value: string) => {
    if(index < 0) return;
    handleNameValueChange(value, index, parentKeys);
  };

  const _handleImageChange = (value: string) => {
    if(index < 0) return;
    handleImageChange(value, index, parentKeys);
  };

  return (
    <>
      <EditableListItemTextWithClose text={name || 'Carousel Item'} onSave={_handleNameChange} onClose={onClose} />
      <SimpleImagePicker value={image} onChange={_handleImageChange} onReplace={onPropChange} />
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
