import React from 'react';
import { render } from '@testing-library/react';

import { SupportMenu } from './support-menu';

test('SupportMenu component renders correctly', () => {
  const { getByText } = render(<SupportMenu />);

  // Check if each menu item is rendered
  expect(getByText('Help')).toBeInTheDocument();
  expect(getByText('Training')).toBeInTheDocument();
  expect(getByText('Updates')).toBeInTheDocument();
  expect(getByText('Terms and Policy')).toBeInTheDocument();
  expect(getByText('Send feedback to Google')).toBeInTheDocument();
});
