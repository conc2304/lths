import { PageItemsRequest, UpdatePageStatusRequest, DeletePageRequest, ComponentsListRequest } from './types';
export const getComponentsListUrl = (req: ComponentsListRequest) => {
  const params = [];
  const { category, limit = 1000, offset = 0 } = req;
  if (category != null) params.push(`category=${category}`);
  if (limit != null) params.push(`limit=${limit}`);
  if (offset != null) params.push(`offset=${offset}`);
  return `/mms/components?${params.join('&')}`;
};

export const getComponentDetailUrl = (id) => {
  return `/mms/components/${id}`;
};

export const getPagesUrl = (req: PageItemsRequest) => {
  const params = [];
  const { name, limit = 25, offset = 0, sort_field, sort_by } = req;
  if (offset != null) params.push(`offset=${offset}`);
  if (limit != null) params.push(`limit=${limit}`);
  if (sort_field != null) params.push(`sort_field=${sort_field}`);
  if (sort_by != null) params.push(`sort_by=${sort_by}`);
  if (name != null) params.push(`name=${name}`);

  return `/mms/pages?${params.join('&')}`;
};

export const getDefaultPagesUrl = () =>
  `/mms/pages?is_variant=false&status=published&sort_field=name&sort_by=asc&offset=0&limit=1000`;

export const getCreatePageUrl = () => `/mms/pages`;

export const getPageDetailUrl = (page_id: string) => {
  return `/mms/pages/${page_id}`;
};

export const getLocationsUrl = () => `/locations`;

export const getUserSegmentsUrl = () => `/user-segments`;

export const getUpcomingEvents = () => {
  const now = new Date().toISOString();
  return `/mms/events?start_date_time={"$gt":"${now}"}`;
};

export const getUpatePageStatusUrl = (req: UpdatePageStatusRequest) => `/mms/pages/update-page-status/${req.page_id}`;

export const getUpdatePageDetailsUrl = (page_id: string) => `/mms/pages/${page_id}`;

export const getDeletePageUrl = (req: DeletePageRequest) => `/mms/pages/${req.page_id}`;

export const getDuplicatePageUrl = () => `/mms/pages/duplicate`;
