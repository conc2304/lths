export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type ForgotPasswordResponse = {
  // ToDo: add forgotPassword response type
  password_reset_token?: string;
  success: boolean;
  message?: string;
  error?: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordResponse = {
  // ToDo: add resetPassword response type
  success: boolean;
  message?: string;
  error?: string;
};

export type ResetPasswordRequest = {
  password_reset_token: string;
  new_password: string;
};

export type AuthenticatedSession = {
  token: string;
  userId: string;
  authenticated: boolean;
};

export type LogoutResponse = {
  status: string;
  message: string;
};

export type User = {
  email: string;
  first_name: string;
  is_active: boolean;
  is_deleted: boolean;
  last_name: string;
  password_hash: string;
  roles: string[];
  user_type: string;
  username: string;
  phone_number: string;
  // TODO - find out what format that backend has decided on
  dob: string;
  date_of_birth: string;
  city: string;
  country: string;
  zip_code: string;
  __v: string;
  _id: string;
};

export type UserResponse = {
  success: boolean;
  message: string;
  data: User;
  error?: Error;
};
