import { EditorProps } from '@lths/features/mms/ui-editor';

import { ApiResponse } from '../types';

export type ComponentProps = {
  __ui_id__: string; // need to be replaced with _id or component_id in all the places
  _id: string;
  variation_id: string;
  component_id: string;
  name: string;
  description: string;
  category?: string;
  image_url: string;
  constraints: Array<Record<string, string>>;
  data: Record<string, unknown>;
  display_order: number;
  schema: { [key: string]: unknown };
};

export type ComponentDetailResponse = ApiResponse<ComponentProps>;

export type ComponentListResponse = ApiResponse<ComponentProps[]>;

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

export type PageItemsRequest = {
  name?: string;
  limit?: string;
  offset?: string;
  sort_field?: string;
  sort_by?: string;
};

export type CreatePageRequest = {
  name: string;
  is_variant: boolean | string;
  default_page_id?: string | null;
  description?: string;
  page_id: string;
};

export type CreatePageResponse = ApiResponse<{
  page_id: string;
  name: string;
}>;

export enum PageType {
  PreDefined = 'Pre-Defined',
  UserDefined = 'User-Defined',
}

export type PageStatus = 'DRAFT' | 'REJECTED' | 'APPROVED' | 'PUBLISHED' | 'UNPUBLISHED';

export type ComponentSchema = {
  _id: string;
  component_id: string;
  schema: Record<string, unknown>;
  image_url: string;
};

export type Location = {
  _id: string;
  name: string;
  location: {
    type: string;
    lat: number;
    long: number;
    radius: number;
    unit: string;
    area_type: string;
  };
};

export type EventConstraint = Record<string, string | string[]>;

export type PageConstraints = {
  _id: string;
  events: EventConstraint[];
  locations: Location[];
  user_segments: UserSegment[];
};

export type PageDetail = EditorProps & {
  _id: string;
  page_id: string;
  type: PageType;
  name: string;
  description: string;
  is_variant: boolean;
  status: PageStatus;
  components_schema: ComponentSchema[];
  default_page_id: string;
  default_page_name: string;
  constraints: PageConstraints;
  approved_by?: string;
  approved_on?: string;
  created_by?: string;
  created_on?: string;
  published_by?: string;
  published_on?: string;
  rejected_by?: string;
  rejected_on?: string;
  unpublished_by?: string;
  unpublished_on?: string;
  updated_by?: string;
  updated_on?: string;
  deleted_by?: string;
  deleted_on?: string;
  is_deleted?: boolean;
  constraints_formatted?: string;
};

export type PageItemsResponse = ApiResponse<PageDetail[]>;

export type PageDetailResponse = ApiResponse<PageDetail>;

export type LocationItem = {
  _id: string;
  name: string;
  location: {
    type: string;
    lat: number;
    long: number;
    radius: number;
    unit: string;
    area_type: string;
  };
  display_order: number;
};

export type LocationListResponse = ApiResponse<LocationItem[]>;

export type UserSegment = {
  _id: string;
  segment_id: string;
  name: string;
  description: string;
  properties: {
    type: string;
    value: string;
  };
  display_order?: number;
};

export type UserSegmentListResponse = ApiResponse<UserSegment[]>;

export type EventItem = {
  _id: string;
  event_id: string;
  state: string;
  __v: number;
  actual_end_date_time: string;
  actual_start_date_time: string;
  created_on: string;
  deleted_on: string;
  description: string;
  duration_in_seconds: number;
  end_date_time: string;
  is_deleted: boolean;
  is_subject_to_change: boolean;
  name: string;
  source: string;
  start_date_time: string;
  type: string;
  updated_on: string;
  visibility: string;
};

export type EventListResponse = ApiResponse<EventItem[]>;

export type UpdatePageStatusRequest = {
  page_id: string;
  status: string;
};

export type UpdatePageStatusResponse = ApiResponse<PageDetail>;

export type UpdatePageDetailRequest = PageDetail;

export type UpdatePageDetailResponse = ApiResponse<PageDetail>;

export type UpdatePageNameRequest = {
  name: string;
  page_id: string;
};

export type DeletePageRequest = {
  page_id: string;
};

export type DeletePageResponse = ApiResponse<PageDetail>;

export type ComponentsListRequest = {
  category?: string;
  limit?: number;
  offset?: number;
};

export type DuplicatePageDetailRequest = {
  page_id: string;
};

export type DuplicatePageDetailResponse = ApiResponse<PageDetail>;
