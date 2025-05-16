import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { config } from '../config.js';

export async function authMiddleware(ctx: Context, next: Next) {
  try {
    const token = ctx.header.authorization?.split(' ')[1];

    if (!token) throw new Error('invalid');

    const decoded = jwt.verify(token, config.JWT_SECRET);

    ctx.state.user = decoded;
    await next();
  } catch {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized' };
  }
}