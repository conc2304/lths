import { render } from '@testing-library/react';

import SharedUserRolesPermissions from './shared-user-roles-permissions';

describe('SharedUserRolesPermissions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedUserRolesPermissions />);
    expect(baseElement).toBeTruthy();
  });
});
