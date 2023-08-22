import { Box, Button, Typography, useTheme } from '@mui/material';
import { format } from 'date-fns';
import { DateHeaderProps } from 'react-big-calendar';

import { pxToRem } from '@lths/shared/utils';

export const MonthDateHeader = (props: DateHeaderProps) => {
  const { date, isOffRange, onDrillDown } = props;
  const dateNumber = format(date, 'd');
  const isStartOfNewMonth = isOffRange && dateNumber === '1';

  const label = isStartOfNewMonth ? format(date, 'MMM d').toUpperCase() : dateNumber;
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignContent: 'end',
        textAlign: 'left',
        p: 1.5,
      }}
    >
      <Button
        variant="text"
        sx={{ p: 0, minWidth: 'unset' }}
        disableFocusRipple
        disableRipple
        disableTouchRipple
        disableElevation
        onClick={onDrillDown}
      >
        <Typography
          sx={{
            fontSize: pxToRem(14),
            lineHeight: pxToRem(14),
            fontWeight: isOffRange ? 'normal' : 'bold',
            color: !isOffRange ? '#000' : theme.palette.grey[700],
          }}
        >
          {label}
        </Typography>
      </Button>
    </Box>
  );
};
