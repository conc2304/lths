import React from 'react';
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import BreadcrumbTrail from './';
import { BreadcrumbTrailProps } from './types';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('BreadcrumbTrail component', () => {
  const navigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigate);
  
  it('should render the paths and activePageTitle props', () => {
    const paths = [
      { title: 'Home', path: '/' },
      { title: 'About', path: '/about' },
      { title: 'Contact', path: '/contact' },
    ];
    const activePageTitle = 'Page Title';
    const props: BreadcrumbTrailProps = { paths, activePageTitle };
    render(<BreadcrumbTrail {...props} />);
    //TODO: work in progress
  });
});
