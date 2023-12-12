export type Pagination = {
  limit: number;
  offset: number;
  currPage: number;
  totalItems: number;
};

export type PaginationRequest = {
  page?: number;
  page_size?: number;
  sort_order?: string;
  sort_key?: string;
};

export type Error = {
  statusCode: number;
  type: string;
  timestamp: string;
  path: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  pagination?: Pagination;
  error?: Error;
};

export type QueryParams = {
  limit?: number;
  offset?: number;
  start_date_time?: Record<'$gt', string> | string;
  end_date_time?: Record<'$lt', string> | string;
  sort?: Record<string, number> | string;
} & PaginationRequest &
  Record<string, string | number | Record<string, string | number>>;
