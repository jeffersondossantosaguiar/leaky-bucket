import Router from '@koa/router';
import { registerUser } from '../controllers/user.controller.js';

const router = new Router({
  prefix: '/users'
});

router.post('/register', registerUser);

export default router;