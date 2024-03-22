import { MMSEvent } from '@lths/features/mms/ui-event-schedule';

export type CreateEventPayload = {
  _id?: string;
  event_id?: string;
  name: string;
  description?: string;
  type: string;
  duration_in_seconds: number;
  start_date_time: string; // UTC TIME 2023-07-25T10:00:00Z",
  end_date_time: string;
  actual_start_date_time: string;
  actual_end_date_time: string;
  visibility?: Record<string, unknown>;
  state?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  source: 'mms'; // Backend can take different types, but we should only ever be sending "MMS"
};

export type CreateEventResponse = {
  status: string;
  message: string;
  error: true;
  data: {
    _id: string;
    event_id: string;
    name: string;
    description: string;
    type: string;
    duration_in_seconds: number;
    start_date_time: string;
    end_date_time: string;
    actual_start_date_time: string;
    actual_end_date_time: string;
    source: string;
    visibility: string;
    state: string;
    metadata: Record<string, unknown>;
  };
};

export type GetEventsEvent = {
  _id: string;
  event_id: string;
  state: string;
  __v: number;
  actual_end_date_time: string;
  actual_start_date_time: string;
  created_on: string;
  deleted_on: string;
  description: string;
  duration_in_seconds: number;
  end_date_time: string;
  is_deleted: boolean;
  is_subject_to_change: boolean;
  name: string;
  source: string;
  start_date_time: string;
  type: string;
  updated_on: string;
  visibility: string;
  location?: 'home' | 'away';
};

export type UpdateEventArgs = {
  id: string;
  payload: {
    _id: string;
    event_id: string;
    name?: string;
    description?: string;
    type?: string;
    duration_in_seconds?: number;
    start_date_time?: string;
    end_date_time?: string;
    actual_start_date_time?: string;
    actual_end_date_time?: string;
    source?: string;
    visibility?: Record<string, unknown>;
    state?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  };
};

export type UpdateEventResponse = {
  status: string;
  message: string;
  error: true;
  data: {
    _id: string;
    event_id: string;
    name: string;
    description: string;
    type: string;
    duration_in_seconds: number;
    start_date_time: string;
    end_date_time: string;
    actual_start_date_time: string;
    actual_end_date_time: string;
    source: string;
    visibility: string;
    state: string;
    metadata: Record<string, unknown>;
  };
};

type TransformDateToString<T> = {
  [P in keyof T]: T[P] extends Date ? string : T[P] extends object ? TransformDateToString<T[P]> : T[P];
};

export type TransormedGetEventsResponse = { events: SerializableMMSEvent[]; eventStates: SerializableMMSEvent[] };

export type SerializableMMSEvent = TransformDateToString<MMSEvent>;
