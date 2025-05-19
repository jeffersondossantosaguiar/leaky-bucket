import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
  },
});

export const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: {
    token: { type: GraphQLID },
  },
});