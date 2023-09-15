import { Box, BoxProps } from '@mui/material';

import { MOBILE_GUTTER } from '../../../common';

const BasicContainer = ({ id, sx, children, ...rest }: BoxProps) => {
  return (
    <Box
      id={`${id}-component`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: MOBILE_GUTTER,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
export default BasicContainer;
