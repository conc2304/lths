import { EventFormValues, EventType, MMSEvent } from '../../../types';
import { EventFormModal } from '../event-form';

export type EditEventModalProps = {
  open: boolean;
  onCancel: () => void;
  onSave: (values: EventFormValues, id: string | number | null) => void;
  eventTypes: EventType[];
  event: MMSEvent;
};

export const EditEventModal = (props: EditEventModalProps) => {
  const { open, onCancel, onSave, event, eventTypes } = props;

  return (
    <EventFormModal
      open={open}
      title="Edit event"
      cancelText="CANCEL"
      confirmText="UPDATE"
      onSave={onSave}
      onCancel={onCancel}
      eventValues={event}
      eventTypes={eventTypes}
    />
  );
};
