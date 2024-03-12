import { EventFormValues, EventType } from '../../../types';
import { EventFormModal } from '../event-form';

export type CreateNewEventModalProps = {
  open: boolean;
  onCancel: () => void;
  onSave: (values: EventFormValues, id: string | number | null) => void;
  eventTypes: EventType[];
};

export const CreateNewEventModal = (props: CreateNewEventModalProps) => {
  const { open, onCancel, onSave, eventTypes } = props;

  return (
    <EventFormModal
      open={open}
      title="Create event"
      cancelText="CANCEL"
      confirmText="CREATE"
      onSave={onSave}
      onCancel={onCancel}
      eventTypes={eventTypes}
    />
  );
};
