import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text } from '@keystone-6/core/fields';

export const User = list({
  access: allowAll,
  fields: {
    name: text(),
    email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
  },
});
