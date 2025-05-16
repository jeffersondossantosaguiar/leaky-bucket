import Router from '@koa/router';
import { login } from '../controllers/auth.controller.js';

const router = new Router({
  prefix: '/auth'
});

router.post('/login', login);

export default router;