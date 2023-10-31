import { FunctionComponent, useMemo, useState } from 'react';
import { Box, PopperPlacementType } from '@mui/material';
import { addMonths, isSameDay, isSameYear, startOfYear } from 'date-fns';
import { CalendarProps, Navigate, ViewStatic, Views } from 'react-big-calendar';

import { PopperWithArrow } from '@lths/shared/ui-elements';

import { CalendarMonth } from './calendar-month/';
import { SeeMore } from './calendar-month/components/see-more-tooltip/see-more';
import { NavigateYear, RangeYear, TitleYear } from './utils/methods';
import { EventComponentProps } from '../../../types';

export const YearView: FunctionComponent<CalendarProps> & ViewStatic = (props): JSX.Element => {
  const { date = new Date(), events = [], onView, onNavigate, components, localizer } = props;

  let EventComponent: ((args: EventComponentProps) => JSX.Element) | null;

  if (components !== undefined) {
    EventComponent =
      components?.event !== undefined ? (components.event as (args: EventComponentProps) => JSX.Element) : null;
  } else {
    EventComponent = null;
  }

  const [selectedDateId, setSelectedDateId] = useState<string | number>();
  const [popperDate, setPopperDate] = useState<Date>(new Date(date));
  const [popperOpen, setPopperOpen] = useState(false);
  const [popperEvents, setPopperEvents] = useState<typeof events>();
  const [popperAnchor, setPopperAnchor] = useState<HTMLElement>();
  const [popperPlacement, setPopperPlacement] = useState<PopperPlacementType>('auto');

  const eventsInScope = useMemo(
    () =>
      events?.filter((event) => {
        if (!event.start || !date) return false;
        return isSameYear(new Date(date), event.start);
      }),
    [date, events]
  );

  const firstMonth = startOfYear(new Date(date));

  const handleDateClick = ({
    events,
    anchorEl,
    popperPlacement,
    date,
    dateId,
  }: {
    events: typeof props.events;
    anchorEl: HTMLElement;
    popperPlacement: PopperPlacementType;
    date: Date;
    dateId: string | number;
  }) => {
    // if we are clicking on the same date that has the popper open then navigate to that date
    if (popperOpen && popperDate && isSameDay(date, popperDate)) {
      handleDateNavigate(date);
    } else {
      // otherwise release the popper
      setPopperEvents(events);
      setPopperPlacement(popperPlacement);
      setPopperAnchor(anchorEl);
      setPopperOpen(true);
      setPopperDate(date);
      setSelectedDateId(dateId);
    }
  };

  const handleDateNavigate = (date: Date) => {
    onView && onView(Views.DAY);
    // @ts-expect-error - RBC is stupid and its props dont match the types
    onNavigate && onNavigate(Navigate.DATE, date);
  };

  const handleMonthClick = (date: Date) => {
    onView && onView(Views.MONTH);
    // @ts-expect-error - RBC is stupid and its props dont match the types
    onNavigate && onNavigate(Navigate.DATE, date);
  };

  const handleWeekClick = (date: Date) => {
    onView && onView(Views.WEEK);
    // @ts-expect-error - RBC is stupid and its props dont match the types
    onNavigate && onNavigate(Navigate.DATE, date);
  };

  return (
    <Box width="100%" data-testid="CalendarYearView--root">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignContent: 'flex-start',
        }}
      >
        {[...Array(12).fill(1)].map((_, i) => {
          const monthEvents = eventsInScope.filter((event) => {
            if (!event.start || !event.end) return false;
            return event.start.getMonth() === i || event.end.getMonth() === i;
          });
          const monthDate = addMonths(firstMonth, i);
          return (
            <CalendarMonth
              key={i + 1}
              date={monthDate}
              events={monthEvents}
              onDateClick={handleDateClick}
              onMonthClick={handleMonthClick}
              onWeekClick={handleWeekClick}
              showWeekNumber={true}
              selectedDateId={selectedDateId}
            />
          );
        })}
      </Box>
      <PopperWithArrow
        open={popperOpen}
        anchorEl={popperAnchor}
        placement={popperPlacement}
        onClickAway={(event: MouseEvent | TouchEvent | undefined) => {
          const target = event?.target as HTMLElement;
          // don't close popper if we clicked in one of its dialogs or another event
          const clickedInDate = !!target.closest('.CalendarYearDate--root');
          const clickedInPopper =
            !!target.closest('.EventDetailsPopper--root') || !!target.closest('.EditEventStates--root');
          if (clickedInDate || clickedInPopper) return;

          setPopperOpen(false);
          setPopperEvents(undefined);
        }}
      >
        <Box>
          <SeeMore
            events={popperEvents || []}
            localizer={localizer}
            eventRenderer={EventComponent}
            selectedDate={popperDate}
            onDateClick={handleDateNavigate}
            onClose={() => {
              setPopperOpen(false);
            }}
          />
        </Box>
      </PopperWithArrow>
    </Box>
  );
};

YearView.range = RangeYear;
YearView.navigate = NavigateYear;
YearView.title = TitleYear;
