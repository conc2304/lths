import React from 'react';
import { Box, Typography } from '@mui/material';

import { ComponentProps } from '../../../../context';

const Component: React.FC<ComponentProps> = (props) => {
  const { component_id, component_name } = props;

  return (
    <Box
      sx={{
        padding: 5,
        backgroundColor: '#ff6c70',
      }}
    >
      <Typography sx={{ color: '#ffffff', fontWeight: 600 }}>
        `{component_id || component_name}` component has not been implemented yet.
      </Typography>
    </Box>
  );
};
export default Component;
