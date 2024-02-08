import { api } from '@lths/shared/data-access';

import { getFeatureFlagsUrl } from './urls';
import { ApiResponse } from '../../types';

const FT_FLAG_TAG = 'FT_FLAGS';
const VIRTUAL_ID = 'FT_FLAGS_CACHE';

export const featureFlagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<ApiResponse<any>, void>({
      query: () => ({
        url: getFeatureFlagsUrl(),
        method: 'GET',
      }),
      // Provides a list of `Events` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags,
      // this query will re-run to be always up-to-date.
      // The `VIRTUAL_ID` id is a "virtual id" that is made up to be able
      // to invalidate this query specifically if a new `Events` element was added

      // //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
      // providesTags: (responseData) => {
      //   // an error occurred, but we still want to refetch this query when `{ type: 'EVENTS_TAG', id: 'VIRTUAL_ID' }` is invalidated
      //   const onErrorTags = [{ type: FT_FLAG_TAG, id: VIRTUAL_ID }];

      //   if (!responseData) return onErrorTags;

      //   const { events, eventStates } = responseData;
      //   return featureFlags &&
      //     ? [
      //         ...events.map(({ eventId }) => ({ type: FT_FLAG_TAG, id: eventId } as const)),
      //         { type: FT_FLAG_TAG, id: VIRTUAL_ID },
      //       ]
      //     : onErrorTags;
      // },
    }),
    // createEvent: builder.mutation<CreateEventResponse, CreateEventPayload>({
    //   query: (eventValues) => ({
    //     url: createEventUrl(),
    //     method: 'POST',
    //     body: eventValues,
    //   }),
    //   // Invalidates all EVENT-type queries providing the `VIRTUAL_ID` id
    //   // depending of the sort order,
    //   // that newly created EVENT could show up in any lists.
    //   //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
    //   invalidatesTags: [{ type: EVENTS_TAG, id: VIRTUAL_ID }],
    // }),
    // updateEvent: builder.mutation<UpdateEventResponse, UpdateEventArgs>({
    //   query: ({ id, payload }) => ({
    //     url: updateEventUrl(id),
    //     method: 'PATCH',
    //     body: payload,
    //   }),
    //   //@ts-expect-error: type definition doesn't reflect with injectEndpoints method
    //   // Invalidates all queries that subscribe to this EVENT `id` only.
    //   // `getEvents` *might*  rerun, if this id was under its results.
    //   invalidatesTags: (result, error, { payload: { event_id } }) => {
    //     if (!event_id) return;
    //     return [{ type: EVENTS_TAG, id: event_id }];
    //   },
    // }),
  }),
});
