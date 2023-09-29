import { PopperPlacementType } from '@mui/material';

import { RowBuilderFn } from '@lths/shared/ui-calendar-scheduler';

import { Row } from './row';
import { EventFormValues, EventState, EventType, MMSEvent } from '../../types';

type MMSEventListRow = {
  eventTypes: EventType[];
  onSaveEvent?: (values: EventFormValues, id: string | number | null) => void;
  onSaveEventStates?: (updatedEventStates: EventState[]) => void;
  onEventClick?: ({
    event,
    anchorEl,
    popperPlacement,
  }: {
    event: MMSEvent;
    anchorEl: HTMLElement;
    popperPlacement: PopperPlacementType;
  }) => void;
};

export const RowBuilder = ({ eventTypes, onEventClick }: MMSEventListRow): RowBuilderFn => {
  return (props) => {
    const { headerCells } = props;
    const event = props.event as MMSEvent;

    return (
      <Row
        headerCells={headerCells}
        event={event}
        eventTypes={eventTypes}
        onEventClick={onEventClick}
        // onSaveEvent={onSaveEvent}
        // onSaveEventStates={onSaveEventStates}
      />
    );
  };
};
