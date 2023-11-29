import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import ReadOnlyButton from './';

describe('Elements: ReadOnlyButton', () => {
  it('renders a button', () => {
    const { getByRole } = render(<ReadOnlyButton>ReadOnlyButton</ReadOnlyButton>);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('button hover and click disabled when readOnly is true', () => {
    const { getByRole } = render(<ReadOnlyButton readOnly={true}>ReadOnlyButton</ReadOnlyButton>);
    const button = getByRole('button');

    expect(button).toHaveStyle({
      pointerEvents: 'none',
      userSelect: 'none',
      cursor: 'default',
    });
  });

  test('button hover and click is not disabled when readOnly is false', () => {
    const { getByRole } = render(<ReadOnlyButton readOnly={false}>ReadOnlyButton</ReadOnlyButton>);
    const button = getByRole('button');

    expect(button).not.toHaveStyle({
      pointerEvents: 'none',
      userSelect: 'none',
      cursor: 'default',
    });
  });
});