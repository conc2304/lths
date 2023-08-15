import { AssetsRequest } from './types';

export const getAssetsUrl = (req: AssetsRequest) => {
  const params = [];
  const { page, page_size, sort_key, sort_order } = req;
  if (page != null) params.push(`page=${page}`);
  if (page_size != null) params.push(`page_size=${page_size}`);
  if (sort_key != null) params.push(`sort_key=${sort_key}`);
  if (sort_order != null) params.push(`sort_order=${sort_order}`);

  return `/media?${params.join('&')}`;
};

export const getAddAssetUrl = () => {
  return `/media`; // replace with actual endpoint
};

export const getUpdateAssetUrl = () => {
  return `/media`; // replace with actual endpoint
};
