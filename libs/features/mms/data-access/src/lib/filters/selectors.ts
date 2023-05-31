import { RootState } from '../store';

export const selectFilterFormState = (state: RootState) => state.filters.formState;
export const selectFilterFormSchema = (state: RootState) => state.filters.formSchema;
export const selectFilterDateRange = (state: RootState) => state.filters.dateRange;
