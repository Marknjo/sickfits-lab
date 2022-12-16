export const dbUrl = (): string => {
  let DB_URL = process.env.DATABASE_URL;
  const DB_PASS = process.env.POSTGRES_PASSWORD;
  const DB_USER = process.env.POSTGRES_USER;
  const DB_PORT = process.env.POSTGRES_PORT;
  const DB_NAME = process.env.POSTGRES_DB;

  if (!DB_URL || !DB_PASS || !DB_USER || !DB_PORT || !DB_NAME) {
    throw new Error(
      'CONFIG ERROR: DB settings (DATABASE_URL || POSTGRES_PASSWORD || POSTGRES_USER || POSTGRES_PORT || POSTGRES_DB) not set in the ENV Vars 💥💥💥'
    );
  }

  DB_URL = DB_URL.replace(/{{POSTGRES_PASSWORD}}/g, DB_PASS);
  DB_URL = DB_URL.replace(/{{POSTGRES_USER}}/, DB_USER);
  DB_URL = DB_URL.replace(/{{POSTGRES_PORT}}/, DB_PORT);
  DB_URL = DB_URL.replace(/{{POSTGRES_DB}}/, DB_NAME);

  return DB_URL;
};
