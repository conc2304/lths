import { AssetProps, PaginationAssetsProps } from './index';
import { ApiResponse } from '../../types';

type AssetList = { data: AssetProps[]; meta: PaginationAssetsProps };

export type AssetListResponse = ApiResponse<AssetList>;

export type ArchiveAssetsResponse = ApiResponse<AssetProps>;

export type UpdateAssetResponse = ApiResponse<AssetProps>;

export type CreateAssetResponse = ApiResponse<AssetProps>;
