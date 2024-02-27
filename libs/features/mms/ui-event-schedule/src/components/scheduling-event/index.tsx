import { MouseEventHandler, useRef, useState } from 'react';
import { ClickAwayListener, PopperPlacementType, Typography, lighten } from '@mui/material';
import { Box, useTheme } from '@mui/material';
import { FlightTakeoff, Home } from '@mui/icons-material';
import { addHours, format, getMinutes, isDate, isSameDay, isWithinInterval } from 'date-fns';
import { Event, EventProps, Views } from 'react-big-calendar';

import { TMZ } from '@lths/shared/ui-calendar-scheduler';
import { LTHSView } from '@lths/shared/ui-calendar-scheduler';
import { pxToRem } from '@lths/shared/utils';

import { AllDayBanner } from './all-day-banner';
import { EventFormValues, EventState, EventType, MMSEvent } from '../../types';
import { eventColorMap } from '../../utils';

type EventComponentProps<TEvent extends object = Event> = {
  view: LTHSView;
  eventTypes: EventType[];
  onEventClick: ({
    eventId,
    anchorEl,
    popperPlacement,
  }: {
    eventId: string;
    anchorEl: HTMLElement;
    popperPlacement: PopperPlacementType;
  }) => void;
  onSaveEvent: (values: EventFormValues, id: string | number | null) => void;
  onSaveEventStates: (updatedEventStates: EventState[]) => void;
} & EventProps<TEvent>;

type SchedulingEventProps = EventComponentProps<MMSEvent>;

export const SchedulingEvent = (props: SchedulingEventProps) => {
  const { event, view, onEventClick } = props;

  const { title, allDay, start, end, eventType, createdOn, isBackgroundEvent, location = undefined } = event;

  const theme = useTheme();

  const containerRef = useRef<HTMLElement>(null);
  const popperTargetDayRef = useRef<HTMLElement>(null);
  const popperTargetShortRef = useRef<HTMLElement>(null);
  const popperTargetOverflowRef = useRef<HTMLElement>(null);
  const popperTargetOverflows = useRef(false);

  const [containerWidth] = useState(0);
  const [eventSelected, setEventSelected] = useState(false);

  const today = new Date();
  const getFormattedTime = (date: Date) => (getMinutes(date) === 0 ? format(date, 'ha') : format(date, 'h:mma'));
  const isMultiDayEvent = start && end && !isSameDay(start, end);
  const isInAllDayRow = !!allDay || !!isMultiDayEvent;
  const isNewEvent =
    !!createdOn && isDate(createdOn)
      ? isWithinInterval(today, {
          start: createdOn,
          end: addHours(createdOn, 24),
        })
      : false;

  const showNewEventBanner = isNewEvent && (view === 'day' || view === 'week');

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    const target = event.target as HTMLElement;
    const clickedInDetailsPopper = !!target.closest('.Popper-with-arrow--root');
    const closedPopper = target.classList.contains('Close-Button--root');
    const clickedInModal = !!target.closest('.MuiDialog-root');

    if ((!clickedInModal && !clickedInDetailsPopper) || closedPopper) setEventSelected(false);
  };

  const handleEventClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isBackgroundEvent) return;

    setEventSelected(true);

    // if our target overflows the parent use the parent
    const targetWidth = popperTargetShortRef.current?.getBoundingClientRect().width || 0;
    const parentWidth = popperTargetOverflowRef.current?.getBoundingClientRect().width || 0;

    // target over flows the container so arrow will be way out in left field
    popperTargetOverflows.current = targetWidth > parentWidth;

    const { clientX, clientY } = e;

    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight;

    const xPos = clientX > clientWidth / 2 ? 'left' : 'right';
    const yPos = clientY > clientHeight / 2 ? 'end' : 'start';
    const placement: PopperPlacementType = `${xPos}-${yPos}`;

    const anchorEl: HTMLElement =
      view === 'day'
        ? (popperTargetDayRef.current as HTMLElement)
        : popperTargetOverflows.current
        ? (popperTargetOverflowRef.current as HTMLElement)
        : (popperTargetShortRef.current as HTMLElement);

    onEventClick({
      eventId: event.id,
      popperPlacement: placement,
      anchorEl,
    });
  };

  const eventBorder = isBackgroundEvent
    ? `2px solid ${eventColorMap(eventType?.id || '')}`
    : eventSelected
    ? `2px solid ${theme.palette.grey.A700}`
    : `1px solid #FFF`;

  return (
    <Box
      className="CalendarEvent--root"
      ref={containerRef}
      width={'100%'}
      height={'100%'}
      sx={{
        backgroundColor: !isBackgroundEvent ? eventColorMap(eventType?.id || '') : '#dfdfdfDD',
        borderRadius: '6px',
        border: eventBorder,
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: !isBackgroundEvent ? lighten(eventColorMap(eventType?.id || ''), 0.25) : undefined,
        },
      }}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          onClick={handleEventClick}
          data-testid="CalendarEvent--click-handler"
          width={'100%'}
          height={'100%'}
          sx={{ cursor: isBackgroundEvent ? undefined : 'pointer' }}
        >
          {showNewEventBanner && !isInAllDayRow && (
            <AllDayBanner isInAllDayRow={isInAllDayRow} containerWidth={containerWidth} breakpoint={125} />
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1,
              pl: isInAllDayRow && !isNewEvent ? pxToRem(14) : pxToRem(6),
              pr: pxToRem(6),
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {showNewEventBanner && isInAllDayRow && (
                <AllDayBanner
                  isInAllDayRow={isInAllDayRow}
                  containerWidth={containerWidth}
                  breakpoint={125}
                  sx={{ mr: 0.5 }}
                />
              )}

              <Box
                data-testid="CalendarEvent--text-container"
                sx={{
                  flex: 1,
                  flexShrink: 1,
                  flexDirection: 'column',
                  width: isNewEvent && isInAllDayRow ? '80%' : '100%',
                  justifyContent: view === 'month' || isInAllDayRow ? 'center' : 'start',
                }}
              >
                {[Views.WEEK.toString(), Views.DAY.toString()].includes(view) && !isInAllDayRow && start && end && (
                  <Typography
                    data-testid="CalendarEvent--event-time"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: pxToRem(11),
                      lineHeight: pxToRem(18),
                      letterSpacing: '0.15px',
                      color: '#000',
                    }}
                  >
                    {`${getFormattedTime(start)} - ${getFormattedTime(end)} ${TMZ}`}
                  </Typography>
                )}
                <Typography
                  ref={popperTargetOverflowRef}
                  sx={{
                    fontWeight: (allDay || isMultiDayEvent) && view !== 'month' ? 'bold' : 'normal',
                    fontSize: pxToRem(13),
                    letterSpacing: '0.15px',
                    lineHeight: pxToRem(18),
                    color: '#000',
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {
                    <Box
                      component={'span'}
                      sx={{
                        maxWidth: '100%',
                        display: 'flex',
                        justifyContent: view === 'day' ? 'flex-start' : 'space-between',
                        alignItems: 'center',
                      }}
                      ref={popperTargetShortRef}
                    >
                      <Box
                        component={'span'}
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        ref={popperTargetDayRef}
                      >
                        {title as string}
                        {!!location && (
                          <Box component={'span'} px={1}>
                            {location.toLowerCase() === 'home' && <Home fontSize="small" />}
                            {location.toLowerCase() === 'away' && <FlightTakeoff fontSize="small" />}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  }
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};
