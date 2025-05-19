import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userResolvers } from './user.resolver.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    me: userResolvers.me,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: userResolvers.login,
    createUser: userResolvers.createUser,
  },
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});