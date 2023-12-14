export type UserRole = {
  name: string;
  description: string;
  permissions: UserPermissionAttribute[];
};

export type UserPermissionAttribute = {
  attribute: {
    name: string;
    description: string;
  };
  read: boolean;
  write: boolean;
  edit: boolean;
  delete: boolean;
  full_access: boolean;
};
