import React from 'react';
import { RBThemeProvider, RBTheme } from '@lths-mui/shared/themes';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ClosedMixin, OpenedMixin } from './screens/desktop';
import MainDrawer from './side-nav-menu';
import { MockSections } from './testing-fixtures';
import * as layoutContext from '../../../context';

// Mock context and its return values
const useLayoutActionsMock = jest.spyOn(layoutContext, 'useLayoutActions');

const renderWithWrappers = (component) =>
  render(<MemoryRouter>{RBThemeProvider({ children: component })}</MemoryRouter>);

describe('MainDrawer', () => {
  // Setting up the initial state for tests
  beforeEach(() => {
    useLayoutActionsMock.mockImplementation(() => ({
      drawerOpen: true,
      setBreadcrumbs: undefined,
      setPageTitle: undefined,
      setDrawerOpen: undefined,
      setDrawerSelectedItem: undefined,
    }));
  });

  it('renders MainDrawer with header and content', () => {
    const { getByText, getByTestId } = renderWithWrappers(
      <MainDrawer sections={MockSections} drawerHeader={<div>Header Content</div>} fixedHeader={false} />
    );

    expect(getByTestId('Dashboard-Drawer--desktop-root')).toBeInTheDocument();
    expect(getByText('Header Content')).toBeInTheDocument();
    expect(getByTestId('Dashboard-Drawer--content')).toBeInTheDocument();
  });

  it('applies correct zIndex based on fixedHeader prop', () => {
    const { rerender, getByTestId } = renderWithWrappers(
      <MainDrawer sections={MockSections} drawerHeader={<div>Header Content</div>} fixedHeader={true} />
    );

    expect(getByTestId('Dashboard-Drawer--desktop-root').parentNode).toHaveStyle(`z-index: ${RBTheme.zIndex.appBar}`);

    // Rerender with fixedHeader set to false
    rerender(
      RBThemeProvider({
        children: (
          <MainDrawer
            sections={
              [
                /* ...sections data... */
              ]
            }
            drawerHeader={<div>Header Content</div>}
            fixedHeader={false}
          />
        ),
      })
    );

    // Check zIndex for non-fixedHeader
    expect(screen.getByTestId('Dashboard-Drawer--desktop-root').parentNode).toHaveStyle(
      `z-index: ${RBTheme.zIndex.drawer}`
    );
  });

  it('applies correct styles when opened', () => {
    const { getByTestId } = renderWithWrappers(
      <MainDrawer sections={MockSections} drawerHeader={<div>Header Content</div>} fixedHeader={false} />
    );

    expect(getByTestId('Dashboard-Drawer--desktop-root')).toHaveStyle(OpenedMixin(RBTheme));
  });

  it('applies correct styles when closed', () => {
    useLayoutActionsMock.mockImplementation(() => ({
      drawerOpen: false,
      setBreadcrumbs: undefined,
      setPageTitle: undefined,
      setDrawerOpen: undefined,
      setDrawerSelectedItem: undefined,
    }));
    const { getByTestId } = renderWithWrappers(
      <MainDrawer sections={MockSections} drawerHeader={<div>Header Content</div>} fixedHeader={false} />
    );

    expect(getByTestId('Dashboard-Drawer--desktop-root')).toHaveStyle(ClosedMixin(RBTheme));
  });
});
