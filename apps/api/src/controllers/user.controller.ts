import { Context } from 'koa';
import { createUser } from '../services/user.service.js';

type RegisterUserDTO = {
  email: string;
  password: string;
}

export async function registerUser(ctx: Context) {
  const { email, password } = ctx.request.body as RegisterUserDTO;

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { message: 'Email and password are required!' };
    return;
  }

  const user = await createUser({ email, password });

  ctx.status = 201;
  ctx.body = { user };
}