/* eslint-disable */
import { list } from '@keystone-6/core';
import { integer, relationship, select, text } from '@keystone-6/core/fields';
import { noRestrictions, isSignedIn, rules, permissions } from '../lib/access';

export const Product = list({
  /// @TODO: Add Access control
  access: {
    operation: {
      create: isSignedIn,
      query: noRestrictions,
      update: isSignedIn,
      delete: isSignedIn,
    },
    filter: {
      query: rules.canReadProducts,
      update: rules.canManageProducts,
      delete: rules.canManageProducts,
    },
  },
  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args),
    isHidden: (args) => !permissions.canManageProducts(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),

    price: integer({ validation: { isRequired: true } }),
    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    user: relationship({
      ref: 'User.products',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
      },
      hooks: {
        resolveInput: ({ resolvedData, context, operation }) => {
          if (context.session?.data && operation === 'create') {
            return { connect: { id: context.session.data.id } };
          }
          return resolvedData.user;
        },
      },
    }),
  },
});
