import { useMemo, useState } from 'react';
import { PopperPlacementType, useTheme } from '@mui/material';
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
import { PopperWithArrow, TableHeaderCellProps } from '@lths/shared/ui-elements';

import { EventSchedulingFooter } from './footers';
import { EventDetailsPopper } from './modals/event-details-popper';
import { RowBuilder } from './row/row-builder';
import { SchedulingEvent } from './scheduling-event';
import { EventTypeFilter } from './toolbar/event-type-filter';
import { EventFormValues, EventState, EventType, MMSEvent } from '../types';

type EventSchedulerProps = {
  events: MMSEvent[];
  eventTypes: EventType[];
  onSaveEvent: (values: EventFormValues, id: string | number | null) => void;
  onSaveEventStates: (updatedEventStates: EventState[]) => void;
  backgroundEvents?: MMSEvent[];
  defaultViewMode?: ViewMode;
  defaultView?: LTHSView;
  onRangeChange?: (range: Date[] | { start: Date; end: Date }, view?: LTHSView) => void | undefined;
  onNavigate?: ((newDate: Date, view: LTHSView, action: NavigateAction) => void) | undefined;
};

export const EventScheduler = (props: EventSchedulerProps) => {
  const {
    events,
    eventTypes,
    backgroundEvents: bEvents = [],
    defaultViewMode = 'calendar',
    defaultView = 'month',
    onSaveEvent,
    onSaveEventStates,
    onNavigate,
    onRangeChange,
  } = props;

  const [popperEvent, setPopperEvent] = useState<MMSEvent>();
  const [popperOpen, setPopperOpen] = useState(false);
  const [popperAnchor, setPopperAnchor] = useState<HTMLElement>();
  const [popperPlacement, setPopperPlacement] = useState<PopperPlacementType>('auto');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [filters, setFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode);
  const [view, setView] = useState<LTHSView>(defaultView);
  const [eventStatesVisible, setEventStatesVisible] = useState(false);
  const theme = useTheme();

  const visibileEvents = useMemo(
    () =>
      filters.includes('all') || filters.length === 0
        ? events
        : events.filter((event) => !!event.eventType && filters.includes(event.eventType.id)),
    [filters, events]
  );

  const backgroundEvents = useMemo(() => {
    return !eventStatesVisible
      ? []
      : filters.includes('all') || filters.length === 0
      ? bEvents
      : bEvents.filter((event) => !!event.eventType && filters.includes(event.eventType.id));
  }, [events, filters, visibileEvents, eventStatesVisible, bEvents]);

  const handleFilterChange = (filtersSelected: [id: string, value: string][]) => {
    const filters = filtersSelected.map(([id]) => id);
    setFilters(filters);
  };

  const handleViewEventStatesToggle = (eventStatesVisible: boolean) => {
    setEventStatesVisible(eventStatesVisible);
  };

  const handleSetViewMode = (viewMode: ViewMode) => {
    setViewMode(viewMode);
  };

  const handleSetView = (view: LTHSView) => {
    setView(view);
  };

  const handleEventClick = ({
    event,
    anchorEl,
    popperPlacement,
  }: {
    event: MMSEvent;
    anchorEl: HTMLElement;
    popperPlacement: PopperPlacementType;
  }) => {
    setPopperEvent(event);
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

  const columns: TableHeaderCellProps[] = [
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
    '--current-time-color': theme.palette.secondaryButton.main,
    '--current-day-highlight-color': '#cddce787',
    '--show-more-color': theme.palette.primary.main,
    '--event-min-height': '5.5rem',
  };

  return (
    <>
      <LTHSCalendar
        events={visibileEvents}
        view={defaultView}
        customComponents={components}
        backgroundEvents={backgroundEvents}
        viewMode={viewMode}
        onSetViewMode={handleSetViewMode}
        onSetView={handleSetView}
        cssVariableOverrides={cssVariables}
        // Context Values
        headerCells={columns}
        rowBuilder={RowBuilder({
          eventTypes,
          onEventClick: handleEventClick,
        })}
        onNavigate={onNavigate}
        onRangeChange={onRangeChange}
        headerToEventValueMap={getColumnValue}
      />
      {!!popperEvent && (
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
              setPopperEvent(undefined);
            }
          }}
        >
          <EventDetailsPopper
            event={popperEvent}
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
