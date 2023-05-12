import { RootState } from '../store';

export const selectFilterFormState = (state: RootState) => state.filters.formState;
export const selectFilterFormSchema = (state: RootState) => state.filters.formSchema;
export const selectFilterDateRange = (state: RootState) => state.filters.dateRange;
export const selectFilterSettings = (state: RootState) => {
  const {
    formState,
    dateRange: { start_date, end_date },
  } = state.filters;

  // state.filters
  const dateRange = {
    start_date: start_date ? start_date : null,
    end_date: end_date ? end_date : null,
  };

  return {
    metrics: formState,
    date_range: dateRange,
  };
};
