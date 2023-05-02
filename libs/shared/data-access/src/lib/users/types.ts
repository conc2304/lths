export type LoginResponse = {
  token: string;
  user_id: string;
};

export type LoginRequest = {
  email: string;
  password: string;
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

export type UserResponse = {
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
