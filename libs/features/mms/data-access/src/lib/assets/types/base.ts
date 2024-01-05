export type PaginationRequestAssetsProps = {
  page?: number;
  page_size?: number;
  sort_order?: string;
  sort_key?: string;
  filter?: string;
  queryString?: string;
};


export type MediaFileProps = {
  url: string;
  format_label: string;
  file_extension: string;
  mime_type: string;
  description: string;
  created_at: string;
  is_finalized: boolean;
};

export type AssetsRequestProps = PaginationRequestAssetsProps & Record<string, unknown>;

export type AssetProps = {
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
  media_files: MediaFileProps[];
  created_at: string;
  is_active: boolean;
  is_finalized: boolean;
  is_visible: boolean;
  is_deleted: boolean;
  is_published: boolean;
  __v: number;
};
export type PreviewAssetRowProps = { asset: AssetProps; rowIndex: number };

export type AssetExtendedListProps = AssetProps & {
  created_at_formatted?: string;
};
