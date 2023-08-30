import React, { useState } from 'react';
import { Button, Toolbar } from '@mui/material';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { PageContentWithRightDrawer, PageContentWithRightDrawerProps } from '../drawer-right';

describe('PageContentWithRightDrawer Component', () => {
  let props: PageContentWithRightDrawerProps;
  let handleDrawerCloseMock: jest.Mock;
  let handleDrawerOpenMock: jest.Mock;
  beforeEach(() => {
    // Set up the props for each test case
    handleDrawerCloseMock = jest.fn();
    handleDrawerOpenMock = jest.fn();

    props = {
      open: true,
      handleDrawerClose: handleDrawerCloseMock,
      title: 'Test Title',
      drawerContent: <div>test drawer content</div>,
    };
  });

  afterEach(() => {
    // Set up the props for each test case
    jest.clearAllMocks();
  });

  const DrawerSetup = () => {
    const [open, setOpen] = useState(false);
    props.open = open;
    props.handleDrawerClose = () => {
      handleDrawerCloseMock();
      setOpen(false);
    };
    const onOpen = () => {
      handleDrawerOpenMock();
      setOpen(!open);
    };

    return (
      <PageContentWithRightDrawer {...props}>
        <Toolbar />
        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'grey' }}>
          <Button onClick={onOpen}>Open Drawer</Button>
        </div>
      </PageContentWithRightDrawer>
    );
  };

  test('should render PageContentWithRightDrawer component with correct values', () => {
    props.open = true;
    render(<PageContentWithRightDrawer {...props} />);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('test drawer content')).toBeInTheDocument();
  });

  test('should render PageContentWithRightDrawer component with correct drawer width', () => {
    props.open = true;
    props.drawerWidth = 500;
    render(<PageContentWithRightDrawer {...props} />);

    const drawer = screen.getByTestId('Right Drawer');

    // Assert
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveStyle(`width: 500px;`);
  });

  test.skip('should make PageContentWithRightDrawer visibility change on open and close', async () => {
    render(<DrawerSetup />);

    // Assert
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('test drawer content')).toBeInTheDocument();

    // The drawer should be in the DOM
    const drawer = screen.getByTestId('Right Drawer').querySelector('div');
    expect(drawer).toBeInTheDocument();

    // Verify that the drawer content is not visible when closed
    expect(drawer).not.toBeVisible();

    // Act
    const openButton = screen.getByText('Open Drawer');
    expect(openButton).toBeInTheDocument();
    fireEvent.click(openButton);

    // Assert Drawer is still rendered
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('test drawer content')).toBeInTheDocument();

    expect(handleDrawerOpenMock).toHaveBeenCalledTimes(1);
    expect(drawer).toBeVisible();

    // Act
    const closeButton = screen.getByLabelText('Close Drawer') as HTMLButtonElement;
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    expect(handleDrawerCloseMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(drawer).not.toBeVisible();
    });
  });
});
