const BASE_AUTH_PATH = '/authentication';
const BASE_USER_PATH = '/users';
export const AUTH_LOGIN_URL = `${BASE_AUTH_PATH}/login`;
export const AUTH_LOGOUT_URL = `${BASE_AUTH_PATH}/logout`;

export const getAuthUserByIdUrl = (userId) => `${BASE_USER_PATH}/${userId}`;
