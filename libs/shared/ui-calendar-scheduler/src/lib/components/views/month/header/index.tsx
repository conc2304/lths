import { Box, Typography, useTheme } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { format } from 'date-fns';
import { HeaderProps } from 'react-big-calendar';

import { pxToRem } from '@lths/shared/utils';

export const MonthHeader = (props: HeaderProps) => {
  const { label, date } = props;

  const isToday = format(new Date(), 'EE') === format(date, 'EE');

  const theme = useTheme();
  return (
    <Box
      sx={{
        textAlign: 'left',
        borderBottom: `1px solid ${theme.palette.grey[600]}`,
        pl: 1.5,
        pb: 0.25,
        pt: '42px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: pxToRem(14),
          lineHeight: pxToRem(20),
          letterSpacing: '0.15px',
        }}
      >
        {label}
      </Typography>
      {isToday && (
        <CircleIcon
          data-testid="Calendar-view-header--today-marker"
          className="Calendar-view-header--today-marker"
          sx={{ mx: 1, width: 12, height: 12 }}
        />
      )}
    </Box>
  );
};
