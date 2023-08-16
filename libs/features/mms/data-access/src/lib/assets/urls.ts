import { AssetsRequest } from './types';

export const getAssetsUrl = (req: AssetsRequest) => {
  const params = [];
  const { page, page_size = 25 } = req;
  if (page != null) params.push(`offset=${page * page_size}`);
  if (page_size != null) params.push(`limit=${page_size}`);
  return `/media?${params.join('&')}`;
};

export const getAddAssetUrl = () => {
  return `/media`;
};
export const getUpdateAssetUrl = (id: string) => {
  return `/media/${id}`;
};
