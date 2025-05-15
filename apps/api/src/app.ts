import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors());

router.get('/', (ctx) => {
  ctx.status = 200;
  ctx.body = 'TESTE';
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
