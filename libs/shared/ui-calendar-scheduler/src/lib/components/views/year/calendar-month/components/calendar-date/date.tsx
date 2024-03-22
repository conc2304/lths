import { MouseEvent, useRef, useState } from 'react';
import { Badge, Box, IconButton, PopperPlacementType, Theme, Typography, lighten } from '@mui/material';
import { Property } from 'csstype';
import { format, isToday } from 'date-fns';
import { Event } from 'react-big-calendar';

type CalendarDateProps<TEvent extends object = Event & { id?: string }> = {
  dateToRender: Date;
  currentDate: Date;
  dateId: number | string;
  onClick: (
    date: Date,
    eventIds: string[],
    anchorEl: HTMLElement,
    popperPlacement: PopperPlacementType,
    dateId: string | number
  ) => void;
  events: TEvent[];
  isActive?: boolean;
  size?: 'small' | 'large';
  isWeekend?: boolean;
  differentiateWeekends?: boolean;
  showZeroBadge?: boolean;
};

export const CalendarDate = (props: CalendarDateProps) => {
  const {
    dateToRender,
    currentDate,
    onClick,
    events,
    dateId,
    size = 'small',
    isWeekend = false,
    isActive = false,
    differentiateWeekends = false,
  } = props;

  const [showBadge, setShowBadge] = useState(false);
  const wrapperElem = useRef<HTMLElement>();

  const dateIsToday = isToday(dateToRender);
  const calendarDate = dateToRender.getDate();
  const isPrevMonth = dateToRender.getMonth() < currentDate.getMonth();
  const isNextMonth = dateToRender.getMonth() > currentDate.getMonth();
  const outOfMonth = isPrevMonth || isNextMonth;
  const fullDate = format(dateToRender, 'yyyy-MM-dd');

  const getDateColor = (theme: Theme): Property.Color => {
    let color: Property.Color = '#000';

    if (isActive) color = '#FFF';
    if (dateIsToday) color = theme.palette.secondary.main;
    if (outOfMonth) color = theme.palette.grey[400];
    if (differentiateWeekends && isWeekend && !outOfMonth) return lighten(theme.palette.primary.main, 0.3);
    return color;
  };

  const getBackgroundColor = (theme: Theme): Property.BackgroundColor | undefined => {
    if (isActive) return theme.palette.secondary.light;
    if (dateIsToday) return lighten(theme.palette.secondary.light, 0.8);
    return undefined;
  };

  const getPopperPlacement = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight;

    const xPos = clientX > clientWidth / 2 ? 'left' : 'right';
    const yPos = clientY > clientHeight / 2 ? 'end' : 'start';
    const placement: PopperPlacementType = `${xPos}-${yPos}`;

    return placement;
  };

  return (
    <Box
      className="CalendarYearDate--root" // for determining clickaway behaviour
      data-testid="CalendarYearDate--root"
      ref={wrapperElem}
      display={'inline-flex'}
    >
      <IconButton
        data-testid="CalendarYearDate--button"
        aria-label={fullDate}
        role="button"
        onClick={(e: MouseEvent) => {
          const eventIds = events.map((event) => event.id || event.title?.toString() || '');
          wrapperElem.current && onClick(dateToRender, eventIds, wrapperElem.current, getPopperPlacement(e), dateId);
        }}
        size={size}
        onMouseOver={() => {
          setShowBadge(true);
        }}
        onMouseLeave={() => {
          setShowBadge(false);
        }}
        sx={{
          width: size === 'small' ? '2.2rem' : '2.7rem',
          height: size === 'small' ? '2.2rem' : '2.7rem',
          textAlign: 'center',
          verticalAlign: 'baseline',
          background: getBackgroundColor,
          color: isActive ? '#FFF' : undefined,
          '&:hover': {
            background: (theme) => (isActive ? theme.palette.secondary.light : undefined),
          },
          transition: 'all 0.3s ease',
        }}
      >
        <Badge
          badgeContent={events.length}
          color="primary"
          overlap="rectangular"
          variant={!showBadge ? 'dot' : undefined}
          data-testid="CalendarDate--badge"
        >
          <Typography
            sx={{
              color: (theme) => getDateColor(theme),
              transition: 'all 0.2s ease',
              fontVariantNumeric: 'proportional-nums',
            }}
          >
            {calendarDate}
          </Typography>
        </Badge>
      </IconButton>
    </Box>
  );
};
