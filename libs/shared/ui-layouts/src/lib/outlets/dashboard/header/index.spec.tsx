import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { RBTheme, RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
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
    const { getByTestId } = renderHeader(
      <Header fixedHeader={true} headerLeft={headerLeftMock} headerRight={headerRightMock} />
    );
    expect(getByTestId('Dashboard-Header--root')).toBeInTheDocument();
  });

  it('renders fixed AppBar with proper styles when `fixedHeader` is true', () => {
    const { getByTestId } = renderHeader(
      <Header fixedHeader={true} headerLeft={headerLeftMock} headerRight={headerRightMock} />
    );
    expect(getByTestId('Dashboard-header--root')).toHaveStyle(`borderBottom: 1px solid ${RBTheme.palette.divider}`);
  });
});
