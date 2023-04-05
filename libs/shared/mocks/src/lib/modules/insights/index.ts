import GetInsightsOverviewResponse from './fixtures/get-overview';
import { MSWPathConf } from '../../types';

const insightsMockInterceptors: MSWPathConf[] = [
  {
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
