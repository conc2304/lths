import { useMemo, useState } from 'react';
import { PopperPlacementType, alpha, useTheme } from '@mui/material';
import { NavigateAction } from 'react-big-calendar';

import {
  CalendarCustomProperties,
  EventComponentProps,
  HeaderToEventValueMapFn,
  LTHSCalendar,
  LTHSView,
  ToolbarHeader,
  ToolbarHeaderProps,
  ViewMode,
} from '@lths/shared/ui-calendar-scheduler';
import { PopperWithArrow, TableColumnHeader } from '@lths/shared/ui-elements';

import { EventSchedulingFooter } from './footers';
import { EventDetailsPopper } from './modals/event-details-popper';
import { RowBuilder } from './row/row-builder';
import { SchedulingEvent } from './scheduling-event';
import { EventTypeFilter } from './toolbar/event-type-filter';
import { EventFormValues, EventState, EventType, MMSEvent } from '../types';
import { getEventStatesByEventId } from '../utils';

type EventSchedulerProps = {
  events: MMSEvent[];
  eventTypes: EventType[];
  date?: Date;
  onSaveEvent: (values: EventFormValues, id: string | number | null) => void;
  onSaveEventStates: (updatedEventStates: EventState[]) => void;
  backgroundEvents?: MMSEvent[];
  viewMode?: ViewMode;
  defaultViewMode?: ViewMode;
  view?: LTHSView;
  defaultView?: LTHSView;
  onSetView?: (view: LTHSView) => void;
  onSetViewMode?: (viewMode: ViewMode) => void;
  onRangeChange?: (range: Date[] | { start: Date; end: Date }, view?: LTHSView) => void | undefined;
  onNavigate?: ((newDate: Date, view: LTHSView, action: NavigateAction) => void) | undefined;
  eventsEditable?: boolean;
  eventStatesEditable?: boolean;
};

