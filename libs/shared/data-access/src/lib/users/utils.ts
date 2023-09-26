import { AuthenticatedSession } from './types';
import { AUTH_TOKEN, AUTH_USER_ID } from '../core/constants';

export const removeAuthTokenFromStorage = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(AUTH_USER_ID);
};
export const setAuthTokenFromStorage = (accessToken: string, userId: string) => {
  localStorage.setItem(AUTH_TOKEN, accessToken);
  localStorage.setItem(AUTH_USER_ID, userId);
};
export const getAuthSessionFromStorage = (): AuthenticatedSession => {
  return {
    token: localStorage.getItem(AUTH_TOKEN),
    userId: localStorage.getItem(AUTH_USER_ID),
    authenticated: !!localStorage.getItem(AUTH_TOKEN),
  };
};
