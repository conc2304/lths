import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import { BreadcrumbLink } from './link';
// import { BreadcrumbPathProps } from './types';

describe('BreadcrumbLink', () => {
  it('renders link with given title when children is not provided', () => {
    render(
      <MemoryRouter>
        <BreadcrumbLink title="SampleTitle" path="/sample-path" />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Navigate to SampleTitle' })).toBeInTheDocument();
    expect(screen.getByText('SampleTitle')).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    render(
      <MemoryRouter>
        <BreadcrumbLink title="SampleTitle" path="/sample-path">
          Custom Children
        </BreadcrumbLink>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Navigate to SampleTitle' })).toBeInTheDocument();
    expect(screen.getByText('Custom Children')).toBeInTheDocument();
    expect(screen.queryByText('SampleTitle')).toBeNull();
  });

  it('navigates to given path when clicked', async () => {
    const testPath = '/test-path';
    const testTitle = 'TestTitle';

    const initialEntries = ['/home', testPath];

    const ChildComp = () => {
      const location = useLocation();
      return <div data-testid="current-path">{location.pathname}</div>;
    };

    render(
      <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
        <BreadcrumbLink title={testTitle} path={testPath} />
        <Routes>
          <Route path="*" element={<ChildComp />}></Route>
        </Routes>
      </MemoryRouter>
    );
    const user = userEvent.setup();

    expect(screen.getByTestId('current-path').textContent).not.toBe(testPath);
    expect(screen.getByTestId('current-path').textContent).toBe('/home');

    expect(screen.getByRole('link', { name: `Navigate to ${testTitle}` })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: `Navigate to ${testTitle}` }));
    await waitFor(() => {
      expect(screen.getByTestId('current-path').textContent).toBe(testPath);
    });
  });
});
