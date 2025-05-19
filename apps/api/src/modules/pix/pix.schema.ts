import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { pixResolvers } from './pix.resolver.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    pixKey: pixResolvers.pixKey,
  },
});

export default new GraphQLSchema({
  query: Query,
});