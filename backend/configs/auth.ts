import { randomBytes } from 'crypto';

import { statelessSessions } from '@keystone-6/core/session';

const sessionMaxDuration =
  process.env.SESSION_MAX_DURATION || 60 * 60 * 24 * 30; // 3o days
const sessionSecret =
  process.env.SESSION_SECRET || randomBytes(22).toString('base64');

/// 1. Create With Auth

/// 2. Create Session
export const session = statelessSessions({
  secret: sessionSecret,
  maxAge: +sessionMaxDuration,
  sameSite: 'strict',
});
