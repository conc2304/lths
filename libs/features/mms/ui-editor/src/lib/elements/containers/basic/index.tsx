import { Box, BoxProps } from '@mui/material';

import { MOBILE_GUTTER_X, MOBILE_GUTTER_BOTTOM } from '../../../common';

const BasicContainer = ({ id, sx, children, ...rest }: BoxProps) => {
  return (
    <Box
      id={`${id}-component`}
      sx={{
        marginX: MOBILE_GUTTER_X,
        marginTop: 0,
        marginBottom: MOBILE_GUTTER_BOTTOM,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
export default BasicContainer;
