import { FC } from 'react';
import { Box } from '@mui/material';

import { BasicContainerProps } from '../types';

const CardContainer: FC<BasicContainerProps> = ({ id, children }) => {
  return (
    <Box
      id={id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        margin: 2,
        borderRadius: 1,
        background: '#ffffff',
        padding: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default CardContainer;
