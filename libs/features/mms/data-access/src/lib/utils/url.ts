import { PaginationRequest } from '../types';

export const convertIntoQueryParams = (req: PaginationRequest) => {
  const params = [];
  const { page = 0, page_size = 25, sort_key, sort_order } = req;
  if (page != null) params.push(`offset=${page * page_size}`);
  if (page_size != null) params.push(`limit=${page_size}`);
  if (sort_key != null && sort_order != null) params.push(`sort={"${sort_key}":"${sort_order}"}`);
  return params.join('&');
};

export const addQueryParams = (url: string, req: PaginationRequest) => {
  const queryParams = convertIntoQueryParams(req);
  return queryParams ? `${url}?${queryParams}` : url;
};

export const getEnumListUrl = (enum_id: string) => `/enums/${enum_id}`;
