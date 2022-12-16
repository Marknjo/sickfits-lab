import './configs/dotenv.config';
import { config } from '@keystone-6/core';

import { dbUrl } from './lib/buildDbUrl';

export default config({
  db: {
    provider: 'postgresql',
    url: dbUrl(),
  },
  lists: {},
});
