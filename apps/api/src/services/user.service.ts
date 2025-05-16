import bcrypt from 'bcrypt';
import { BadRequestError } from '../errors/bad-request-error.js';
import { prisma } from '../lib/index.js';
import { User } from '../models/user.model.js';

export async function createUser({ email, password }: { email: string, password: string; }): Promise<User> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user)
    throw new BadRequestError('User already exists!');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });

  return newUser;
}