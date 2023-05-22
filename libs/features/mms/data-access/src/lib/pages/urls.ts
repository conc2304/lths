import { PagesDataRequest } from './types';

export const getPagesUrl = (req: PagesDataRequest) => {
  const params = [];
  const { page, page_size, sort_key, sort_order } = req;
  if (page != null) params.push(`page=${page}`);
  if (page_size != null) params.push(`page_size=${page_size}`);
  if (sort_key != null) params.push(`sort_key=${sort_key}`);
  if (sort_order != null) params.push(`page=${sort_order}`);

  return `/pages?${params.join('&')}`;
};
