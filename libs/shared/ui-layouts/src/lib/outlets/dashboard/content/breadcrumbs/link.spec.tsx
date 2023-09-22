import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import { BreadcrumbLink } from './link';
import { BreadcrumbPathProps } from './types';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('BreadcrumbLink component2', () => {
  const title = 'Home';
  const path = '/';
  const props: BreadcrumbPathProps = { title, path };
  
  const navigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigate);

  it('should render the title prop as a link', () => {
    render(<BreadcrumbLink {...props} />);

    const linkElement = screen.getByRole('link', { name: `Navigate to ${title}` });

    fireEvent.click(linkElement);

    expect(navigate).toHaveBeenCalledWith(path);
  });
});
