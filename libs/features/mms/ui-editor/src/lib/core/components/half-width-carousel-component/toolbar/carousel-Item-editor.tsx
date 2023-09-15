import React, { ChangeEvent } from 'react';
import { Button, Stack, IconButton } from '@mui/material';
import {ChevronLeft, ChevronRight} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { ToolbarProps } from '../../../../context';
import { ToolbarLabel, OutlinedTextField, GroupLabel, SimpleImagePicker } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HalfWidthCarouselProps } from '../../types';

type CarouselItemProps = ToolbarProps & {
  item?: HalfWidthCarouselProps;
  onClose: () => void;
  index?: number;
};

const CarouselItemEditor: React.FC<CarouselItemProps> = ({
  item,
  onPropChange,
  onClose,
  index,
}) => {
  const { image = '', image_alt_text = '', title = '', description = '', action = {type: 'webview', page_id: '', page_link: '' } } = item || {};
  const parentKeys = ['sub_component_data'];
  const { handleTitleChange, handleImageChange, handleImageAltChange, handleDescriptionChange } = useToolbarChange();
  const theme = useTheme();

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

  const _handleDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(index < 0) return;
    handleDescriptionChange(e, index, parentKeys);
  };

  return (
    <>
      <div style={{ position: 'relative' }} >
        <ToolbarLabel label={'Carousel Item'} />
        <IconButton aria-label="Close Carousel Item" 
          onClick={onClose}
          style={{ position: 'absolute', top: '50%', right: '0', transform: 'translate(0, -50%)' }}
        >
          {theme.direction === 'rtl' ? <ChevronLeft sx={{ fontSize: theme.spacing(4) }}/> : <ChevronRight sx={{ fontSize: theme.spacing(4) }}/>}
        </IconButton>
      </div>
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
