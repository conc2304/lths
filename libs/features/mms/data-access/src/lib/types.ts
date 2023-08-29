export type Pagination = {
  limit: number;
  offset: number;
  currPage: number;
  totalItems: number;
};

export type CommonResponse = {
  success: boolean;
  message: string;
  error?: {
    statusCode: number;
    type: string;
    timestamp: string;
    path: string;
  };
  pagination?: Pagination;
};
