/// Check if user is signed or not

import { permissionsList } from '../schemas/fields';
import { ListAccessArgs } from '../types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

/// Permission based Access controls
const generatePermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatePermissions,
};
