import { TextField, TextFieldProps } from '@mui/material';

const OutlinedTextField = ({ label, ...rest }: TextFieldProps) => (
  <TextField label={label} variant="outlined" fullWidth {...rest} />
);
export default OutlinedTextField;
