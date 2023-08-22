import { Box, Typography } from '@mui/material';
import { HeaderProps } from 'react-big-calendar';

import { pxToRem } from '@lths/shared/utils';

export const WeekHeader = (props: HeaderProps) => {
  const { label } = props;
  return (
    <Box
      sx={{
        width: '100%',
        textAlign: 'left',
        pl: 1.5,
      }}
    >
      <Typography
        sx={{
          p: 1,
          fontSize: pxToRem(14),
          lineHeight: pxToRem(16),
          letterSpacing: '0.15px',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};
