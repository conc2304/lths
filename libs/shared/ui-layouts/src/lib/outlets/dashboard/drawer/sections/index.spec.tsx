import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import DrawerScrollBarContent from './index';
import * as layoutContext from '../../../../context';

// Mock the context and SimpleBar
jest.mock('../../../../context', () => ({
  useLayoutActions: jest.fn(),
}));

const mockSections = [
  // Mock data for sections not necessary here
];

describe('DrawerScrollBarContent', () => {
  const mockUseLayoutActions = layoutContext.useLayoutActions;
  const setDrawerOpenMock = jest.fn();

  beforeEach(() => {
    // @ts-expect-error - this is fine
    mockUseLayoutActions.mockImplementation(() => ({
      drawerOpen: false,
      setDrawerOpen: setDrawerOpenMock,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders DrawerScrollBarContent correctly', () => {
    render(<DrawerScrollBarContent sections={mockSections} />);
    expect(screen.getByTestId('Dashboard-Drawer--content')).toBeInTheDocument();
    expect(screen.getByTestId('Dashboard-Drawer--drawer-toggle')).toBeInTheDocument();
  });

  it('toggles drawer open state on button click', () => {
    const { getByTestId } = render(<DrawerScrollBarContent sections={mockSections} />);
    const toggleButton = getByTestId('Dashboard-Drawer--drawer-toggle');

    fireEvent.click(toggleButton);
    expect(setDrawerOpenMock).toHaveBeenCalledWith(true);
  });

  it('renders the correct icon based on drawerOpen state', () => {
    // @ts-expect-error - this is fine
    mockUseLayoutActions.mockImplementation(() => ({
      drawerOpen: true,
      setDrawerOpen: jest.fn(),
    }));

    const { rerender } = render(<DrawerScrollBarContent sections={mockSections} />);

    expect(screen.getByTestId('MenuOpenIcon')).toBeInTheDocument();

    // Change drawerOpen to false and rerender
    // @ts-expect-error - this is fine
    mockUseLayoutActions.mockImplementation(() => ({
      drawerOpen: false,
      setDrawerOpen: jest.fn(),
    }));

    rerender(<DrawerScrollBarContent sections={mockSections} />);
    expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
  });
});
