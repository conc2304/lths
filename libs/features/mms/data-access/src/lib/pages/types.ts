import { ComponentProps } from '@lths/features/mms/ui-editor';

import { Pagination, PaginationRequest } from '../notifications/types';

export type CardViewComponentProps = ComponentProps & {
  constraint_data: any[];
  default_data: {
    title: string;
    desc: string;
    image: string;
    type: string;
    action: {
      type: string;
      page_id: string;
      page_link: string;
    };
  };
};
export type ComponentDetailResponse = {
  data: CardViewComponentProps;
};

export type ComponentListResponse = {
  data: ComponentProps[];
};
export type File = {
  _id: string;
  id: string;
  media_id: string;
  format_label: string;
  url: string;
  height: number;
  width: number;
  finalized: boolean;
  modelName: string;
  createTime: string;
  endpoint: string;
  portFlow: Array<string>;
  domain: string;
};

export type ImagesProps = {
  _id: string;
  id: string;
  owner_id: string;
  owner_type: string;
  original_file_name: string;
  original_content_type: string;
  original_file_size: number;
  finalized: boolean;
  created_at: string;
  updated_at: string;
  media_type: string;
  visible: boolean;
  deleted: boolean;
  published: boolean;
  is_active: boolean;
  modelName: string;
  createTime: string;
  endpoint: string;
  portFlow: Array<string>;
  domain: string;
  updateTime: string;
  files: File[];
};

export type ImagesListResponse = {
  data: ImagesProps[];
};

export type PagesDataRequest = PaginationRequest & Record<string, unknown>;

export type PageData = {
  id: number;
  name: string;
  type: string;
  constraints: string;
  last_editor: string;
  status: string;
  published_on?: string;
  scheduled_on?: string;
  drafted_on?: string;
};

export type PagesDataResponse = { data: PageData[]; meta: Pagination };

export type CreatePageRequest = {
  page_id?: string;
  name: string;
  is_variant: string;
  variant_default: string;
  description?: string;
  constraint_data?: Record<string, string>[];
  default_data?: Record<string, string>[];
};

export type CreatePageResponse = {
  data: {
    page_id: string;
    name: string;
  };
};

export type PageDetailRequest = {
  page_id: string;
};

export type UpdatePageSettingsRequest = {
  page_id: string;
  name?: string;
  description?: string;
};
