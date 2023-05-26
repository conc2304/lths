import { FC } from 'react';
import { Box, Stack, TextField, TextFieldProps } from '@mui/material';

import ColorPickerPopup from '../../color-picker-popup';
import { BasicLabel } from '../../labels';

export type ColorTextFieldProps = TextFieldProps & {
  colorValue: string;
  onColorChange: (color: string) => void;
}

const ColorTextField: FC<ColorTextFieldProps> = ({ colorValue, onColorChange, label, ...rest }) => (
  <Box>
    <BasicLabel label={label} />
    <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    spacing={1}
    >
      <TextField size="small" fullWidth {...rest} />
      < ColorPickerPopup value={colorValue} onChange={onColorChange} />
    </Stack>
  </Box>
);
export default ColorTextField;
