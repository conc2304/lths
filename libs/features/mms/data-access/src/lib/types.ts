export type Pagination = {
  limit: number;
  offset: number;
  currPage: number;
  totalItems: number;
};

export type PaginationRequest = {
  page?: number;
  page_size?: number;
  sort_order?: string;
  sort_key?: string;
};

export type Error = {
  statusCode: number;
  type: string;
  timestamp: string;
  path: string;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
  pagination?: Pagination;
  error?: Error;
};

export type EnumValue<TData = string> = {
  display_order: number;
  name: string;
  value: TData;
  image_url?: string;
};

export type EnumGroupResponseData<TData = string> = {
  _id: string;
  enum_group: string;
  enum_values: EnumValue<TData>[];
};

export type EnumRequestPayload<TData> = {
  enum_values: EnumValue<TData>[];
};

export type EnumListResponse = ApiResponse<EnumGroupResponseData | null>; // apparently no data found returns a success with null for the data, instead off a 404, who would have guessed

export enum EnumGroup {
  SOCIAL_ICONS = 'SocialIcons',
  ACTION_ICONS = 'ActionIcons',
  EVENT_TYPE = 'EventType',
  FEATURE_FLAGS = 'FeatureFlags-MMS',
  PUSH_NOTIFICATION_TOPICS = 'PushNotificationTopics',
  NOTIFICATION_TYPES = 'NotificationTypes',
  PAGE_NAME = 'PageName',
  COMPONENT_CATEGORIES = 'ComponentCategories',
  LOCATION = 'Location',
  EVENT_STATE = 'EventState',
  PAGE_STATUS = 'PageStatus',
  NOTIFICATION_STATUS = 'NotificationStatus',
  PAGE_TYPE = 'PageType',
  COMPONENT_TYPE = 'ComponentType',
  NATIVE_PAGE_LIST = 'NativePageList',
}

export type QueryParams = {
  limit?: number;
  offset?: number;
  start_date_time?: Record<'$gt', string> | string;
  end_date_time?: Record<'$lt', string> | string;
  sort?: Record<string, number> | string;
} & Record<string, string | number | Record<string, string | number>>;
