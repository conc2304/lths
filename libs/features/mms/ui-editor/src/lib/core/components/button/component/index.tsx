import React from 'react';
import { Box, Button } from '@mui/material';

import { ButtonComponentProps, ButtonStyle } from '../../types';

const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {
  const {
    __ui_id__: id,
    default_data: { title, style },
  } = props;
  const variant = style === ButtonStyle.Fill ? 'contained' : 'outlined';
  return (
    <Box id={`${id}_component`}>
      <Button variant={variant}>{title}</Button>
    </Box>
  );
};
export default ButtonComponent;
