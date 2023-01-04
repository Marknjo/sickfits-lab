/* eslint-disable */

import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { password, relationship, text } from '@keystone-6/core/fields';
import { isAdmin, isSignedIn, permissions, rules } from '../lib/access';
import { permissionFields } from './fields';

export const User = list({
  access: {
    operation: {
      ...allOperations(isSignedIn),
      delete: permissions.canManageUsers,
    },
    filter: {
      query: rules.canManageUsers,
    },
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text(),
    email: text({ isIndexed: 'unique', validation: { isRequired: true } }),

    // @TODO: Add validation.rejectCommon: true
    password: password({ validation: { isRequired: true } }),

    cart: relationship({
      ref: 'CartItem.customer',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    orders: relationship({ ref: 'Order.customer', many: true }),

    role: relationship({
      ref: 'Role.assignedTo',
      /// @TODO: Add access control
      access: {
        update: permissions.canManageUsers,
        create: permissions.canManageUsers,
        read: isSignedIn,
      },
    }),

    products: relationship({
      ref: 'Product.user',
      many: true,
    }),
  },
});
