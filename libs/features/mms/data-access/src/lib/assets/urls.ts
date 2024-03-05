import { AssetsRequestProps } from './types';

export const getAssetsUrl = (req: AssetsRequestProps) => {
  const params = [];
  const { page = 0, page_size = 25 } = req;
  if (page != null) params.push(`offset=${page * page_size}`);
  if (page_size != null) params.push(`limit=${page_size}`);
  return `/media/query?${params.join('&')}`;
};

export const getAddAssetUrl = () => {
  return `/media`;
};

export const getUpdateAssetUrl = (id: string) => {
  return `/media/${id}`;
};
export const getSecureCloudUploadUrl = (fileName: string) => {
  return `/cloud/signed-upload-url?fileName=${encodeURIComponent(fileName)}`;
};
