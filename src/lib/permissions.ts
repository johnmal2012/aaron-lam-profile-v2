import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements } from 'better-auth/plugins/admin/access';

export const permissions = {
  ...defaultStatements,
  profile: ['create', 'list', 'update', 'delete'],
  section: ['create', 'list', 'update', 'delete'],
} as const;

export const ac = createAccessControl(permissions);

export const roles = {
  admin: ac.newRole({
    ...permissions
  }),
  user: ac.newRole({}),
};

export type AppRole = keyof typeof roles;

export type AppPermissions = Partial<{
  [K in keyof typeof permissions]:
    (typeof permissions)[K][number][];
}>;