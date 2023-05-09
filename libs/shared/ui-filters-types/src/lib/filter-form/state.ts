import { DateFilter } from './date-range';
import { FormSchema, FormState } from './forms';

export type FilterFormState = {
  formSchema: FormSchema[];
  formState: FormState;
  dateRange: DateFilter;
};
