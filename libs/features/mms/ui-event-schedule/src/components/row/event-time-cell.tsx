import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';

type EventTimeCellProps = {
  startTime: Date;
  endTime: Date;
};
export const EventTimeCell = (props: EventTimeCellProps) => {
  const { startTime, endTime } = props;
  const dFormat = 'MM.dd.yy h:mma';

  return (
    <Box>
      <Typography sx={{ fontSize: '0.8125rem', lineHeight: '1.125rem', letterSpacing: '0.15px' }}>
        {format(startTime, dFormat)} -<br />
        {format(endTime, dFormat)}
      </Typography>
    </Box>
  );
};
