import { ChangeEvent } from 'react';
import { Box, MenuItem, Stack, TextField, Typography } from '@mui/material';

import { BasicTextField, ColorPicker } from '../../../../../elements';
import { BasicContainer } from '../../../../../elements/containers';
import { useToolbarChange } from '../../../hooks';
import { DescriptionComponentProps } from '../../../types';

const DescriptionToolbar = (props: DescriptionComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, color, style },
  } = props;
  const { handleTitleChange, handleColorChange, updateComponentProp } = useToolbarChange();

  const handleStyleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('style', event.target.value);
  };
  return (
    <BasicContainer id={id}>
      <Stack spacing={2}>
        <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
        <TextField value={style} onChange={handleStyleChange} label="style" select fullWidth>
          <MenuItem value={'medium'}>medium</MenuItem>
          <MenuItem value={'light'}>Light</MenuItem>
          <MenuItem value={'bold'}>Bold</MenuItem>
          <MenuItem value={'700'}>700</MenuItem>
          <MenuItem value={'800'}>800</MenuItem>
        </TextField>
        <Box>
          <Typography>Color</Typography>
          <ColorPicker label="Color" value={color} onChange={handleColorChange} />
        </Box>
      </Stack>
    </BasicContainer>
  );
};
export default DescriptionToolbar;
