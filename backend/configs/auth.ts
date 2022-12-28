import { randomBytes } from 'crypto';

import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';
import { sendPasswordResetEmail } from '../lib/emailHandler';

const sessionMaxDuration =
  process.env.SESSION_MAX_DURATION || 60 * 60 * 24 * 30; // 3o days
const sessionSecret =
  process.env.SESSION_SECRET || randomBytes(22).toString('base64');

/// 1. Create With Auth
export const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'name id email',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    skipKeystoneWelcome: true,
    // @TODO: Add in initial roles here
  },
  passwordResetLink: {
    tokensValidForMins: 10,
    async sendToken({ itemId, identity, token }) {
      console.log({ itemId, identity, token });

      await sendPasswordResetEmail(token, identity);
    },
  },
});

/// 2. Create Session
export const session = statelessSessions({
  secret: sessionSecret,
  maxAge: +sessionMaxDuration,
  sameSite: 'strict',
});
