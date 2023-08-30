import { EventFormValues, EventType, MMSEvent } from '../../../types';
import { EventFormModal } from '../event-form';
import { dialogSubtitleText } from '../utils';

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
      title="Edit Event"
      subtitle={dialogSubtitleText}
      cancelText="CANCEL"
      confirmText="SAVE UPDATES"
      onSave={onSave}
      onCancel={onCancel}
      eventValues={event}
      eventTypes={eventTypes}
    />
  );
};
