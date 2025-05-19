import bcrypt from 'bcrypt';
import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { config } from '../config.js';
import { prisma } from '../lib/index.js';
import { User } from '../modules/user.model.js';


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID, resolve: (user: User) => user.id },
    email: { type: GraphQLString, resolve: (user: User) => user.email }
  }
});

const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: {
    token: {
      type: GraphQLID, resolve: (token) => token
    },
  }
});

const PixKeyType = new GraphQLObjectType({
  name: 'PixKey',
  fields: {
    key: { type: GraphQLString, resolve: (key) => key }
  }
});

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

const keys = ['jeffersonsantos.a@gmail.com', '08048855402'];

async function getPixKey(pixKey: string) {
  return keys.find((key) => key === pixKey);
}

type ResolverFn = (parent: any, args: any, context: Context, info: any) => any;

function requireAuth(resolver: ResolverFn): ResolverFn {
  return (parent, args, context, info) => {
    if (!context.user) {
      throw new Error('Unauthorized');
    }
    return resolver(parent, args, context, info);
  };
}


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      pixKey: {
        type: PixKeyType,
        args: {
          key: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: requireAuth((_parentValue, { key }, ctx) => {
          return getPixKey(key);
        })
      },
      me: {
        type: UserType,
        resolve: requireAuth(async (_parentValue, _args, ctx) => {
          return await prisma.user.findUnique({ where: { id: ctx.user.sub } });
        })
      }
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      login: {
        type: TokenType,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (_parentValue, args) => {
          const { email, password } = args;
          return generateAuthToken({ email, password });
        }
      },
      createUser: {
        type: UserType,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_parentValue, args) => {
          const { email, password } = args;
          const user = await prisma.user.findUnique({ where: { email } });

          if (user)
            throw new Error('User already exists!');

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = await prisma.user.create({
            data: {
              email,
              password: hashedPassword
            }
          });

          return newUser;
        }
      }
    },
  })
});

export default schema;