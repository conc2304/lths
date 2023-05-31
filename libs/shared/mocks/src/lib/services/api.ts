import { ANALYTICS_API } from '@lths/shared/data-access';
import { HOST_API } from '@lths/shared/data-access';
import { HOST } from '@lths/shared/data-access';

import { MSWPathConf } from './types';

export const isRelativePath = (url: URL) => {
  const { host, pathname } = url;
  return pathname.startsWith(HOST.apiPath) || host !== HOST.domainName;
};
export const getApiFullPath = (api: string, path: string | RegExp) => {
  if (path instanceof RegExp) return path;
  if (api.includes('undefined')) return `*${path}`;
  if (api || HOST_API) return `${api || HOST_API}${path}`;
  else return path;
};
export const PathDefaults = {
  api: ANALYTICS_API,
  failureResponse: {
    data: {
      error: '[MOCK] Something went wrong',
    },
    status: 400,
  },
};
export const getSuccessfulResponse = (
  path: string | RegExp,
  data: Record<string, unknown> | Record<string, unknown>[]
): MSWPathConf => {
  return {
    ...PathDefaults,
    path,
    method: 'get',
    passThrough: false,
    fail: false,
    successResponse: {
      data,
      status: 200,
    },
  };
};
