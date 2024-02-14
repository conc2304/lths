import { Box, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format, isAfter } from 'date-fns';
import { Flags } from 'react-feature-flags';

import { CloseButton } from '@lths/shared/ui-elements';
import { pxToRem } from '@lths/shared/utils';

import { EventTime } from './event-time-header';
import { EVENTS_W_STATES, UNEDITABLE_EVENT_TYPES } from '../../../constants';
import { EVENT_SCHEDULER_UPDATE_EVENTS_FLAG, EVENT_SCHEDULER_UPDATE_EVENT_STATES_FLAG } from '../../../feature-flags';
import { EventFormValues, EventState, EventType, MMSEvent } from '../../../types';
import { sortByEventState } from '../../../utils';
import { EditEventModal } from '../edit-event-modal';
import { EditEventStatesModal } from '../edit-event-states-modal';

type EventDetailsPopperProps = {
  event: MMSEvent;
  onClose?: () => void;
  editModalOpen: boolean;
  onSetEditModalOpen: (isOpen: boolean) => void;
  onSaveEvent: (values: EventFormValues, id: string | number | null) => void;
  onSaveEventStates: (updatedEventStates: EventState[]) => void;
  eventTypes: EventType[];
  features?: {
    updateEvents: boolean;
    updateEventStates: boolean;
  }[];
};

export const EventDetailsPopper = (props: EventDetailsPopperProps) => {
  const {
    onClose,
    editModalOpen,
    onSetEditModalOpen,
    onSaveEvent,
    onSaveEventStates,
    eventTypes,
    event,
    // features = {},
  } = props;

  // const {updateEvents: updateEventsEnabled = true, updateEventStates: updateEventStatesEnabled = true} = features;

  const { id, start, end, allDay = false, title, desc, eventType, createdBy, eventStates, createdOn } = event;

  const eventCompleted = !!end && isAfter(new Date(), end);

  const FieldLabel = styled(Typography)(({ theme }) => {
    return {
      textTransform: 'uppercase',
      color: theme.palette.grey[500],
      fontWeight: 'bold',
      fontSize: pxToRem(12),
      lineHeight: pxToRem(18),
      letterSpacing: '0.15px',
    };
  });

  const eventStatesEditable =
    eventType?.id && EVENTS_W_STATES.map((e) => e.toString()).includes(eventType.id.toString());
  const eventEditable = eventType?.id && !EVENTS_W_STATES.map((e) => e.toString()).includes(eventType.id.toString());

  return (
    <>
      <Box className="EventDetailsPopper--root" width={pxToRem(323)} data-testid={id}>
        <Box
          width={'100%'}
          height={'100%'}
          display={'flex'}
          flexDirection={'column'}
          position="relative"
          py={5}
          px={2.5}
        >
          <Box position="absolute" top={22} right={12}>
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
            className="EventDetailsPopper--date"
            sx={{
              fontSize: pxToRem(14),
              fontWeight: 'bold',
              lineHeight: pxToRem(21),
              letterSpacing: '0.15px',
              mb: 3,
            }}
          >
            {start && end && <EventTime start={start} end={end} allDay={allDay} />}
          </Box>
          <Typography
            className="EventDetailsPopper--title"
            sx={{
              fontSize: pxToRem(21),
              lineHeight: pxToRem(24),
              letterSpacing: '0.15px',
              mb: 3,
            }}
          >
            {title as string}
          </Typography>
          <Typography
            className="EventDetailsPopper--desc"
            sx={{
              fontSize: pxToRem(14),
              lineHeight: pxToRem(18),
              letterSpacing: '0.15px',
              mb: 3,
            }}
          >
            {desc}
          </Typography>
          <Box mb={2}>
            <FieldLabel>Event Type</FieldLabel>
            <Typography className="EventDetailsPopper--eventType">{eventType && eventType.label}</Typography>
          </Box>
          <Box mb={2}>
            <FieldLabel>Created By</FieldLabel>
            <Typography
              className="EventDetailsPopper--createdBy"
              sx={{ fontSize: pxToRem(14), lineHeight: pxToRem(18), letterSpacing: '0.15px' }}
            >
              {createdBy}
              {eventType?.id &&
              createdOn &&
              !UNEDITABLE_EVENT_TYPES.map((e) => e.toString()).includes(eventType.id.toString())
                ? ` on ${format(createdOn, 'MM/dd/yy | hh:mma')}`
                : ''}
            </Typography>
          </Box>
          {/* Event States Container */}
          {eventType?.id &&
            EVENTS_W_STATES.map((e) => e.toString()).includes(eventType.id.toString()) &&
            eventStates &&
            eventStates.length > 0 && (
              <Box mb={2} className="EventDetailsPopper--eventStates">
                <FieldLabel mb={1.5}>Event States</FieldLabel>
                <Stack direction="column" spacing={2}>
                  {eventStates?.sort(sortByEventState).map((eventState: EventState) => {
                    const { label, desc, state, relativeOffsetHrs } = eventState;
                    const offsetTimeSuffix = relativeOffsetHrs && relativeOffsetHrs > 1 ? 'hrs' : 'hr';
                    const offsetText = `${relativeOffsetHrs} ${offsetTimeSuffix}`;
                    return (
                      <Box
                        display="flex"
                        justifyContent={'start'}
                        key={state}
                        sx={{ fontSize: pxToRem(12), fontWeight: 'bold' }}
                      >
                        {label && <Box width={'40%'}>{label}</Box>}
                        {desc && (
                          <Box>
                            {relativeOffsetHrs !== null && offsetText} {desc.toString()}
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            )}

          {/* Event Actions */}

          <Box>
            <Button onClick={() => onSetEditModalOpen(true)} color="secondary" variant="text" size="small">
              <Flags authorizedFlags={[EVENT_SCHEDULER_UPDATE_EVENT_STATES_FLAG]}>
                {eventStatesEditable && 'EDIT EVENT STATES'}
              </Flags>
              <Flags authorizedFlags={[EVENT_SCHEDULER_UPDATE_EVENTS_FLAG]}>{eventEditable && 'EDIT EVENT'}</Flags>
            </Button>
          </Box>

          {eventCompleted && (
            <Box mt={1}>
              {/* TODO - this needs to link somewhere but that page does not exist yet */}
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  //  TODO there is nowhere to route to
                }}
              >
                VIEW INSIGHTS
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {eventStatesEditable && eventStates && (
        <Flags authorizedFlags={[EVENT_SCHEDULER_UPDATE_EVENT_STATES_FLAG]}>
          <EditEventStatesModal
            open={editModalOpen}
            eventData={event}
            onClose={() => onSetEditModalOpen(false)}
            onCancel={() => onSetEditModalOpen(false)}
            onSave={(updatedEventStates) => {
              onSaveEventStates(updatedEventStates);
              onSetEditModalOpen(false);
            }}
          />
        </Flags>
      )}
      {eventEditable && (
        <Flags authorizedFlags={[EVENT_SCHEDULER_UPDATE_EVENTS_FLAG]}>
          <EditEventModal
            event={event}
            eventTypes={eventTypes}
            open={editModalOpen}
            onSave={(values) => {
              onSaveEvent(values, id);
              onSetEditModalOpen(false);
            }}
            onCancel={() => onSetEditModalOpen(false)}
          />
        </Flags>
      )}
    </>
  );
};
