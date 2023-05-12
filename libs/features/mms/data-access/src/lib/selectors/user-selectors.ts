import { RootState } from '../store';
export const selectUserId = (state: RootState): string => state.users.user._id;
