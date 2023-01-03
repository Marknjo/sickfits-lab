import { graphql, list } from '@keystone-6/core';
import { integer, relationship, text, virtual } from '@keystone-6/core/fields';
import { BaseItem } from '@keystone-6/core/types';
import { isAdmin, isSignedIn } from '../lib/access';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  access: {
    operation: {
      create: isSignedIn,
      query: isSignedIn,
      update: isAdmin,
      delete: isAdmin,
    },
  },
  ui: {
    listView: {
      initialColumns: ['label', 'customer', 'charge', 'total'],
    },
    hideDelete: (args) => !isAdmin(args),
  },

  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item: BaseItem) {
          return `${formatMoney(item.total as number)}`;
        },
      }),
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    customer: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
