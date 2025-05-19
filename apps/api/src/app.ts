import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';
import { graphqlHTTP } from 'koa-graphql';
import mount from 'koa-mount';
import { config } from './config/index.js';
import { getUser } from './middlewares/get-user.js';
import schema from './schema.js';

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(getUser);

app.use(
  mount(
    '/graphql',
    graphqlHTTP(async (request, response, ctx) => ({
      schema,
      graphiql: config.NODE_ENV !== 'production',
      context: {
        user: ctx.state.user
      }
    })),
  ));

export default app;
