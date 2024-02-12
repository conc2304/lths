import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { format, getWeek } from 'date-fns';

type WeekItemProps = {
  date: Date;
  onClick?: (date: Date) => void;
};

export const WeekItem = ({ date, onClick }: WeekItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const uiDot = '\u23FA';
  return (
    <Box
      data-testid={'CalendarYearView--WeekItem'}
      aria-label={`Week of ${format(date, 'EEE, MMMM d')}`}
      onClick={() => {
        onClick && onClick(date);
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      sx={{
        position: 'absolute',
        left: -15,
        bottom: 0,
        top: 3,
        cursor: 'pointer',
        width: '1.1rem',
        height: '1.1rem',
        borderRadius: '50%',
        color: 'InactiveCaptionText',
        '&:hover': {
          color: (theme) => theme.palette.secondary.main,
          fontWeight: 'bold',
        },
      }}
    >
      <Typography variant="caption">{!isHovered ? uiDot : getWeek(date)}</Typography>
    </Box>
  );
};
