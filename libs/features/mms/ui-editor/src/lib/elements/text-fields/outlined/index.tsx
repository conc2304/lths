import { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const OutlinedTextField: FC<TextFieldProps> = ({ label, ...rest }) => (
  <TextField id="outlined-basic" label={label} variant="outlined" multiline fullWidth {...rest} />
);
export default OutlinedTextField;
