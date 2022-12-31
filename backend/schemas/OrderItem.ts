import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { integer, relationship, text } from '@keystone-6/core/fields';

export const OrderItem = list({
  access: allowAll,
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
