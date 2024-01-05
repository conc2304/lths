import React from 'react';
import { render } from '@testing-library/react';

import { ABACProvider, AllowedTo, NotAllowedTo, useABAC } from './index';
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

type MockPost = {
  owner_id: string;
  body: string;
};

type MockUser = {
  id: string;
  name: string;
};

const roles = [Roles.ADMIN, Roles.USER];
const permissions = [Permissions.EDIT_POST, Permissions.READ_POST, Permissions.DELETE_POST];

const editAccessCheck: AccessCheckFunction<MockUser, MockPost> = (data, user) => {
  if (!data || !user) return false;

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
  },
  [Permissions.DELETE_POST]: (post: MockPost, user?: MockUser) => user && post.owner_id === user.id,
};

const user = { name: 'John Doe', id: '1' };

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

    expect(getByText('Has Access')).toBeInTheDocument();
  });

  it('AllowedTo renders yes component when permission is met', () => {
    const YesComponent = () => <div>Access Granted</div>;
    const NoComponent = () => <div>Access Denied</div>;

    const { getByText, queryByText } = render(
      <ABACProvider rules={rules} roles={roles} permissions={permissions} user={user}>
        <AllowedTo perform={Permissions.READ_POST} yes={YesComponent} no={NoComponent} />
      </ABACProvider>
    );

    expect(getByText('Access Granted')).toBeInTheDocument();
    expect(queryByText('Access Denied')).not.toBeInTheDocument();
  });

  it('AllowedTo renders no component when permission is not met', () => {
    const YesComponent = () => <div>Access Granted</div>;
    const NoComponent = () => <div>Access Denied</div>;

    const { getByText, queryByText } = render(
      <ABACProvider rules={rules} roles={[Roles.USER]} permissions={permissions}>
        <AllowedTo perform={Permissions.DELETE_POST} yes={YesComponent} no={NoComponent} />
      </ABACProvider>
    );

    expect(getByText('Access Denied')).toBeInTheDocument();
    expect(queryByText('Access Granted')).not.toBeInTheDocument();
  });

  it('NotAllowedTo renders yes component when permission is not met', () => {
    const YesComponent = () => <div>No Access</div>;
    const NoComponent = () => <div>Access Granted</div>;

    const { getByText, queryByText } = render(
      <ABACProvider rules={rules} roles={[Roles.USER]} permissions={permissions} user={user}>
        <NotAllowedTo
          perform={Permissions.DELETE_POST}
          yes={YesComponent}
          no={NoComponent}
          data={{ owner_id: 'NOBUENO' }}
        />
      </ABACProvider>
    );

    expect(getByText('No Access')).toBeInTheDocument();
    expect(queryByText('Access Granted')).not.toBeInTheDocument();
  });

  it('NotAllowedTo renders no component when permission is met', () => {
    const YesComponent = () => <div>No Access</div>;
    const NoComponent = () => <div>Access Granted</div>;

    const { getByText, queryByText } = render(
      <ABACProvider rules={rules} roles={roles} permissions={permissions} user={user}>
        <NotAllowedTo perform={Permissions.READ_POST} yes={YesComponent} no={NoComponent} />
      </ABACProvider>
    );

    expect(getByText('Access Granted')).toBeInTheDocument();
    expect(queryByText('No Access')).not.toBeInTheDocument();
  });
});