export const EventScheduler = (props: EventSchedulerProps) => {
  const {
    events,
    eventTypes,
    date,
    view: viewProp,
    viewMode: viewModeProp,
    backgroundEvents: bEvents = [],
    defaultViewMode = 'calendar',
    defaultView = 'month',
    onSaveEvent,
    onSaveEventStates,
    onNavigate,
    onRangeChange,
    onSetView,
    onSetViewMode,
  } = props;

  const [popperEventId, setPopperEventId] = useState<MMSEvent | string>();
  const [popperOpen, setPopperOpen] = useState(false);
  const [popperAnchor, setPopperAnchor] = useState<HTMLElement>();
  const [popperPlacement, setPopperPlacement] = useState<PopperPlacementType>('auto');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [filters, setFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(viewModeProp || defaultViewMode);
  const [view, setView] = useState<LTHSView>(viewProp || defaultView);
  const [eventStatesVisible, setEventStatesVisible] = useState(false);
  const theme = useTheme();

  const visibileEvents = useMemo(
    () =>
      filters.includes('all') || filters.length === 0
        ? events
        : events.filter((event) => !!event.eventType && filters.includes(event.eventType.id)),
    [filters, events]
  );

  const eventDetailsEvent =
    !!popperEventId && typeof popperEventId !== 'string'
      ? popperEventId
      : visibileEvents.find((event) => event.id === popperEventId);

  const backgroundEvents = useMemo(() => {
    return !eventStatesVisible
      ? []
      : filters.includes('all') || filters.length === 0
      ? bEvents
      : bEvents.filter((event) => !!event.eventType && filters.includes(event.eventType.id));
  }, [events, filters, visibileEvents, eventStatesVisible, bEvents]);

  const eventDetailsStates = eventDetailsEvent?.eventId
    ? getEventStatesByEventId([...events, ...bEvents], eventDetailsEvent.eventId)
    : [];

  const handleFilterChange = (filtersSelected: [id: string, value: string][]) => {
    const filters = filtersSelected.map(([id]) => id);
    setFilters(filters);
  };

  const handleViewEventStatesToggle = (eventStatesVisible: boolean) => {
    setEventStatesVisible(eventStatesVisible);
  };

  const handleSetViewMode = (viewMode: ViewMode) => {
    // close popper on view change
    setPopperAnchor(undefined);
    setPopperOpen(false);

    onSetViewMode && onSetViewMode(viewMode);
    setViewMode(viewMode);
  };

  const handleSetView = (view: LTHSView) => {
    // close popper on view change
    setPopperAnchor(undefined);
    setPopperOpen(false);

    onSetView && onSetView(view);
    setView(view);
  };

  const handleEventClick = ({
    eventId,
    anchorEl,
    popperPlacement,
  }: {
    eventId: string;
    anchorEl: HTMLElement;
    popperPlacement: PopperPlacementType;
  }) => {
    setPopperEventId(eventId);
    setPopperPlacement(popperPlacement);
    setPopperAnchor(anchorEl);
    setPopperOpen(true);
  };

  const components = useMemo<{
    footer?: JSX.Element;
    toolbar: (args: ToolbarHeaderProps) => JSX.Element;
    eventItem: (args: EventComponentProps) => JSX.Element;
  }>(() => {
    return {
      footer: <EventSchedulingFooter eventTypes={eventTypes} />,
      toolbar: (props: ToolbarHeaderProps) => (
        <ToolbarHeader {...props}>
          <EventTypeFilter
            eventTypes={eventTypes}
            onViewEventStates={handleViewEventStatesToggle}
            onFilterChange={handleFilterChange}
            viewMode={viewMode}
            view={view}
          />
        </ToolbarHeader>
      ),
      eventItem: (props: EventComponentProps) => (
        <SchedulingEvent
          {...props}
          event={props.event as MMSEvent}
          eventTypes={eventTypes}
          onSaveEvent={onSaveEvent}
          onSaveEventStates={onSaveEventStates}
          onEventClick={handleEventClick}
        />
      ),
    };
  }, [viewMode, view, eventTypes]);

  const columns: TableColumnHeader[] = [
    { id: 'eventTime', label: 'Event Time', sortable: true },
    { id: 'eventName', label: 'Event Name', sortable: true },
    { id: 'eventType', label: 'Event Type', sortable: true },
    { id: 'createdBy', label: 'Created By', sortable: true },
  ];

  const getColumnValue: HeaderToEventValueMapFn = (event, column): Date | string | number | undefined => {
    const e = event as MMSEvent;
    switch (column) {
      case 'eventTime':
        return e.start as Date;
      case 'eventName':
        return e.title?.toString();
      case 'eventType':
        return e?.eventType?.id || undefined;
      case 'createdBy':
        return e.createdBy;
      default:
        return undefined;
    }
  };

  const cssVariables: CalendarCustomProperties = {
    '--current-time-color': theme.palette.info.main,
    '--current-day-highlight-color': alpha(theme.palette.info.light, 0.2),
    '--current-day-marker-color': theme.palette.primary.main,
    '--show-more-color': theme.palette.info.dark,
    '--event-min-height': '5.5rem',
  };

  console.log('Event Scheduler', { date });
  return (
    <>
      <LTHSCalendar
        date={date}
        events={visibileEvents}
        view={view}
        customComponents={components}
        backgroundEvents={backgroundEvents}
        viewMode={viewMode}
        onSetViewMode={handleSetViewMode}
        onSetView={handleSetView}
        cssVariableOverrides={cssVariables}
        onNavigate={onNavigate}
        onRangeChange={onRangeChange}
        // Context Values
        headerCells={columns}
        rowBuilder={RowBuilder({
          eventTypes,
          onEventClick: handleEventClick,
        })}
        headerToEventValueMap={getColumnValue}
      />
      {!!eventDetailsEvent && (
        <PopperWithArrow
          open={popperOpen}
          anchorEl={popperAnchor}
          placement={popperPlacement}
          onClickAway={(event: MouseEvent | TouchEvent | undefined) => {
            const target = event?.target as HTMLElement;
            const clickedInEvent = !!target.closest('.CalendarEvent--root');
            if (clickedInEvent) return;
            if (!editModalOpen) {
              setPopperOpen(false);
              setPopperEventId(undefined);
            }
          }}
        >
          <EventDetailsPopper
            event={eventDetailsEvent}
            eventStates={eventDetailsStates}
            onClose={() => setPopperOpen(false)}
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
    </>
  );
};
