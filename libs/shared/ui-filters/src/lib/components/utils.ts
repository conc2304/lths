import { FormSchema, FormState } from '../context/types';

export const getInitialFormState = (formData: FormSchema[], result: FormState = {}): FormState => {
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
