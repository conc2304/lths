const BASE_PATH = '/models/users/service/ports';
export const AUTH_LOGIN_URL = `${BASE_PATH}/login`;
export const AUTH_LOGOUT_URL= `${BASE_PATH}/logout`;

export const getAuthUserByIdUrl=(userId)=>`/models/users/${userId}/service/ports/getUserById`;
