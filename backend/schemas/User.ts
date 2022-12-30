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

    /// @TODO: Add roles, and orders
    cart: relationship({ ref: 'CartItem.customer' }),
  },
});
