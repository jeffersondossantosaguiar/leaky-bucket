import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { prisma } from '../lib/index.js';

export async function generateAuthToken({ email, password }: { email: string, password: string; }): Promise<string> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new Error('Unauthorized');

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    config.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
}