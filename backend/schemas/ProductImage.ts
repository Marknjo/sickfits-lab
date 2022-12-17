import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { image, relationship, text } from '@keystone-6/core/fields';

export const ProductImage = list({
  access: allowAll,
  fields: {
    altText: text({ validation: { isRequired: true } }),
    image: image({ storage: 'my_images', label: 'Source' }),
    product: relationship({ ref: 'Product.photo' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'product'],
      initialSort: {
        field: 'altText',
        direction: 'DESC',
      },
    },
  },
});
