/* eslint-disable import/order */
import React from 'react';
import { render, screen } from '@testing-library/react';

import { BreadcrumbTitle } from './title';
import '@testing-library/jest-dom';

describe('BreadcrumbTitle component', () => {
  it('should render the title prop', () => {
    const title = 'Page Title';
    render(<BreadcrumbTitle title={title} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });
});
