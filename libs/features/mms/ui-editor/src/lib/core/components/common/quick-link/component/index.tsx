import { Box, Typography } from '@mui/material';

import { Colors } from '../../../../../common';
import { QuickLinkProps } from '../../../types';

const QuickLinkComponent = ({ icon, title }: QuickLinkProps) => {
  return (
    <Box
      sx={{
        background: Colors.quicklink.background,
        flex: 1,
        borderRadius: 2,
        padding: 1,
        flexDirection: 'column',
      }}
    >
      <img src={icon} alt={title} style={{ width: 20, height: 20 }} />
      <Typography sx={{ fontSize: 11 }}>{title}</Typography>
    </Box>
  );
};
export default QuickLinkComponent;
