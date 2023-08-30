import { RowBuilderFn } from '@lths/shared/ui-calendar-scheduler';

import { Row } from './row';
import { EventFormValues, EventState, EventType, MMSEvent } from '../../types';

type MMSEventListRow = {
  eventTypes: EventType[];
  onSaveEvent: (values: EventFormValues, id: string | number | null) => void;
  onSaveEventStates: (updatedEventStates: EventState[]) => void;
};

export const RowBuilder = ({ eventTypes, onSaveEvent, onSaveEventStates }: MMSEventListRow): RowBuilderFn => {
  return (props) => {
    const { headerCells } = props;
    const event = props.event as MMSEvent;

    return (
      <Row
        headerCells={headerCells}
        event={event}
        eventTypes={eventTypes}
        onSaveEvent={onSaveEvent}
        onSaveEventStates={onSaveEventStates}
      />
    );
  };
};
