export const MockRejectedAction = (status = 403, message = '') => ({
  type: 'api/executeQuery/rejected',
  payload: {
    status: status,
    data: {
      success: false,
      message: message,
      error: {
        statusCode: status,
        type: 'ForbiddenException',
        timestamp: '2023-10-04T18:20:59.943Z',
        path: '/api/enums/EventType',
      },
    },
  },
  meta: {
    baseQueryMeta: { request: {}, response: {} },
    RTK_autoBatch: true,
    arg: {
      type: 'query',
      subscribe: true,
      forceRefetch: true,
      subscriptionOptions: { pollingInterval: 0 },
      endpointName: 'getEnumList',
      originalArgs: 'EventType',
      queryCacheKey: 'getEnumList("EventType")',
    },
    requestId: 'wk2W5smgHNXHKDEAN6olC',
    rejectedWithValue: true,
    requestStatus: 'rejected',
    aborted: false,
    condition: false,
  },
  error: { message: 'Rejected' },
});

export const MockFulfilledAction = {
  type: 'api/executeQuery/fulfilled',
  payload: {},
  meta: {
    fulfilledTimeStamp: 1696447092925,
    baseQueryMeta: { request: {}, response: {} },
    RTK_autoBatch: true,
    arg: {
      type: 'query',
      subscribe: true,
      forceRefetch: true,
      endpointName: 'getEvents',
    },
    requestId: 'jwEh6J4TCzF5zg0tIae1S',
    requestStatus: 'fulfilled',
  },
};
