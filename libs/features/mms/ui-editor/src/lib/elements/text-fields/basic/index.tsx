import { FC } from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';

import { BasicLabel } from '../../labels';

const BasicTextField: FC<TextFieldProps> = ({ label, ...rest }) => (
  <Box>
    <BasicLabel label={label} />
    <TextField size="small" fullWidth {...rest} />
  </Box>
);
export default BasicTextField;
