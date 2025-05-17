import bcrypt from 'bcrypt';
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { config } from '../config.js';
import { prisma } from '../lib/index.js';


const countries = [
  {
    id: '1',
    name: 'Bangladesh'
  },
  {
    id: '2',
    name: 'Belgium'
  },
  {
    id: '3',
    name: 'Burkina Faso'
  }
];

const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: {
    id: { type: GraphQLID, resolve: (country) => country.id },
    name: { type: GraphQLString, resolve: (country) => country.name }
  }
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID, resolve: (country) => 'abc' },
    name: { type: GraphQLString, resolve: (country) => 'Jefferson' }
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

  console.log({ token });

  return token;
}

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (root, { email, password }) => generateAuthToken({ email, password })
    },
    me: {
      type: UserType,
      resolve: async (_parent, _args, context: Context) => {
        //TODO adicionar alguma logica autenticação, basicamente pegar a logica do authmiddleware e implementar aqui
        console.log('AQUI', context.header.authorization);
        /*         if (!context.user) {
                  throw new Error('Não autenticado');
                } */
        console.log('AQUI2');
        // Supondo que context.user.id contenha o ID do usuário autenticado
        return await prisma.user.findUnique({ where: { id: '78671e8e-a1f4-4f15-be75-980e5f5c7863' } });
      },
    },
    countries: {
      type: new GraphQLList(CountryType),
      resolve: () => countries
    },
    country: {
      type: CountryType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, { id }) => countries.find((c) => c.id === id)
    }
  }
});