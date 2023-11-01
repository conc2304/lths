import { Box, PopperPlacementType, Typography } from '@mui/material';
import { format, getWeek, isDate, isSameDay } from 'date-fns';
import { Event } from 'react-big-calendar';

import { CalendarDate, WeekItem } from './components';
import { createCalendar } from '../utils/create-calendar';

type CalendarMonthProps<TEvent extends object = Event> = {
  date: Date;
  selectedDateId?: string | number;
  events: Event[];
  size?: 'small' | 'large';
  differentiateWeekends?: boolean;
  showWeekNumber?: boolean;
  onMonthClick: (date: Date) => void;
  onWeekClick?: (date: Date) => void;
  onDateClick: ({
    events,
    anchorEl,
    popperPlacement,
    date,
    dateId,
  }: {
    events: TEvent[];
    anchorEl: HTMLElement;
    popperPlacement: PopperPlacementType;
    date: Date;
    dateId: string | number;
  }) => void;
};

export const CalendarMonth = (props: CalendarMonthProps) => {
  const {
    date,
    events = [],
    size = 'small',
    onMonthClick,
    onWeekClick,
    onDateClick,
    showWeekNumber = false,
    selectedDateId,
  } = props;
  const currentDate = isDate(date) ? new Date(date) : new Date();

  const calendar = createCalendar(currentDate);
  const isPastMonth = new Date().getMonth() > currentDate.getMonth();
  const currentMonth = currentDate.getMonth();

  return (
    <Box data-testid="CalendarMonth--root" p={2}>
      <Box component="span" sx={{}} onClick={() => onMonthClick(currentDate)}>
        <Typography
          variant="subtitle1"
          data-testid="CalendarMonth--name"
          component="span"
          pl={1}
          sx={{
            cursor: 'pointer',
            color: (theme) => (isPastMonth ? theme.palette.grey[600] : undefined),
            '&:hover': {
              color: (theme) => theme.palette.secondaryButton.main,
            },
          }}
        >
          {format(currentDate, 'MMMM')}
        </Typography>
      </Box>
      <Box display={'flex'} data-testid="CalendarMonth--days-of-week">
        {['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
          <Typography
            variant="subtitle2"
            color="GrayText"
            key={`${day}-${index}`}
            className="day"
            aria-label={day}
            sx={{
              padding: 0.8,
              width: size === 'small' ? '2.2rem' : '2.7rem',
              height: size === 'small' ? '2.2rem' : '2.7rem',
              textAlign: 'center',
            }}
          >
            {day[0]}
          </Typography>
        ))}
      </Box>
      {calendar.weeks.map((week, weekOfMonth) => {
        return (
          <Box key={`${getWeek(date)}_${weekOfMonth}`} position="relative">
            {showWeekNumber && <WeekItem date={week[0]} onClick={onWeekClick} />}

            {week.map((calendarDate, dayOfWeek) => {
              const dateId =
                currentMonth * calendar.weeks.length * week.length + weekOfMonth * week.length + dayOfWeek + 1;
              return (
                <CalendarDate
                  dateId={dateId}
                  differentiateWeekends
                  isWeekend={[0, 6].includes(dayOfWeek)}
                  isActive={dateId === selectedDateId}
                  size={size}
                  key={format(calendarDate, 'MM-dd')}
                  currentDate={currentDate}
                  dateToRender={calendarDate}
                  onClick={(calendarDate, events, anchorEl, popperPlacement, dateId) => {
                    onDateClick({ events, anchorEl, popperPlacement, date: calendarDate, dateId });
                  }}
                  events={events.filter((event) => !!event.start && isSameDay(event.start, calendarDate))}
                />
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};
