import { UserPermissionAttribute, UserRole } from '@lths/shared/ui-user-management';

const viewOnlyPermission: UserPermissionAttribute = {
  attribute: {
    name: 'ViewOnly',
    description: 'Can only view items',
  },
  read: true,
  write: false,
  edit: false,
  delete: false,
  full_access: false,
};

const editPermission: UserPermissionAttribute = {
  attribute: {
    name: 'Edit',
    description: 'Can edit items',
  },
  read: true,
  write: true,
  edit: true,
  delete: false,
  full_access: false,
};

const fullAccessPermission: UserPermissionAttribute = {
  attribute: {
    name: 'FullAccess',
    description: 'Full access to items',
  },
  read: true,
  write: true,
  edit: true,
  delete: true,
  full_access: true,
};

const developmentPermission: UserPermissionAttribute = {
  attribute: {
    name: 'Development',
    description: 'Access to development tools and resources',
  },
  read: true,
  write: true,
  edit: true,
  delete: false,
  full_access: false,
};

const productManagementPermission: UserPermissionAttribute = {
  attribute: {
    name: 'ProductManagement',
    description: 'Access to manage product features and roadmaps',
  },
  read: true,
  write: true,
  edit: true,
  delete: false,
  full_access: false,
};

const supportPermission: UserPermissionAttribute = {
  attribute: {
    name: 'Support',
    description: 'Access to support tools and resources',
  },
  read: true,
  write: false,
  edit: true,
  delete: false,
  full_access: false,
};

export const userRolesStub: UserRole[] = [
  {
    name: 'Guest',
    description: 'Basic role with limited permissions',
    permissions: [viewOnlyPermission],
  },
  {
    name: 'Member',
    description: 'Standard role with basic editing permissions',
    permissions: [editPermission],
  },
  {
    name: 'Moderator',
    description: 'Intermediate role with extended editing permissions',
    permissions: [editPermission], // Could be more specific permissions
  },
  {
    name: 'Administrator',
    description: 'Full access in all areas',
    permissions: [fullAccessPermission],
  },

  {
    name: 'Developer',
    description: 'Responsible for software development and maintenance',
    permissions: [developmentPermission, editPermission],
  },
  {
    name: 'Product Manager',
    description: 'Oversees product features and development roadmaps',
    permissions: [productManagementPermission, editPermission],
  },
  {
    name: 'Support',
    description: 'Provides customer support and handles queries',
    permissions: [supportPermission, viewOnlyPermission],
  },
];
