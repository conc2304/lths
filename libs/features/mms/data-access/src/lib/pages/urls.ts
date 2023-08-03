import {
  PageDetailRequest,
  PagesDataRequest,
  UpdatePageSettingsRequest,
  UpdatePageStatusRequest,
  DeletePageRequest,
  ComponentsListRequest,
} from './types';
export const getComponentsListUrl = (req: ComponentsListRequest) => {
  const params = [];
  const { category, limit = 1000 } = req;
  if (category != null) params.push(`category=${category}`);
  if (limit != null) params.push(`limit=${category}`);
  return `/mms/components?${params.join('&')}`;
};
export const getImagesListUrl = () => {
  return `/pages/images`;
};
export const getComponentDetailUrl = (id) => {
  return `/mms/components/${id}`;
};

export const getPagesUrl = (req: PagesDataRequest) => {
  const params = [];
  const { page, page_size = 25, sort_key, sort_order } = req;
  if (page != null) params.push(`offset=${page * page_size}`);
  if (page_size != null) params.push(`limit=${page_size}`);
  if (sort_key != null) params.push(`sort_field=${sort_key}`);
  if (sort_order != null) params.push(`'sort_by'=${sort_order}`);

  return `/mms/pages?${params.join('&')}`;
};

export const getDefaultPagesUrl = () => `/mms/pages?is_variant=false&status=published&sort_field=name&sort_by=asc`;

export const getCreatePageUrl = () => `/mms/pages`;

export const getPageDetailUrl = (req: PageDetailRequest) => {
  const { page_id } = req;
  return `/models/page/${page_id}`;
};

export const getSavePageConstraintsUrl = (req) => {
  const { page_id } = req;
  return `/models/pages/constraints/${page_id}`;
};
export const getUpatePageSettingsUrl = (req: UpdatePageSettingsRequest) => `/models/page/settings/${req.page_id}`;

export const getEnumListUrl = (enum_id: string) => `/enums/${enum_id}`;

export const getUpcomingEvents = () => {
  const now = new Date().toISOString();
  return `/mms/events?start_date_time={"$gt":"${now}"}`;
};

export const getUpatePageStatusUrl = (req: UpdatePageStatusRequest) => `/mms/pages/update-page-status/${req.page_id}`;

export const getDeletePageUrl = (req: DeletePageRequest) => `/mms/pages/${req.page_id}`;
