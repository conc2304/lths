import { PopperPlacementType } from '@mui/material';

import { RowBuilderFn } from '@lths/shared/ui-elements';

import { Row } from './row';
import { EventFormValues, EventState, EventType, MMSEvent } from '../../types';

type MMSEventListRow = {
  eventTypes: EventType[];
  onSaveEvent?: (values: EventFormValues, id: string | number | null) => void;
  onSaveEventStates?: (updatedEventStates: EventState[]) => void;
  onEventClick?: ({
    eventId,
    anchorEl,
    popperPlacement,
  }: {
    eventId: string;
    anchorEl: HTMLElement;
    popperPlacement: PopperPlacementType;
  }) => void;
};

export const RowBuilder = ({ eventTypes, onEventClick }: MMSEventListRow): RowBuilderFn<MMSEvent> => {
  return (props) => {
    const { headerCells, data } = props;
    const event = data;

    return <Row headerCells={headerCells} data={event} eventTypes={eventTypes} onEventClick={onEventClick} />;
  };
};
