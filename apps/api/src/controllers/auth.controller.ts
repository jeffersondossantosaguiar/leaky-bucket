import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { config } from '../config.js';
import { prisma } from '../lib/index.js';

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

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    ctx.status = 401;
    ctx.body = { message: 'Invalid credentials.' };
    return;
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    config.JWT_SECRET,
    { expiresIn: '1d' }
  );

  ctx.status = 200;
  ctx.body = { token };

}