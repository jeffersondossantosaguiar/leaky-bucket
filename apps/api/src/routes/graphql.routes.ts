import Router from '@koa/router';
import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { graphqlHTTP } from 'koa-graphql';

const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: {
    id: { type: GraphQLID, resolve: (country) => country.id },
    name: { type: GraphQLString, resolve: (country) => country.name }
  }
});

const CountryCreateInputType = new GraphQLInputObjectType({
  name: 'CountryCreateInputType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  }
});

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



const router = new Router();

const CountryMutations = {
  createCountry: {
    type: CountryType,
    args: {
      input: {
        type: new GraphQLNonNull(CountryCreateInputType)
      }
    },
    resolve: (root, { input }) => {
      const country = {
        id: Math.random().toString(),
        name: input.name
      };
      countries.push(country);

      return country;
    }
  }
};


const CountryQueries = {
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
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...CountryQueries
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...CountryMutations
    }
  })
});


router.all('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

export default router;