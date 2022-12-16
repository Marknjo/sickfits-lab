import './configs/dotenv.config';
import { config } from '@keystone-6/core';
import { lists } from './schemas/schema';
import { dbUrl } from './lib/buildDbUrl';
import { session, withAuth } from './configs/auth';

// import { randomBytes } from 'crypto';
// console.log(randomBytes(32).toString('base64'));

const frontEndUrl = process.env.FRONTEND_URL;
if (!frontEndUrl) {
  throw new Error(
    'CONFIG ERROR: Must Provide a FRONTEND_URL environmental variable'
  );
}

export default withAuth(
  config({
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
    session,
    lists,
    ui: {
      isAccessAllowed: () => true,
    },
  })
);
