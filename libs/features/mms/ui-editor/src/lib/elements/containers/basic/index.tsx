import { Box, BoxProps } from '@mui/material';

import { MOBILE_GUTTER } from '../../../common';

const BasicContainer = ({ id, children, ...rest }: BoxProps) => {
  return (
    <Box
      id={id}
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
export default BasicContainer;
