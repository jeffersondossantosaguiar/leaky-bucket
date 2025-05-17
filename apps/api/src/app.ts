import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import { graphqlHTTP } from 'koa-graphql';
import { config } from './config.js';
import schema from './schema/schema.js';

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors());

router.all('/graphql', graphqlHTTP({
  graphiql: config.NODE_ENV !== 'production',
  schema,
}));

app.use(router.routes()).use(router.allowedMethods());

export default app;
