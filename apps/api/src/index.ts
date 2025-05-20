import 'dotenv/config';
import { createServer } from 'http';
import app from './app.js';
import { config } from './config/index.js';
import { redisClient } from './lib/index.js';

(async () => {
  await redisClient.connect();

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`server running at port ${config.PORT}`);
  });
})();
