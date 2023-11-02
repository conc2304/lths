import { useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import { differenceInSeconds, isAfter, isBefore } from 'date-fns';
import { Flags } from 'react-feature-flags';
import { useLocation } from 'react-router-dom';

import {
  useLazyGetEventsQuery,
  useUpdateEventMutation,
  useCreateEventMutation,
  useLazyGetEnumListQuery,
} from '@lths/features/mms/data-access';
import {
  CreateNewEventModal,
  EventFormValues,
  EventScheduler,
  EventState,
  EventType,
  ExportEventsModal,
  ImportEventsModal,
} from '@lths/features/mms/ui-event-schedule';
import {
  EVENT_SCHEDULER_CREATE_EVENTS_FLAG,
  EVENT_SCHEDULER_EXPORT_EVENTS_FLAG,
  EVENT_SCHEDULER_IMPORT_EVENTS_FLAG,
} from '@lths/features/mms/ui-event-schedule';
import { LTHSView, ViewMode } from '@lths/shared/ui-calendar-scheduler';
import { PageHeader } from '@lths/shared/ui-layouts';

import { buildCalendarPath, constructRange, convertEventDates, getCalendarStateFromPath } from './utils';

const SchedulePage = () => {
  // Api Calls
  const [getEnumList] = useLazyGetEnumListQuery();
  const [getEventsData, { data }] = useLazyGetEventsQuery();
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();

  // State from Path / Routing
  const location = useLocation();
  const { viewMode: viewModeParam, view: viewParam, year, month, day } = getCalendarStateFromPath(location.pathname);

  let date: Date;
  if (year && month && day) {
    date = new Date(year, month, day);
  } else {
    date = new Date();
  }

  // State
  const [importModalOpen, setImportModelOpen] = useState(false);
  const [exportModalOpen, setExportModelOpen] = useState(false);
  const [newEventModalOpen, setNewEventModalOpen] = useState(false);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [view, setView] = useState<LTHSView>(viewParam);
  const [viewMode, setViewMode] = useState<ViewMode>(viewModeParam);
  const [calendarDate, setCalendarDate] = useState<Date>(date);

  const { events: unformattedEvents = [], eventStates: unformattedBackgroundEvents = [] } = data || {};

  const events = useMemo(() => convertEventDates(unformattedEvents), [data]);
  const backgroundEvents = useMemo(() => convertEventDates(unformattedBackgroundEvents), [data]);

  // Data Fetching Params
  const numEvents = events.length;
  const lowerIndexFetchingThreshold = Math.round(numEvents * 0.2); // the event in the 20% spot
  const upperIndexFetchingThreshold = Math.round(numEvents * 0.8); // in the 80% spot
  const monthsBeforeAndAfter = 6;
  const eventLimit = 900;
  const eventSorting = `{ start_date_time: 1 }`;

  // Initialization
  const init = async () => {
    const date = calendarDate || new Date();
    const { start, end } = constructRange(date, monthsBeforeAndAfter);

    getEventsData({
      start_date_time: start,
      end_date_time: end,
      sort: eventSorting,
      limit: eventLimit,
    });

    const response = await getEnumList('EventType');
    const eventTypes =
      response?.data?.data?.enum_values.map((value) => ({
        id: value.value,
        label: value.name,
      })) || [];

    setEventTypes(eventTypes);
  };

  useEffect(() => {
    init();
  }, []);

  // Event Handlers
  const handleSaveEvent = (values: EventFormValues, id: string | null | undefined) => {
    // update and save take the same info, only difference is whether we have an eventID
    const eventPayload = {
      name: values.eventName,
      description: values.description,
      type: values.eventType.id,
      duration_in_seconds: Math.abs(differenceInSeconds(values.startDateTime, values.endDateTime)),
      start_date_time: values.startDateTime.toISOString(),
      end_date_time: values.endDateTime.toISOString(),
      actual_start_date_time: values.startDateTime.toISOString(),
      actual_end_date_time: values.endDateTime.toISOString(),
      source: 'mms' as const,
      event_id: values?.eventId,
      _id: id || undefined,
    };

    if (!id) {
      createEvent(eventPayload);
    } else {
      updateEvent({ id, payload: eventPayload });
    }
  };

  const handleSaveEventStates = (updatedEventStates: EventState[]) => {
    updatedEventStates.forEach((eventState) => {
      const eventPayload = {
        name: eventState.name,
        duration_in_seconds: Math.abs(differenceInSeconds(new Date(eventState.start), new Date(eventState.end))),
        start_date_time: new Date(eventState.start).toISOString(),
        end_date_time: new Date(eventState.end).toISOString(),
        actual_start_date_time: new Date(eventState.start).toISOString(),
        actual_end_date_time: new Date(eventState.end).toISOString(),
        source: eventState.source,
        type: eventState.type,
        event_id: eventState.eventId,
        _id: eventState.id,
      };

      updateEvent({ id: eventState.id, payload: eventPayload });
    });
  };

  const doNavigate = (path: string) => {
    window.history.pushState({}, '', `/#${path}`);
  };

  const handleOnRangeChange = (range: Date[] | { start: Date; end: Date }) => {
    // Formats returned by onRangeChage ** sorry the rbc library is really inconsistent
    // month calendar - {start, end} of entire calendar view for month
    // (ie includes dates in prior/following month if its part of the same week in the calendar view)
    // week calendar [date, date, date ...] full week
    // day calendar [date] start of day
    // week list = {start, end}
    // month list = {start, end}
    // day list = {start, end}

    if (!events || events.length === 0 || !upperIndexFetchingThreshold || !lowerIndexFetchingThreshold) return;

    const upperThresholdDate: Date = new Date(events[upperIndexFetchingThreshold].start);
    const lowerThresholdDate: Date = new Date(events[lowerIndexFetchingThreshold].end);
    let endRange: Date;
    let startRange: Date;

    if (Array.isArray(range)) {
      endRange = range.length > 0 ? range[range.length - 1] : undefined;
      startRange = range.length > 0 ? range[0] : undefined;
    } else {
      endRange = range.end;
      startRange = range.start;
    }

    if (!!endRange && isAfter(endRange, upperThresholdDate)) {
      const { start, end } = constructRange(upperThresholdDate, monthsBeforeAndAfter);

      getEventsData({
        start_date_time: start,
        end_date_time: end,
        sort: eventSorting,
        limit: eventLimit,
      });
      return;
    }

    if (!!startRange && isBefore(startRange, lowerThresholdDate)) {
      const { start, end } = constructRange(lowerThresholdDate, monthsBeforeAndAfter);

      getEventsData({
        start_date_time: start,
        end_date_time: end,
        sort: eventSorting,
        limit: eventLimit,
      });
      return;
    }
  };

  const handleOnNavigate = (newDate: Date, view: LTHSView) => {
    const newPath = buildCalendarPath({ view, viewMode, date: new Date(newDate) });
    setCalendarDate(newDate);
    setView(view);
    doNavigate(newPath);
  };

  const handleOnSetView = (newView: LTHSView) => {
    const newPath = buildCalendarPath({ view: newView, viewMode, date: new Date(calendarDate) });
    doNavigate(newPath);
    setView(newView);
  };

  const handleOnSetViewMode = (newViewMode: ViewMode) => {
    // build path and update route
    const newPath = buildCalendarPath({ view, viewMode: newViewMode, date: new Date(calendarDate) });
    doNavigate(newPath);
    setViewMode(newViewMode);
  };

  const handleImportedEvents = (files: FileList) => {
    // TODO do the implementation
    console.log('handleImportedEvents', files);
  };

  const handleExportEvents = (values: 'csv' | 'pdf' | null) => {
    // TODO do the implementation
    console.log('handleExportEvents', values);
  };

  return (
    <Box
      className="MMS-Schedule-Page--root"
      style={{
        width: '-webkit-fill-available',
      }}
    >
      <PageHeader
        title="Schedule"
        sx={{ mt: '1rem', mb: '3.5rem' }}
        rightContent={
          <Box>
            <Flags authorizedFlags={[EVENT_SCHEDULER_IMPORT_EVENTS_FLAG]}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginRight: 1.5 }}
                onClick={() => setImportModelOpen(true)}
              >
                IMPORT
              </Button>
            </Flags>
            <Flags authorizedFlags={[EVENT_SCHEDULER_EXPORT_EVENTS_FLAG]}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginRight: 1.5 }}
                onClick={() => setExportModelOpen(true)}
              >
                EXPORT
              </Button>
            </Flags>
            <Flags authorizedFlags={[EVENT_SCHEDULER_CREATE_EVENTS_FLAG]}>
              <Button variant="contained" color="primary" onClick={() => setNewEventModalOpen(true)}>
                + NEW EVENT
              </Button>
            </Flags>
          </Box>
        }
      />
      <Box mb={4} width={'100%'}>
        {eventTypes && events && backgroundEvents && (
          <EventScheduler
            events={events}
            date={calendarDate}
            view={view}
            viewMode={viewMode}
            eventTypes={eventTypes}
            backgroundEvents={backgroundEvents}
            onSaveEvent={handleSaveEvent}
            onSaveEventStates={handleSaveEventStates}
            onRangeChange={handleOnRangeChange}
            onNavigate={handleOnNavigate}
            onSetView={handleOnSetView}
            onSetViewMode={handleOnSetViewMode}
          />
        )}
      </Box>
      <ImportEventsModal
        open={importModalOpen}
        onClose={() => setImportModelOpen(false)}
        onFilesAdded={handleImportedEvents}
      />
      <ExportEventsModal
        open={exportModalOpen}
        onClose={() => setExportModelOpen(false)}
        onExportEvents={handleExportEvents}
      />
      <CreateNewEventModal
        open={newEventModalOpen}
        onCancel={() => setNewEventModalOpen(false)}
        onSave={handleSaveEvent}
        eventTypes={eventTypes}
      />
    </Box>
  );
};

export default SchedulePage;
