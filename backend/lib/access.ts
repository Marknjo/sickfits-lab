/* eslint-disable */
/// Check if user is signed or not

import {
  AccessOperation,
  BaseAccessArgs,
} from '@keystone-6/core/dist/declarations/src/types/config/access-control';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { OptionalOptions } from 'nodemailer/lib/dkim';
import { permissionsList } from '../schemas/fields';
import { ListAccessArgs } from '../types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

export function noRestrictions(
  _args: BaseAccessArgs<BaseListTypeInfo> & {
    operation: AccessOperation;
  }
) {
  return true;
}

export function isAdmin({ session }: ListAccessArgs) {
  return session?.data.role?.name === 'Admin';
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

/// Checks if session has the required permission -> Operational type of checks
export const permissions = {
  ...generatePermissions,
};

/// Rules check if user can perform queries and mutations
// - Filters and Item access (CRUD BASED Access)
export const rules = {
  canManageProducts: ({ session }: ListAccessArgs) => {
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    return { user: { id: { equals: session?.itemId } } };
  },
  canReadProducts({
    session,
  }: BaseAccessArgs<BaseListTypeInfo> & {
    operation: AccessOperation;
  }) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    return {
      status: { equals: 'AVAILABLE' },
    };
  },

  // Handle Orders Rules
  canOrder: ({ session }: ListAccessArgs) => {
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { customer: { id: { equals: session?.itemId } } };
  },

  canManageOrders: ({ session }: ListAccessArgs) => {
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    return { order: { customer: { id: { equals: session?.itemId } } } };
  },

  // Handle user roles
  canManageUsers({ session }: ListAccessArgs) {
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    return { id: { equals: session?.itemId } };
  },
};
