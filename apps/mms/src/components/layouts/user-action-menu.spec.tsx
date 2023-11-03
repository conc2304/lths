import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { UserActionMenu } from './user-action-menu';

// Mock the UserProfileMenu and SupportMenu components
jest.mock('./user-profile-menu', () => ({
  UserProfileMenu: () => <div data-testid="User-Profile-Menu--mock">Mocked UserProfileMenu</div>,
}));
jest.mock('./support-menu', () => ({
  SupportMenu: () => <div data-testid="Support-Menu--mock">Mocked SupportMenu</div>,
}));

describe('UserActionMenu component', () => {
  const renderWithTheme = () => render(<UserActionMenu />, { wrapper: RBThemeProvider });

  it('renders UserActionMenu', () => {
    const { getByTestId } = renderWithTheme();
    const userActionMenu = getByTestId('Toolbar-UserActionMenu--root');
    expect(userActionMenu).toBeInTheDocument();
  });

  it('opens and closes the Popper when info button is clicked', async () => {
    const { getByTestId, queryByTestId } = renderWithTheme();
    const infoButton = getByTestId('Toolbar--info-menu-button');

    expect(infoButton).toBeInTheDocument();

    // Initially, Popper should be closed
    expect(queryByTestId('User-Profile-Menu--mock')).toBeNull();
    expect(queryByTestId('Support-Menu--mock')).toBeNull();

    // Click on the info button to open the Popper
    fireEvent.click(infoButton);

    // Now, the Popper with SupportMenu should be visible
    await waitFor(() => {
      expect(getByTestId('Support-Menu--mock')).toBeInTheDocument();
    });

    // Click again to close the Popper
    fireEvent.click(infoButton);

    // Popper should be closed again
    await waitFor(() => {
      expect(queryByTestId('Support-Menu--mock')).toBeNull();
    });
  });

  it('opens the Popper with UserProfileMenu when profile button is clicked', async () => {
    const { getByTestId, queryByTestId } = renderWithTheme();
    const infoButton = getByTestId('Toolbar--support-menu-button');

    expect(infoButton).toBeInTheDocument();

    // Initially, Popper should be closed
    expect(queryByTestId('User-Profile-Menu--mock')).toBeNull();
    expect(queryByTestId('Support-Menu--mock')).toBeNull();

    // Click on the info button to open the Popper
    fireEvent.click(infoButton);

    // Now, the Popper with User Profile Menu should be visible
    await waitFor(() => {
      expect(getByTestId('User-Profile-Menu--mock')).toBeInTheDocument();
    });

    // Click again to close the Popper
    fireEvent.click(infoButton);

    // Popper should be closed again
    await waitFor(() => {
      expect(queryByTestId('User-Profile-Menu--mock')).toBeNull();
    });
  });

  it('closes the popper on clickaway', async () => {
    const { getByTestId, queryByTestId } = renderWithTheme();
    const infoButton = getByTestId('Toolbar--support-menu-button');

    expect(infoButton).toBeInTheDocument();

    // Click on the info button to open the Popper
    fireEvent.click(infoButton);

    // Now, the Popper with User Profile Menu should be visible
    await waitFor(() => {
      expect(getByTestId('User-Profile-Menu--mock')).toBeInTheDocument();
    });

    // Click again to close the Popper
    fireEvent.click(document.querySelector('body'));

    // Popper should be closed again
    await waitFor(() => {
      expect(queryByTestId('User-Profile-Menu--mock')).toBeNull();
    });
  });
});
