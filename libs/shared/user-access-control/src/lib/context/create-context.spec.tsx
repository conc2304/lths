import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import createABACContext from './create-context';
import { AccessCheckFunction } from '../types';

enum Permissions {
  EDIT_POST = 'EDIT_POST',
  DELETE_POST = 'DELETE_POST',
  READ_POST = 'READ_POST',
}

enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

const roles = [Roles.ADMIN, Roles.USER];
const permissions = [Permissions.EDIT_POST, Permissions.READ_POST, Permissions.DELETE_POST];

const editAccessCheck: AccessCheckFunction = (data: { owner_id: string }, user: { id: string; name: string }) => {
  return data.owner_id === user.id;
};

const rules = {
  [Roles.ADMIN]: {
    [Permissions.READ_POST]: true,
    [Permissions.EDIT_POST]: true,
    [Permissions.DELETE_POST]: true,
  },
  [Roles.USER]: {
    [Permissions.READ_POST]: true,
    [Permissions.EDIT_POST]: editAccessCheck,
    [Permissions.DELETE_POST]: false,
  },
};
const user = { name: 'John Doe', id: '1' };

const { ABACProvider, AllowedTo, NotAllowedTo, useABAC } = createABACContext();

describe('ABACContext', () => {
  it('ABACProvider provides userHasPermissions function', () => {
    const TestComponent = () => {
      const { userHasPermissions } = useABAC();
      return <div>{userHasPermissions(Permissions.READ_POST) ? 'Has Access' : 'No Access'}</div>;
    };

    const { getByText } = render(
      <ABACProvider rules={rules} roles={roles} permissions={permissions} user={user}>
        <TestComponent />
      </ABACProvider>
    );

    expect(getByText('Has Access')).toBeTruthy();
  });

  it('AllowedTo renders yes component when permission is met', () => {
    const YesComponent = () => <div>Access Granted</div>;

    const { getByText } = render(
      <ABACProvider rules={rules} roles={roles} permissions={permissions} user={user}>
        <AllowedTo perform={Permissions.READ_POST} yes={YesComponent} />
      </ABACProvider>
    );

    expect(getByText('Access Granted')).toBeInTheDocument();
  });

  it('NotAllowedTo renders yes component when permission is not met', () => {
    const YesComponent = () => <div>No Access</div>;

    const { getByText } = render(
      <ABACProvider rules={rules} roles={[Roles.USER]} permissions={permissions} user={user}>
        <NotAllowedTo perform={Permissions.EDIT_POST} yes={YesComponent} data={{ owner_id: '2' }} />
      </ABACProvider>
    );

    expect(getByText('No Access')).toBeInTheDocument();
  });

  // Additional tests for different scenarios, like rendering `no` components, using `AllowedTo` and `NotAllowedTo` without `ABACProvider`, etc.
});
