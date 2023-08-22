import { Box, Theme } from '@mui/material';
import { Property } from 'csstype';
import { format, getMinutes, isAfter, isSameDay } from 'date-fns';

type EventTimeProps = {
  start: Date;
  end: Date;
  allDay: boolean;
};
export const EventTime = ({ start, end, allDay }: EventTimeProps) => {
  const getFormattedTime = (date: Date) => (getMinutes(date) === 0 ? format(date, 'ha') : format(date, 'h:mma'));
  const dateFormat = 'EEEE, MMMM do, yyyy';
  const dateFormatNoDay = 'EE MMMM do, yyyy';
  const isMultiDayEvent = !isSameDay(start, end);
  const formattedStartDate = format(start, !isMultiDayEvent ? dateFormat : dateFormatNoDay);
  const formattedEndDate = format(end, !isMultiDayEvent ? dateFormat : dateFormatNoDay);
  const formattedStartTime = getFormattedTime(start);
  const formattedEndTime = getFormattedTime(end);
  const eventCompleted = !!end && isAfter(new Date(), end);
  const eventStatusTextColor = (theme: Theme): Property.Color =>
    eventCompleted ? theme.palette.warning.light : 'currentcolor';

  const eventCompletedTxt = eventCompleted ? <Box>EVENT COMPLETED</Box> : '';

  if (isMultiDayEvent) {
    return (
      <Box>
        {`${formattedStartDate} ${formattedStartTime}`}
        <br />
        {`${formattedEndDate} ${formattedEndTime}`}
        <Box
          sx={{
            color: eventStatusTextColor,
          }}
        >
          {eventCompletedTxt}
        </Box>
      </Box>
    );
  } else if (allDay) {
    return <Box>{format(start, 'EEEE, MMMM do, yyyy')}</Box>;
  } else {
    return (
      <Box>
        {format(start, 'EEEE, MMMM do, yyyy')}
        <br />
        <Box
          sx={{
            color: eventStatusTextColor,
          }}
        >
          {eventCompletedTxt}

          {`${getFormattedTime(start)} - ${getFormattedTime(end)}`}
        </Box>
      </Box>
    );
  }
};
