import { UserProfileData } from '@lths/shared/data-access';

import { RootState } from '../store';

export const selectUserId = (state: RootState): string => state.users.user._id;

export const selectUserDisplayName = (state: RootState): string => {
  const { first_name, last_name, username } = state.users.user;
  let displayName = 'User Name';
  if (!first_name && !last_name && !username) {
    displayName = 'User Name';
  } else if (first_name || last_name) {
    displayName = `${first_name ? first_name : ''}${first_name && last_name ? ' ' : ''}${last_name ? last_name : ''}`;
  } else if (username) {
    displayName = username;
  }
  return displayName;
};

export const selectUserProfileData = (state: RootState): UserProfileData => {
  const { email, first_name, last_name, username, phone_number, date_of_birth, city, country, zip_code } =
    state.users.user;

  return { email, first_name, last_name, username, phone_number, date_of_birth, city, country, zip_code };
};
