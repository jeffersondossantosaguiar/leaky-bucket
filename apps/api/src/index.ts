import 'dotenv/config';
import { createServer } from 'http';
import app from './app.js';
import { config } from './config.js';

(async () => {
  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`server running at port ${config.PORT}`);
  });
})();
