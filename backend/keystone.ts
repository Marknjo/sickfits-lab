import './configs/dotenv.config';
import { config } from '@keystone-6/core';
import { lists } from './schemas/schema';
import { dbUrl } from './lib/buildDbUrl';
import { session, withAuth } from './configs/auth';
import { MyImageStorage } from './configs/storage';
import { insertSeedData } from './seed-data';

// import { randomBytes } from 'crypto';
// console.log(randomBytes(32).toString('base64'));

const frontEndUrl = process.env.FRONTEND_URL;
if (!frontEndUrl) {
  throw new Error(
    'CONFIG ERROR: Must Provide a FRONTEND_URL environmental variable'
  );
}

export default config(
  withAuth({
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
      onConnect: async (context) => {
        console.log('Connecting to the database');

        if (process.argv.includes('--seed-data')) {
          await insertSeedData(context);
        }
      },
    },
    storage: {
      my_images: MyImageStorage,
    },
    lists,
    session,
    ui: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      isAccessAllowed: (context) => !!context.session?.data,
    },
  })
);
