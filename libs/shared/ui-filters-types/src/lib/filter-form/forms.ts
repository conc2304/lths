export type FilterFormResponse = { data: FormSchema[] };

export type FormDataType = 'checkbox' | 'range' | 'textfield' | 'textarea' | 'select' | 'radio' | null;

export type Seq = number | [number, number] | undefined;

export type FormSchema = {
  title?: string | null;
  subtitle?: string | null;
  info?: {
    description: string;
    url: string;
  };
  seq?: Seq;
  id?: string;
  type?: FormDataType;
  default_value?: Array<string | { id: string; value: string | number }>;
  data?: FormSchema[];
};

export type FormStateValue = { [id: string]: { id?: string; title?: string | null; value?: string | number } };
export type FormState = {
  [id: string]: FormStateValue;
};
