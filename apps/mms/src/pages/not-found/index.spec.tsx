import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { render, screen, fireEvent } from '@testing-library/react';

import NotFound from './index'; // Import your component

// Mock the react-router-dom's useNavigate function
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('NotFound Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with the correct content', () => {
    render(<NotFound />, { wrapper: RBThemeProvider });

    // Verify that the component renders the "404" text
    const headingElement = screen.getByText('404');
    expect(headingElement).toBeInTheDocument();

    // Verify that the component renders the "Page Not Found" text
    const subheadingElement = screen.getByText('Page Not Found');
    expect(subheadingElement).toBeInTheDocument();

    // Verify that the component renders the "HOME" and "BACK" buttons
    const homeButton = screen.getByText('HOME');
    expect(homeButton).toBeInTheDocument();

    const backButton = screen.getByText('BACK');
    expect(backButton).toBeInTheDocument();
  });

  it('navigates to the home page when clicking the HOME button', () => {
    const { getByText } = render(<NotFound />, { wrapper: RBThemeProvider });

    expect(mockedUsedNavigate).not.toHaveBeenCalled();

    const homeButton = getByText('HOME');
    fireEvent.click(homeButton);

    // Verify that the navigate function was called with the correct arguments
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('navigates back when clicking the BACK button', () => {
    const { getByText } = render(<NotFound />, { wrapper: RBThemeProvider });

    expect(mockedUsedNavigate).not.toHaveBeenCalled();

    const backButton = getByText('BACK');
    fireEvent.click(backButton);

    // Verify that the navigate function was called with -1
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
  });
});
