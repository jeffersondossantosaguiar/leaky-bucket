import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import { graphqlHTTP } from 'koa-graphql';
import mount from 'koa-mount';
import { config } from './config.js';
import schema from './schema/schema.js';
import { getUserMiddleware } from './shared/middlewares/get-user.middleware.js';

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors());

app.use(getUserMiddleware);

app.use(mount(
  '/graphql',
  graphqlHTTP(async (_request, _response, ctx, _graphQLParams) => ({
    graphiql: config.NODE_ENV !== 'production',
    schema,
    context: {
      user: ctx.state.user
    }
  })),
));

app.use(router.routes()).use(router.allowedMethods());

export default app;
