import { list } from '@keystone-6/core';
import { image, relationship, text } from '@keystone-6/core/fields';
import { isSignedIn, permissions } from '../lib/access';

export const ProductImage = list({
  access: {
    operation: {
      query: () => true,
      create: isSignedIn,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
    },
  },
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
