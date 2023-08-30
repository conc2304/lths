import { Box, Typography, useTheme } from '@mui/material';
import { Property } from 'csstype';

import { pxToRem } from '@lths/shared/utils';

import { TMZ } from '../../../constants';
import { LTHSView } from '../../../types';

export type TimeGutterHeaderProps = {
  view: LTHSView;
  gutterWidth: Property.Width;
  timeSlotHeight: Property.Width;
  border?: {
    color: Property.Color;
    width: Property.Width;
  };
};

export const TimeGutterHeader = (props: TimeGutterHeaderProps) => {
  const theme = useTheme();
  const { view, gutterWidth, timeSlotHeight, border = { color: theme.palette.grey[500], width: '2px' } } = props;

  // No gutter header for day view
  if (view === 'day') return <div data-testid="empty-gutter-header" />;
  else
    return (
      <Box height={'100%'} display={'flex'} flexDirection={'column'}>
        <Box
          sx={{
            width: gutterWidth,
            p: 1,
            borderBottom: `${border.width} solid ${border.color}`,
            height: timeSlotHeight,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            '&::after': {
              // a really stupid way to complete the gap between the multiple borders
              position: 'absolute',
              width: border.width,
              height: border.width,
              content: "''",
              right: `-${border.width}`,
              bottom: `-${border.width}`,
              borderRight: `${border.width} solid ${border.color}`,
            },
          }}
        >
          <Typography
            sx={{
              color: theme.palette.grey.A700,
              fontSize: pxToRem(12),
              fontWeight: 600,
              letterSpacing: '0.15px',
            }}
          >
            {TMZ}
          </Typography>
        </Box>
        <Box flex={'1 1 0'}></Box>
      </Box>
    );
};
