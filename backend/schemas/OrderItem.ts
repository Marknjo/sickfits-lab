import { list } from '@keystone-6/core';
import { integer, relationship, text } from '@keystone-6/core/fields';
import { isSignedIn, permissions } from '../lib/access';

export const OrderItem = list({
  access: {
    operation: {
      query: isSignedIn,
      create: isSignedIn,
      update: isSignedIn,
      delete: permissions.canManageProducts,
    },
    // filter: {
    //   query: rules.canManageOrders,
    // },
  },
  ui: {
    listView: {
      initialColumns: ['name', 'quantity', 'price', 'order', 'description'],
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ProductImage',
      ui: {
        // searchFields: ['altText'],
        displayMode: 'cards',
        linkToItem: true,
        inlineConnect: true,
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    price: integer(),
    quantity: integer(),
    order: relationship({ ref: 'Order.items' }),
  },
});
