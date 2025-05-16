import { Context } from 'koa';
import { generateAuthToken } from '../services/auth.service.js';

export async function login(ctx: Context) {
  const { email, password } = ctx.request.body as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { message: 'Email and password are required' };
    return;
  }

  const token = await generateAuthToken({ email, password });

  ctx.status = 200;
  ctx.body = { token };

}