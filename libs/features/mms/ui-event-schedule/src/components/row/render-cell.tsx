import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';

import { EventTimeCell } from './event-time-cell';
import { EventTypeCell } from './event-type-cell';
import { EVENT_TYPE } from '../../constants';
import { EventType, MMSEvent } from '../../types';

type RenderCellProps = {
  colId: string;
  event: MMSEvent;
  eventTypes: EventType[];
};

export const CalendarEventTableCell = (props: RenderCellProps) => {
  const { event, colId } = props;
  const { start, end, title, eventType, createdBy, createdOn } = event;

  switch (colId) {
    case 'eventTime':
      return start && end ? (
        <Box>
          <EventTimeCell startTime={start} endTime={end} />
        </Box>
      ) : (
        <Box>No Start or End Time on Event</Box>
      );
    case 'eventName':
      return (
        <Box>
          <Typography component="span" sx={{ fontWeight: 'bold', fontSize: '0.8125rem;' }}>
            {title as string}
          </Typography>
        </Box>
      );
    case 'eventType':
      return <Box>{eventType && <EventTypeCell eventType={eventType} />}</Box>;
    case 'createdBy':
      return (
        <Typography
          component="span"
          sx={{
            fontSize: '0.8125rem',
            letterSpacing: '0.15px',
          }}
        >
          {createdBy}
          {!!createdOn && eventType && !(eventType.id === EVENT_TYPE.GAME || eventType.id === EVENT_TYPE.CONCERT)
            ? ` on ${format(createdOn, 'MM/dd/yy | h:mma')}`
            : ''}
        </Typography>
      );
  }
  return <Box></Box>;
};
