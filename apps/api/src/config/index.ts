export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  MAX_BUCKET_TOKENS: Number(process.env.MAX_BUCKET_TOKENS) || 10
};
