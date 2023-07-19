import { PageDetailRequest, PagesDataRequest, UpdatePageSettingsRequest } from './types';
export const getComponentsListUrl = () => {
  return `/pages/components`;
};
export const getImagesListUrl = () => {
  return `/pages/images`;
};
export const getComponentDetailUrl = (id) => {
  return `/pages/component-details?id=${id}`;
};

export const getPagesUrl = (req: PagesDataRequest) => {
  const params = [];
  const { page, page_size, sort_key, sort_order } = req;
  if (page != null) params.push(`page=${page}`);
  if (page_size != null) params.push(`page_size=${page_size}`);
  if (sort_key != null) params.push(`sort_key=${sort_key}`);
  if (sort_order != null) params.push(`page=${sort_order}`);

  return `/pages?${params.join('&')}`;
};

export const getDefaultPagesUrl = () => `/mms/pages?is_variant=false&status=published&sort_field=name&sort_by=asc`;

export const getCreatePageUrl = () => `/mms/pages`;

export const getPageDetailUrl = (req: PageDetailRequest) => {
  const { page_id } = req;
  return `/models/page/${page_id}`;
};

export const getUpatePageSettingsUrl = (req: UpdatePageSettingsRequest) => `/models/page/settings/${req.page_id}`;
