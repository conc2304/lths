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

export type UserResponse_LEGACY = {
  //accounts: LTHS_Account[];
  biography: string;
  current_sign_in_at: string;
  current_sign_in_ip: string | number;
  default_account_id: string;
  email: string;
  id: string;
  last_password_reset_at: string;
  last_sign_in_at: string;
  name: string;
  password_reset_token: string;
  sign_in_count: number;
  username: string;
  website_url: string;
  userFetched: boolean;
};

export type User = {
  email: string;
  first_name: string;
  is_active: boolean;
  is_deleted: boolean;
  last_name: string;
  password_hash: string;
  roles: unknown[];
  user_type: unknown;
  username: string;
  phone_number: string;
  // TODO - find out what format that backend has decided on
  dob: string;
  date_of_birth: string;
  city: string;
  country: string;
  zip_code: string;
  __v: number;
  _id: string;
};

export type UserProfileData = {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  date_of_birth: string;
  city: string;
  country: string;
  zip_code: string;
};

export type UserResponse = {
  success: boolean;
  message: string;
  data: User;
  error?: Error;
};
