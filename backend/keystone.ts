import './configs/dotenv.config';
import { config } from '@keystone-6/core';
import { lists } from './schemas/schema';
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
  lists,
  ui: {
    isAccessAllowed: () => true,
  },
});