import React from 'react';
import { Box, Typography } from '@mui/material';

import { CenterBodyTextBlockProps } from '../../types';

const CenterBodyTextBlock = (props: CenterBodyTextBlockProps) => {
  const {
    __ui_id__: id,
    data: { title },
  } = props;
  return (
    <Box id={id} sx={{ backgroundColor: 'black', p: 2 }}>
      <Typography
        sx={{ fontSize: '1rem', color: '#ABABAC', fontWeight: '400', lineHeight: '24px', textAlign: 'center' }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default CenterBodyTextBlock;
