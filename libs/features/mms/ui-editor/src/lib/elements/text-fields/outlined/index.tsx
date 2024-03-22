import { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const OutlinedTextField: FC<TextFieldProps> = ({ label, sx, ...rest }) => (
  <TextField id="outlined-basic" label={label} variant="outlined" multiline fullWidth {...rest} 
    size="small"
    sx={{ 
      '& .MuiInputBase-root': { paddingX: 1.5, ...(sx?.['& MuiInputBase-root'])},
      ...sx
    }}
  
  />
);
export default OutlinedTextField;
