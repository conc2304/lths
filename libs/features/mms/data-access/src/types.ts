export type QueryParams = {
  limit?: number;
  offset?: number;
  start_date_time?: Record<'$gt', string> | string;
  end_date_time?: Record<'$lt', string> | string;
  sort?: Record<string, number> | string;
} & Record<string, string | number | Record<string, string | number>>;
