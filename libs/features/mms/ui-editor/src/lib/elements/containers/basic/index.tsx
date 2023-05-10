import { FC } from 'react';
import { Box } from '@mui/material';

import { MOBILE_GUTTER } from '../../../constants';
import { BasicContainerProps } from '../types';

const BasicContainer: FC<BasicContainerProps> = ({ id, children }) => {
  return (
    <Box id={id} sx={{ padding: MOBILE_GUTTER }}>
      {children}
    </Box>
  );
};
export default BasicContainer;
