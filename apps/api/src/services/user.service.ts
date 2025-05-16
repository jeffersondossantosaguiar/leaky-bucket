import bcrypt from 'bcrypt';
import { prisma } from '../generated/index.js';
import { User } from '../models/user.model.js';

export async function createUser({ email, password }: { email: string, password: string; }): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });

  return newUser;
}