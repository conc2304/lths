import { FC } from 'react';
import { Box, TextField, TextFieldProps, Typography } from '@mui/material';

const StandardTextField: FC<TextFieldProps> = ({ label, ...rest }) => (
  <Box>
    <Typography sx={{ fontSize: 12, marginBottom: 1 }} textTransform={'uppercase'}>
      {label}
    </Typography>
    <TextField size="small" fullWidth {...rest} />
  </Box>
);
export default StandardTextField;
