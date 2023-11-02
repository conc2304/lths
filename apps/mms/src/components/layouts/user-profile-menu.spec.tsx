import React, { ReactNode } from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import mockConfigureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as MMS_DA from '@lths/features/mms/data-access';
import * as Shared_DA from '@lths/shared/data-access';
import { api } from '@lths/shared/data-access';

import { UserProfileMenu } from './user-profile-menu';

const middlewares = [thunk];
const mockStore = mockConfigureStore(middlewares);

describe('UserProfileMenu', () => {
  const useLogoutMutationMock = jest.spyOn(Shared_DA, 'useLogoutMutation');
  const useAppSelectorMock = jest.spyOn(MMS_DA, 'useAppSelector');
  const selectUserIdMock = jest.spyOn(MMS_DA, 'selectUserId');
  let store: MockStoreEnhanced;

  const userIdMock = '123';

  beforeEach(() => {
    useLogoutMutationMock.mockClear();
    useAppSelectorMock.mockClear();
    selectUserIdMock.mockClear();

    store = mockStore({
      api: api.reducer,
      user: {
        email: 'mock@email.com',
        first_name: 'John',
        last_name: 'Doe',
        username: 'JonnyD',
        _id: userIdMock,
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  const renderWithWrappers = (component: ReactNode) =>
    render(<Provider store={store}>{component}</Provider>, { wrapper: RBThemeProvider });

  it('renders UserProfileMenu', async () => {
    selectUserIdMock.mockReturnValue(userIdMock);
    const logoutMock = jest.fn();
    // @ts-expect-error - this is expected
    useLogoutMutationMock.mockReturnValue([logoutMock]);

    const { getByTestId, getByText } = renderWithWrappers(<UserProfileMenu />);

    // Check if UserProfileMenu renders correctly
    const userProfileMenuRoot = getByTestId('User-Profile-Menu--root');

    expect(userProfileMenuRoot).toBeInTheDocument();

    // Check if "Edit Profile" and "Logout" buttons are present
    const editProfileButton = getByText('Edit Profile');
    const logoutButton = getByText('Logout');
    expect(editProfileButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();

    // Simulate a click on the "Logout" button
    fireEvent.click(logoutButton);

    // Check if the logout function is called
    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(logoutMock).toHaveBeenCalledWith(userIdMock);
  });
});
