import { api } from '@lths/shared/data-access';

import { NotificationResponse, NotificationRequest } from './types';
import { getNotificationUrl } from './urls';

export const userApi = api.enhanceEndpoints({ addTagTypes: ['Notification'] }).injectEndpoints({
  endpoints: (builder) => ({
    getNotificationItems: builder.query<NotificationResponse, NotificationRequest>({
      query: (request: NotificationRequest) => ({
        url: getNotificationUrl(request),
        method: 'GET',
      }),

      //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const { useGetNotificationItemsQuery, useLazyGetNotificationItemsQuery } = userApi;
