import React from 'react';
import { Box, Typography } from '@mui/material';

import { HeaderComponentProps } from '../../types';

const CardComponent: React.FC<HeaderComponentProps> = (props) => {
  const {
    __ui_id__: id,
    default_data: { color = '#000000', title },
  } = props;

  return (
    <Box id={`${id}_component`}>
      <Typography sx={{ paddingBottom: 0.5, fontSize: 24, fontWeight: 600, color, wordWrap: 'break-word' }}>
        {title}
      </Typography>
    </Box>
  );
};
export default CardComponent;
