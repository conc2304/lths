import React from 'react';
import { Box, Typography } from '@mui/material';

import { ComponentProps } from '../../../../context';

const Toolbar: React.FC<ComponentProps> = (props) => {
  const { component_id, component_name } = props;

  return (
    <Box
      sx={{
        padding: 5,
      }}
    >
      <Typography>
        Unsupported componenet type: {component_name}({component_id})
      </Typography>
    </Box>
  );
};
export default Toolbar;
