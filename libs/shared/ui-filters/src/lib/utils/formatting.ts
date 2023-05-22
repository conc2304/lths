import { isArray } from 'lodash';

import {
  DateFilter,
  DateFilterOption,
  DateFilterOptions,
  DateRange,
  FilterSettingsPayload,
  FormSchema,
  FormState,
} from '@lths/types/ui-filters';

export * from './actions';

export const getInitialFormState = (formData: FormSchema[], result: FormState = {}): FormState => {
  if (!isArray(formData)) return formData;
  formData.forEach((item) => {
    if (item.data) {
      item.data.forEach((dataItem) => {
        if (dataItem.default_value) {
          dataItem.default_value.forEach((defaultValue) => {
            if (item.id === undefined) return;
            const parentID = item.id as string;

            // for each item in default value,
            // get the value and label from dataItem.data array
            const elemData = { ...(dataItem.data?.find((formElem) => formElem.id === defaultValue) as FormSchema) };
            const elemID = elemData.id as string;
            if (typeof elemData === undefined) return;
            delete elemData.seq; // don't need it where we are going

            result[parentID] = { [elemID]: elemData };
          });
        }
        if (dataItem.data) {
          getInitialFormState([{ data: dataItem.data }], result);
        }
      });
    }
  });
  return result;
};

export const getInitialDateRange = (dateOptions: DateFilterOptions): DateFilterOption | undefined => {
  return dateOptions.find((dateItem) => dateItem.isDefaultValue);
};

export const transformFormState = (formState: FormState): { [metricName: string]: Array<string> } => {
  const result: { [metricName: string]: Array<string> } = {};
  for (const section in formState) {
    if (formState[section]) {
      const sectionFields = formState[section];
      const fieldsArray = Object.keys(sectionFields);
      result[section] = fieldsArray;
    }
  }
  return result;
};

type DateRangeArg = DateRange | { start_date: string; end_date: string };

type TransformArgs = {
  formState: FormState;
  dateRange: DateRangeArg;
};

export const transformFilterOptions = ({ formState, dateRange }: TransformArgs): FilterSettingsPayload => {
  return {
    metrics: transformFormState(formState),
    date_range: transformDateRange(dateRange),
  };
};

export const transformDateRange = (dateRange: DateRangeArg): DateFilter => {
  return {
    start_date: dateRange.start_date?.toString() || '',
    end_date: dateRange.end_date?.toString() || '',
  };
};
