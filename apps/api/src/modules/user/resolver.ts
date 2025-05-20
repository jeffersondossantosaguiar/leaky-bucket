import bcrypt from 'bcrypt';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import jwt from 'jsonwebtoken';
import { config } from '../../config/index.js';
import { prismaClient } from '../../lib/index.js';
import { requireAuth } from '../../utils/auth.js';
import { TokenType, UserType } from './types.js';

export const userResolvers = {
  me: {
    type: UserType,
    resolve: requireAuth(async (_parentValue, _args, ctx) => {
      return await prismaClient.user.findUnique({ where: { id: ctx.user.id } });
    })
  } as GraphQLFieldConfig<any, any>,
  login: {
    type: TokenType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent, { email, password }) => {
      const user = await prismaClient.user.findUnique({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Unauthorized');
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        config.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return { token };
    },
  } as GraphQLFieldConfig<any, any>,
  createUser: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent, { email, password }) => {
      const existingUser = await prismaClient.user.findUnique({ where: { email } });

      if (existingUser)
        throw new Error('User already exists!');

      const hashedPassword = await bcrypt.hash(password, 10);

      return await prismaClient.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    },
  } as GraphQLFieldConfig<any, any>,
};