export type PaginationRequestAssets = {
  page?: number;
  page_size?: number;
  sort_order?: string;
  sort_key?: string;
};

export type PaginationAssets = {
  page: number;
  page_size: number;
  total: number;
};

export type AssetsRequest = PaginationRequestAssets & Record<string, unknown>;

export type MediaFile = {
  url: string;
  format_label: string;
  file_extension: string;
  mime_type: string;
  description: string;
  created_at: string;
  is_finalized: boolean;
};

export type Asset = {
  id: string;
  album_id: string[];
  updated_at: string;
  _id: string;
  unique_file_name: string;
  created_on?: string;
  created_by?: string;
  original_file_name: string;
  description: string;
  original_file_size: number | null;
  file_extension: string;
  mime_type: string;
  media_type: string;
  media_files: MediaFile[];
  created_at: string;
  is_active: boolean;
  is_finalized: boolean;
  is_visible: boolean;
  is_deleted: boolean;
  is_published: boolean;
  __v: number;
};
export type AssetExtended = Asset & {
  created_at_formatted?: string;
};

export type AssetsResponse = { data: Asset[]; meta: PaginationAssets };
