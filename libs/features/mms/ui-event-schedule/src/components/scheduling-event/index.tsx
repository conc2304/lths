import { MouseEventHandler, useRef, useState } from 'react';
import { PopperPlacementType, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/material';
import { addHours, format, getMinutes, isDate, isSameDay, isWithinInterval } from 'date-fns';
import { Event, EventProps } from 'react-big-calendar';

import { TMZ } from '@lths/shared/ui-calendar-scheduler';
import { LTHSView } from '@lths/shared/ui-calendar-scheduler';
import { PopperWithArrow } from '@lths/shared/ui-elements';
import { pxToRem } from '@lths/shared/utils';

import { AllDayBanner } from './all-day-banner';
import { EVENT_STATE } from '../../constants';
import { EventFormValues, EventState, EventStateID, EventType, MMSEvent } from '../../types';
import { EventStateUIMap, eventColorMap } from '../../utils';
import { EventDetailsPopper } from '../modals/event-details-popper';

type EventComponentProps<TEvent extends object = Event> = {
  view: LTHSView;
  eventTypes: EventType[];
  onSaveEvent: (values: EventFormValues, id: string | number | null) => void;
  onSaveEventStates: (updatedEventStates: EventState[]) => void;
} & EventProps<TEvent>;

type SchedulingEventProps = EventComponentProps<MMSEvent>;

export const SchedulingEvent = (props: SchedulingEventProps) => {
  const { event, view, eventTypes, onSaveEvent, onSaveEventStates } = props;

  const { title, allDay, start, end, eventType, createdOn, eventState, isBackgroundEvent } = event;

  const theme = useTheme();

  const containerRef = useRef<HTMLElement>(null);
  const popperTargetShortRef = useRef<HTMLElement>(null);
  const popperTargetOverflowRef = useRef<HTMLElement>(null);
  const popperTargetOverflows = useRef(false);

  const [containerWidth] = useState(0);
  const [popperOpen, setPopperOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [popperPlacement, setPopperPlacement] = useState<PopperPlacementType>('auto');
  const [editModalOpen, setEditModalOpen] = useState(false);

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

  const handleEventClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isBackgroundEvent) return;

    setIsSelected(true);

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

    setPopperPlacement(placement);
    setPopperOpen(!popperOpen);
  };

  const handleModalClose = () => {
    setIsSelected(false);
    setPopperOpen(false);
  };

  const eventBorder = isBackgroundEvent
    ? `2px solid ${eventColorMap(eventType?.id || '')}`
    : isSelected
    ? `2px solid ${theme.palette.primary.main}`
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
      }}
    >
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
              {view !== 'month' && !isInAllDayRow && !!start && !!end && (
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

                  {!!eventState && eventState !== EVENT_STATE.IN_EVENT && (
                    <>
                      <br /> {EventStateUIMap(eventState as EventStateID)?.label || eventState}
                    </>
                  )}
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
                  <Box component={'span'} sx={{ maxWidth: '100%' }} ref={popperTargetShortRef}>
                    {title as string}
                  </Box>
                }
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {eventType && (
        <PopperWithArrow
          open={popperOpen}
          anchorEl={popperTargetOverflows.current ? popperTargetOverflowRef.current : popperTargetShortRef.current}
          placement={popperPlacement}
          onClickAway={() => !editModalOpen && handleModalClose()}
        >
          <EventDetailsPopper
            event={event}
            onClose={handleModalClose}
            editModalOpen={editModalOpen}
            onSetEditModalOpen={(isOpen: boolean) => setEditModalOpen(isOpen)}
            eventTypes={eventTypes}
            onSaveEvent={(values, id) => {
              setPopperOpen(false);
              onSaveEvent(values, id);
            }}
            onSaveEventStates={onSaveEventStates}
          />
        </PopperWithArrow>
      )}
    </Box>
  );
};
