import React from 'react';
import { render } from '@testing-library/react';

import BreadcrumbTrail from './';
import { BreadcrumbTrailProps } from './types';

describe('BreadcrumbTrail component', () => {
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
