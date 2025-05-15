import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';

const users: User[] = [];

export async function createUser({ email, password }: {email: string, password: string}): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { id: Date.now(), email, password: hashedPassword };

  users.push(newUser);
  
  return newUser;
}