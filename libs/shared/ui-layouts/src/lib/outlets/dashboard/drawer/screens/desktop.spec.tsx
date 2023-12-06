import React from 'react';
import { RBTheme, RBThemeProvider } from '@lths-mui/shared/themes';
import { render } from '@testing-library/react';

import { ClosedMixin, DesktopDrawer, OpenedMixin } from './desktop';

const renderWithTheme = (component) => render(component, { wrapper: RBThemeProvider });

describe('DesktopDrawer', () => {
  const theme = RBTheme;
  it('renders without crashing', () => {
    renderWithTheme(<DesktopDrawer />);
  });

  it('applies OpenedMixin styles when open', () => {
    const { getByTestId, container } = renderWithTheme(<DesktopDrawer open />);
    console.log(container);
    const drawer = getByTestId('Dashboard-Drawer--desktop-root');
    // Replace this with actual checks for the styles applied by OpenedMixin
    expect(drawer).toHaveStyle(OpenedMixin(theme));
  });

  it('applies ClosedMixin styles when not open', () => {
    const { getByTestId } = renderWithTheme(<DesktopDrawer open={false} />);
    const drawer = getByTestId('Dashboard-Drawer--desktop-root');

    expect(drawer).toHaveStyle(ClosedMixin(theme));
    // Replace this with actual checks for the styles applied by ClosedMixin
  });

  // Additional tests here...
});
