import { FC } from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';

import { StandardLabel } from '../../labels';

const StandardTextField: FC<TextFieldProps> = ({ label, ...rest }) => (
  <Box>
    <StandardLabel label={label} />
    <TextField size="small" fullWidth {...rest} />
  </Box>
);
export default StandardTextField;
