import { MouseEvent } from 'react';
import { Box, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { format } from 'date-fns';
import { DateLocalizer, Event } from 'react-big-calendar';

import { CloseButton } from '@lths/shared/ui-elements';
import { pxToRem } from '@lths/shared/utils';

import { EventComponentProps } from '../../../../../../types';

type SeeMoreProps<TEvent extends object = Event> = {
  selectedDate: Date;
  events: TEvent[];
  eventRenderer?: ((args: EventComponentProps) => JSX.Element) | null;
  onEventClick?: (args: { event: TEvent; htmlEvent?: MouseEvent }) => void;
  onDateClick: (date: Date) => void;
  onClose: () => void;
  localizer: DateLocalizer;
};

export const SeeMore = (props: SeeMoreProps<Event>) => {
  const { selectedDate, events, onEventClick, onDateClick, onClose, localizer, eventRenderer: EventComponent } = props;
  const weekDay = format(selectedDate, 'EEE');
  const dayNum = selectedDate.getDate();

  return (
    <Box width={pxToRem(250)} p={2} data-testid="CalendarYearView--date-tooltip">
      <Box position="absolute" top={22} right={20}>
        <CloseButton
          size={pxToRem(17)}
          color="#000"
          thickness="1px"
          onClick={onClose}
          hoverStyles={{
            opacity: 0.7,
            transition: '0.1s ease-in ',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          pb: 2,
        }}
      >
        <Typography variant="subtitle2" pr={0.55}>
          {weekDay}
        </Typography>
        <IconButton
          data-testid={'SeeMore--dateButton'}
          aria-label={format(selectedDate, 'EEEE, MMMM dd')}
          size="large"
          sx={{ width: '3rem', height: '3rem', textAlign: 'center', verticalAlign: 'baseline' }}
          color="primary"
          onClick={() => onDateClick(selectedDate)}
        >
          <Typography variant="h4">{dayNum}</Typography>
        </IconButton>
      </Box>
      <Box>
        <List dense>
          {events?.length ? (
            events.map((event) => {
              if (EventComponent) {
                return (
                  <EventComponent
                    key={event.title?.toString()}
                    view={'year'}
                    event={event}
                    // None of these below really matter we are just required to pass them in in order to use the event component
                    title={''}
                    continuesPrior={false}
                    continuesAfter={false}
                    isAllDay={false}
                    localizer={localizer}
                    slotStart={new Date()}
                    slotEnd={new Date()}
                  />
                );
              } else {
                return (
                  <ListItem disablePadding key={event.title?.toString()}>
                    <ListItemButton
                      onClick={(e) => onEventClick && onEventClick({ event, htmlEvent: e })}
                      sx={{ borderRadius: '8px' }}
                    >
                      <ListItemText primary={event.title} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })
          ) : (
            <Typography variant="body2">There are no events scheduled on this day.</Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};
