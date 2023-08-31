import { AssetsRequest } from './types';

export const getAssetsUrl = (req: AssetsRequest) => {
  const params = [];
  const { page = 0, page_size = 25 } = req;
  if (page != null) params.push(`offset=${page * page_size}`);
  if (page_size != null) params.push(`limit=${page_size}`);
  return `/media/query?${params.join('&')}`;
};

export const searchAssetsUrl = getAssetsUrl;

export const getAddAssetUrl = () => {
  return `/media`;
};
export const getUpdateAssetUrl = (id: string) => {
  return `/media/${id}`;
};
