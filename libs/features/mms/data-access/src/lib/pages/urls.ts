import {
  PageDetailRequest,
  PagesDataRequest,
  UpdatePageSettingsRequest,
  UpdatePageStatusRequest,
  DeletePageRequest,
} from './types';
export const getComponentsListUrl = () => {
  return `/mms/components`;
};
export const getImagesListUrl = () => {
  return `/pages/images`;
};
export const getComponentDetailUrl = (id) => {
  return `/pages/component-details?id=${id}`;
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

export const getAllFilters = () => `/mms/filters`;

export const getUpcomingEvents = () => `/events/upcoming`;

export const getUpatePageStatusUrl = (req: UpdatePageStatusRequest) => `/mms/pages/update-page-status/${req.page_id}`;

export const getDeletePageUrl = (req: DeletePageRequest) => `/mms/pages/${req.page_id}`;
