import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { pixResolvers } from './resolver.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    keyCheck: pixResolvers.keyCheck,
  },
});

export default new GraphQLSchema({
  query: Query,
});