import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { EventType } from '../../types';

type EventTypeCellProps = {
  eventType: EventType;
};
export const EventTypeCell = (props: EventTypeCellProps) => {
  const {
    eventType: { label },
  } = props;
  return (
    <Box display="flex" justifyContent="start" alignItems={'center'}>
      <Typography sx={{ fontSize: '0.8125rem', pl: 1, letterSpacing: '0.15px' }}>{label}</Typography>
    </Box>
  );
};
