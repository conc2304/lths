import React from 'react';
import { Button, Stack } from '@mui/material';

import { ToolbarProps } from '../../../../context';
import { ToolbarLabel, SimpleImagePicker } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { CardViewCarouselProps } from '../../types';

type CarouselItemProps = ToolbarProps & {
  item: CardViewCarouselProps;
  onClose: () => void;
  index?: number;
};

const CarouselItemEditor: React.FC<CarouselItemProps> = ({
  item,
  onPropChange,
  onClose,

  index,
}) => {
  const { image, action } = item;
  const parentKeys = ['sub_component_data'];
  const { handleImageChange } = useToolbarChange();

  const _handleImageChange = (value: string) => {
    handleImageChange(value, index, parentKeys);
  };

  return (
    <>
      <ToolbarLabel label={'Carousel Item'} />
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
