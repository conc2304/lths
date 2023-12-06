import { AssetProps } from './index';
import { ApiResponse } from '../../types';

export type AssetListResponse = ApiResponse<AssetProps[]>;

export type ArchiveAssetsResponse = ApiResponse<AssetProps>;

export type UpdateAssetResponse = ApiResponse<AssetProps>;

export type CreateAssetResponse = ApiResponse<AssetProps>;
