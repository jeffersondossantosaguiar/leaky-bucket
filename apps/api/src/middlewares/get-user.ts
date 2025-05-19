import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { config } from '../config/index.js';

export async function getUser(ctx: Context, next: Next) {
  try {
    const token = ctx.header.authorization?.split(' ')[1];

    if (!token) throw new Error('Invalid token!');

    const decoded = jwt.verify(token, config.JWT_SECRET);

    ctx.state.user = decoded;
  } catch {
    ctx.state.user = null;
  }
  await next();
}