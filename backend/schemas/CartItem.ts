import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { integer, relationship } from '@keystone-6/core/fields';

export const CartItem = list({
  access: allowAll,
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
