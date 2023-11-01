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
