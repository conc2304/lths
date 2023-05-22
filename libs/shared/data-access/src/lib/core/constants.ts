export const HOST = {
  protocol: process.env.NX_PUBLIC_HOST_PROTOCOL,
  domainName: process.env.NX_PUBLIC_API_HOST_DOMAIN,
  apiPath: process.env.NX_PUBLIC_API_HOST_VERSION_PATH,
};

export const ANALYTICS_HOST = {
  protocol: process.env.NX_PUBLIC_ANALYTICS_HOST_PROTOCOL,
  domainName: process.env.NX_PUBLIC_ANALYTICS_API_HOST_DOMAIN,
  apiPath: process.env.NX_PUBLIC_ANALYTICS_API_HOST_VERSION_PATH,
};

export const AUTH_USER_ID = '__lths_user_id';
export const AUTH_TOKEN = '__lths_auth_token';

export const HOST_API = `${HOST.protocol}://${HOST.domainName}${HOST.apiPath}`;
export const ANALYTICS_API = `${HOST.protocol}://${HOST.domainName}${HOST.apiPath}`;
