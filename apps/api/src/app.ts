import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';
import authRoutes from './routes/auth.routes.js';
import graphqlRoutes from './routes/graphql.routes.js';
import userRoutes from './routes/user.routes.js';

const app = new Koa();

app.use(bodyParser());
app.use(cors());

app.use(userRoutes.routes()).use(userRoutes.allowedMethods());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());
app.use(graphqlRoutes.routes()).use(graphqlRoutes.allowedMethods());

export default app;
