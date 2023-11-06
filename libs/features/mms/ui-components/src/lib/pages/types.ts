export enum PageStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
}

export enum PageType {
  PreDefined = 'Pre-Defined',
  UserDefined = 'User-Defined',
}

export enum Constraint {
  ALL_LOCATIONS = 'ALL_LOCATIONS',
  ALL_USERS = 'ALL_USERS',
  ALWAYS = 'ALWAYS',
  SPECIFIC_DATE_TIME = 'SPECIFIC_DATE_TIME',
  SPECIFIC_EVENT_STATES = 'SPECIFIC_EVENT_STATES',
  SPECIFIC_LOCATIONS = 'SPECIFIC_LOCATIONS',
  SPECIFIC_STATES = 'SPECIFIC_STATES',
  SPECIFIC_USERS = 'SPECIFIC_USERS',
}

export type StatesData = string[];

export type EventStatesData = { events: string[]; states: string[] };

export type DateRangeData = {
  startDate: Date | null;
  startTime: Date | null;
  endDate: Date | null;
  endTime: Date | null;
};

export type ConstraintDateRange = {
  start_date_time: string;
  end_date_time: string;
};
