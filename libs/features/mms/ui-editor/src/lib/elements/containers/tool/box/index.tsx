import { Box, BoxProps } from '@mui/material';

import { TOOLBAR_PADDING, TOOLBAR_GAP } from '../../../../common';

const ToolBox = ({ id, children, ...rest }: BoxProps) => {
  return (
    <Box
      id={`${id}-toolbar`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: TOOLBAR_GAP,
        paddingRight: TOOLBAR_PADDING.right, paddingLeft: TOOLBAR_PADDING.left,
        paddingTop: TOOLBAR_PADDING.top, paddingBottom: TOOLBAR_PADDING.bottom,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default ToolBox;