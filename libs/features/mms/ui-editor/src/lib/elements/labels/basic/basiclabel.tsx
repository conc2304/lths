import { Box, BoxProps } from '@mui/material';

import { MOBILE_GUTTER } from '../../../common';
const BasicContainerLabel = ({ id, children, ...rest }: BoxProps) => {
  return (
    <Box
      id={`${id}-component`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: MOBILE_GUTTER,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default BasicContainerLabel;
