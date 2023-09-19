import React from 'react';
import { Box, Typography } from '@mui/material';

import { CenterHeadlineTextProps } from '../../types';

const CenterHeadlineText = (props: CenterHeadlineTextProps) => {
  const {
    __ui_id__: id,
    data: { title },
  } = props;
  console.log('eee', props);
  return (
    <Box id={id} sx={{ backgroundColor: 'black', p: 2 }}>
      <Typography sx={{ fontSize: '1.5rem', color: 'white' }} variant="h4">
        {title}
      </Typography>
    </Box>
  );
};

export default CenterHeadlineText;
