const BASE_URL = '/roles';

export const readAllRolesUrl = BASE_URL;
export const createRoleUrl = BASE_URL;
export const createRoleByIdUrl = (id: string) => `${BASE_URL}/${id}`;
export const readRoleByIdUrl = (id: string) => `${BASE_URL}/${id}`;
export const updateRoleByIdUrl = (id: string) => `${BASE_URL}/${id}`;
export const deleteRoleByIdUrl = (id: string) => `${BASE_URL}/${id}`;
