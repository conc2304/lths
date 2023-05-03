import React from 'react';
import { render, screen } from '@testing-library/react';

import { BreadcrumbLink } from './link';
import { BreadcrumbPathProps } from './types';

describe('BreadcrumbLink component2', () => {
  const title = 'Home';
  const path = '/';
  const props: BreadcrumbPathProps = { title, path };

  it('should render the title prop as a link', () => {
    render(<BreadcrumbLink {...props} />);

    const linkElement = screen.getByRole('link', { name: `Navigate to ${title}` });
    //expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe(path);
  });
});
