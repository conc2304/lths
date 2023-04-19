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

export const ACCOUNT_ID_COOKIE = '_lthsAccountID';
export const USER_ID_COOKIE = '_lthsUserID';
export const AUTHORIZATION_TOKEN_COOKIE = '_lthsAuthToken';

export const HOST_API = `${HOST.protocol}://${HOST.domainName}${HOST.apiPath}`;
export const ANALYTICS_API = `${HOST.protocol}://${HOST.domainName}${HOST.apiPath}`;
