import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { RBTheme } from '@lths-mui/shared/themes';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

import { LayoutProvider } from '@lths/shared/ui-layouts';

import { PrivateLayout } from './private'; //

describe('PrivateLayout', () => {
  const renderWithWrappers = () =>
    render(
      <HashRouter>
        <LayoutProvider>
          <ThemeProvider theme={RBTheme}>{PrivateLayout}</ThemeProvider>
        </LayoutProvider>
      </HashRouter>
    );

  it('renders without crashing', () => {
    const { getByTestId } = renderWithWrappers();
    expect(getByTestId('Toolbar-HeaderLeft--root')).toBeInTheDocument();
    expect(getByTestId('Toolbar-UserActionMenu--root')).toBeInTheDocument();
    expect(getByTestId('Dashboard-layout--root')).toBeInTheDocument();
  });

  it('renders logo icon and text', () => {
    const { getByTestId } = renderWithWrappers();
    expect(getByTestId('LitehouseLogoIcon')).toBeInTheDocument();
    expect(getByTestId('LitehouseLogoText')).toBeInTheDocument();
  });
});
