export type PaginationRequest = {
  page?: number;
  page_size?: number;
  sort_order?: string;
  sort_key?: string;
};
export type Pagination = {
  page: number;
  page_size: number;
  total: number;
};
export type NotificationRequest = PaginationRequest & Record<string, unknown>;
export type Notification = {
  id: number;
  page: number;
  impressions: number;
  dateTime: any;
  //dateTime: Date;
  clickThrough: number;
  type: number;
};
export type NotificationResponse = { data: Notification[]; meta: Pagination };
