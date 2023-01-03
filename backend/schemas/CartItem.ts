import { list } from '@keystone-6/core';
import { integer, relationship } from '@keystone-6/core/fields';
import { isSignedIn, rules } from '../lib/access';

export const CartItem = list({
  access: {
    operation: {
      create: isSignedIn,
      query: isSignedIn,
      update: isSignedIn,
      delete: isSignedIn,
    },
    filter: {
      update: rules.canOrder,
      delete: rules.canOrder,
    },
  },
  ui: {
    listView: {
      initialColumns: ['product', 'quantity', 'customer'],
    },
  },
  fields: {
    // @TODO: Add custom label here

    quantity: integer({
      defaultValue: 1,
      validation: { isRequired: true, min: 1 },
    }),
    product: relationship({
      ref: 'Product',
      ui: {
        hideCreate: true,
      },
    }),
    customer: relationship({
      ref: 'User.cart',
      ui: {
        hideCreate: true,
      },
    }),
  },
});
