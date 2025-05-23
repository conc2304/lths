const BASE_AUTH_PATH = '/authentication';
const BASE_USER_PATH = '/users';
export const AUTH_LOGIN_URL = `${BASE_AUTH_PATH}/login`;
export const AUTH_LOGOUT_URL = `${BASE_AUTH_PATH}/logout`;
export const AUTH_FORGOT_PASSWORD_URL = `${BASE_AUTH_PATH}/forgot-password`;
export const AUTH_RESET_PASSWORD_URL = `${BASE_AUTH_PATH}/reset-password`;
export const getAuthUserByIdUrl = (userId) => `${BASE_USER_PATH}/${userId}`;
export const updateUserByIdUrl = (userId: string | number) => `${BASE_USER_PATH}/${userId}`;
