import { ANALYTICS_API } from '@lths/shared/data-access';

import GetInsightsOverviewResponse from './fixtures/get-overview';
import { MSWPathConf } from '../../types';

const insightsMockInterceptors: MSWPathConf[] = [
  {
    api: ANALYTICS_API,
    path: '/insights/overview',
    method: 'get',
    passThrough: false,
    fail: false,
    successResponse: {
      data: GetInsightsOverviewResponse,
      status: 200,
    },
    failResponse: {
      data: {
        error: '[MOCK] Something went wrong',
      },
      status: 400,
    },
  },
];

export default insightsMockInterceptors;
