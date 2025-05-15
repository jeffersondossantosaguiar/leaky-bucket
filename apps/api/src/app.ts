import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';
import userRoutes from './routes/user.routes.js';

const app = new Koa();

app.use(bodyParser());
app.use(cors());

app.use(userRoutes.routes()).use(userRoutes.allowedMethods());

export default app;
