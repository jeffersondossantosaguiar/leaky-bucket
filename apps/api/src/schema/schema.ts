import { GraphQLSchema } from 'graphql';
import { queryType } from './query-type.js';


/* const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: {
    id: { type: GraphQLID, resolve: (country) => country.id },
    name: { type: GraphQLString, resolve: (country) => country.name }
  }
}); */

/* const CountryCreateInputType = new GraphQLInputObjectType({
  name: 'CountryCreateInputType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  }
}); */

/* const countries = [
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
 */

/* const CountryMutations = {
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
}; */

const schema = new GraphQLSchema({
  query: queryType
  /*   mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        ...CountryMutations
      } 
    })*/
});

export default schema;