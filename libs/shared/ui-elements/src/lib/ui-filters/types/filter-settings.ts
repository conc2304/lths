import { DateFilter, DateRange } from './date-range';
import { FormState } from './forms';

export type FilterSettingsQueryParams = {
  date_range: [string, string]; // Needs to be serializable to not a Date Object
  filters: string[]; // Simplified from FormState (stripped of UI rendering props)
};

export type FilterSettingsPayload = {
  date_range: DateFilter; // Needs to be serializable to not a Date Object
  metrics: { [metricName: string]: Array<string> }; // Simplified from FormState (stripped of UI rendering props)
};

export type FilterSettingsState = {
  date_range: DateFilter; // Needs to be serializable to not a Date Object
  metrics: FormState; // contains the labels and values to display selected filter data
};

// Internal Context State (allows for unserializable Date objects) of UI Filters
export type SelectedUiFilters = { dateRange: DateRange; filters: FormState };
