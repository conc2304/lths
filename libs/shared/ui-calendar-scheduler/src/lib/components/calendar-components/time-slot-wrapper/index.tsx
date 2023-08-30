import { ReactNode } from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/system';
import { Property } from 'csstype';
import { format } from 'date-fns';

import { pxToRem } from '@lths/shared/utils';

export type TimeSlotWrapperProps = {
  typographySX?: SxProps<Theme>;
  dateFormat?: string;
  slotTimes?: [Date, Date];
  slotHeight?: Property.Height;
  slotWidth?: Property.Width;
  showHalfPoint?: boolean;
  // There are more props to this children prop (but RBC does not have a typedef for it, but this is all we currently need)
  children?: { props: { children: Array<{ props: { children: ReactNode[]; group: [Date, Date] } }> } };
  className?: string;
};

export const TimeSlotWrapper = (props: TimeSlotWrapperProps) => {
  const {
    typographySX = {},
    slotHeight = pxToRem(50),
    slotWidth = pxToRem(60),
    dateFormat = 'h a',
    slotTimes,
    showHalfPoint = false,
  } = props;

  const typSX = {
    color: (theme: Theme) => theme.palette.grey.A700,
    fontSize: pxToRem(12),
    fontWeight: 600,
    letterSpacing: '0.15px',
    ...{ typographySX },
  };

  return (
    <Box className="TimeSlotWrapper--root" boxSizing={'border-box'} height={slotHeight} width={slotWidth}>
      {slotTimes && (
        <Box height={'50%'}>
          <Typography sx={typSX}>{format(slotTimes[0], dateFormat)}</Typography>
        </Box>
      )}
      {showHalfPoint && slotTimes && (
        <Box height={'50%'}>
          <Typography sx={typSX}>{format(slotTimes[1], 'h:mm')}</Typography>
        </Box>
      )}
    </Box>
  );
};
