import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { password, relationship, text } from '@keystone-6/core/fields';

export const User = list({
  access: allowAll,
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
    }),
  },
});
