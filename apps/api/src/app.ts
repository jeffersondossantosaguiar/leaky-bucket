import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = new Koa();

app.use(bodyParser());
app.use(cors());

app.use(userRoutes.routes()).use(userRoutes.allowedMethods());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

export default app;
