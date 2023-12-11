import { render } from '@testing-library/react';

import SharedUiUserManagement from './shared-ui-user-management';

describe('SharedUiUserManagement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedUiUserManagement />);
    expect(baseElement).toBeTruthy();
  });
});
