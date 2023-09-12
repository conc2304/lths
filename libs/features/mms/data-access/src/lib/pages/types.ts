import { EditorProps } from '@lths/features/mms/ui-editor';

import { CommonResponse, PaginationRequest } from '../types';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  display_order: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: { [key: string]: any };
};

export type CardViewComponentProps = ComponentProps & {
  data: {
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

export type PageItemsRequest = PaginationRequest;

export type CreatePageRequest = {
  name: string;
  is_variant: boolean | string;
  default_page_id: string;
  description?: string;
};

export type CreatePageResponse = {
  data: {
    page_id: string;
    name: string;
  };
};

export type PageType = 'Pre-Defined' | 'User-Defined';

export type PageStatus = 'DRAFT' | 'REJECTED' | 'APPROVED' | 'PUBLISHED' | 'UNPUBLISHED';

export type ComponentSchema = {
  _id: string;
  component_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: Record<string, any>;
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

export type PageConstraints = {
  _id: string;
  events: Array<Record<string, string>>;
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
};

export type PageItemsResponse = CommonResponse & {
  data: PageDetail[];
};

export type PageDetailResponse = CommonResponse & {
  data: PageDetail;
};

export type EnumValue = {
  display_order: number;
  name: string;
  value: string;
};

export type EnumListResponse = CommonResponse & {
  data: {
    _id: string;
    enum_group: string;
    enum_values: EnumValue[];
  };
};

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

export type LocationListResponse = CommonResponse & {
  data: LocationItem[];
};

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

export type UserSegmentListResponse = CommonResponse & {
  data: UserSegment[];
};

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

export type EventListResponse = {
  data: EventItem[];
};

export type UpdatePageStatusRequest = {
  page_id: string;
  status: string;
};

export type UpdatePageStatusResponse = CommonResponse & {
  data: PageDetail;
};

export type UpdatePageDetailRequest = PageDetail;

export type UpdatePageDetailResponse = CommonResponse & {
  data: PageDetail;
};

export type DeletePageRequest = {
  page_id: string;
};

export type DeletePageResponse = CommonResponse & {
  data: PageDetail;
};

export type ComponentsListRequest = {
  category?: string;
  limit?: number;
  offset?: number;
};

export type DuplicatePageDetailRequest = {
  page_id: string;
};

export type DuplicatePageDetailResponse = CommonResponse & {
  data: PageDetail;
};
