import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { RBTheme, RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

import Header from './index';
import * as CTX from '../../../context';

describe('Header Component', () => {
  const useLayoutActionsMock = jest.spyOn(CTX, 'useLayoutActions');

  const renderHeader = (component: ReactNode) => {
    return render(
      <HashRouter>
        <RBThemeProvider>{component}</RBThemeProvider>
      </HashRouter>
    );
  };

  beforeEach(() => {
    useLayoutActionsMock.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  const headerLeftMock = <Box>Header Left Mock</Box>;
  const headerRightMock = <Box>Header Right Mock</Box>;

  it('renders Header component', () => {
    const { getByTestId, getByLabelText } = renderHeader(
      <Header fixedHeader={true} headerLeft={headerLeftMock} headerRight={headerRightMock} />
    );
    expect(getByTestId('Dashboard-Header--root')).toBeInTheDocument();
    expect(getByLabelText('Open Navigation Menu')).toBeInTheDocument();
  });

  it('toggles drawer visibility on icon button click', async () => {
    const drawerVisible = false;
    const setDrawerVisibilityMock = jest.fn();
    // @ts-expect-error - we dont need to pass in the rest
    useLayoutActionsMock.mockReturnValue({
      drawerVisible,
      setDrawerVisibility: setDrawerVisibilityMock,
    });

    const { getByTestId, getByLabelText } = renderHeader(
      <Header fixedHeader={true} headerLeft={headerLeftMock} headerRight={headerRightMock} />
    );

    const drawerButton = getByTestId('Dashboard-Header--drawer-toggle-btn');
    expect(drawerButton).toBeInTheDocument();

    fireEvent.click(drawerButton);

    expect(setDrawerVisibilityMock).toHaveBeenCalled();
    expect(setDrawerVisibilityMock).toHaveBeenCalledWith(!drawerVisible);
    waitFor(() => {
      expect(getByLabelText('Close Navigation Menu')).toBeInTheDocument();
    });
  });

  it('applies rotation style to the icon when drawer is visible', () => {
    const setDrawerVisibilityMock = jest.fn();
    // @ts-expect-error - we dont need to pass in the rest
    useLayoutActionsMock.mockReturnValue({
      drawerVisible: false,
      setDrawerVisibility: setDrawerVisibilityMock,
    });

    const { getByTestId } = renderHeader(
      <Header fixedHeader={true} headerLeft={headerLeftMock} headerRight={headerRightMock} />
    );

    const drawerButton = getByTestId('Dashboard-Header--drawer-toggle-btn');
    expect(drawerButton).toBeInTheDocument();
    expect(drawerButton).toHaveStyle('transform: rotate(0deg)');

    fireEvent.click(drawerButton);

    waitFor(() => {
      expect(drawerButton).toHaveStyle('transform: rotate(180deg)');
    });
  });

  it('renders AppBar instead of HeaderFullScreenStyled on mobile or tablet', () => {
    // Mock `useMediaQuery` to simulate a mobile or tablet environment
    // @ts-expect-error - mocking/spying produces type errors
    jest.spyOn(window, 'matchMedia').mockImplementation((query) => {
      return {
        matches: query.includes('(max-width:'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });

    const { getByRole } = renderHeader(
      <Header fixedHeader={true} headerLeft={headerLeftMock} headerRight={headerRightMock} />
    );
    expect(getByRole('menubar')).toBeInTheDocument();
  });

  it('renders fixed AppBar with proper styles when `fixedHeader` is true', () => {
    const { getByTestId } = renderHeader(
      <Header fixedHeader={true} headerLeft={headerLeftMock} headerRight={headerRightMock} />
    );
    expect(getByTestId('Dashboard-header--root')).toHaveStyle(`borderBottom: 1px solid ${RBTheme.palette.divider}`);
  });
});
