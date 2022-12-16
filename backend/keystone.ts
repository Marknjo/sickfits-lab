import './configs/dotenv.config';
import { config, list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

import { dbUrl } from './lib/buildDbUrl';

const frontEndUrl = process.env.FRONTEND_URL;
if (!frontEndUrl) {
  throw new Error(
    'CONFIG ERROR: Must Provide a FRONTEND_URL environmental variable'
  );
}

export default config({
  server: {
    cors: {
      origin: [frontEndUrl],
      credentials: true,
    },
  },
  db: {
    provider: 'postgresql',
    url: dbUrl(),
    // @TODO: Add data seeding here
  },
  lists: {
    User: list({
      access: allowAll,
      fields: {
        name: text(),
        email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
      },
    }),
  },
  ui: {
    isAccessAllowed: () => true,
  },
});
