import { GraphQLObjectType, GraphQLString } from 'graphql';

export type PixKey = {
  key: string;
  keyType: 'CPF' | 'CNPJ' | 'PHONE' | 'EMAIL' | 'EVP';
  account: {
    participant: string;
    branch: string;
    accountNumber: string;
    accountType: 'CACC' | 'SVGS';
    openingDate: string;
  };
  owner: {
    type: 'NATURAL_PERSON' | 'LEGAL_PERSON';
    taxIdNumber: string;
    name: string;
  };
  creationDate: string;
  keyOwnershipDate: string;
};

export type Bucket = {
  tokens: number;
  lastRefill: number;
};

export const PixType = new GraphQLObjectType({
  name: 'Pix',
  fields: {
    key: { type: GraphQLString },
    keyType: { type: GraphQLString },
    account: {
      type: new GraphQLObjectType({
        name: 'Account',
        fields: {
          participant: { type: GraphQLString },
          branch: { type: GraphQLString },
          accountNumber: { type: GraphQLString },
          accountType: { type: GraphQLString },
          openingDate: { type: GraphQLString },
        },
      }),
    },
    owner: {
      type: new GraphQLObjectType({
        name: 'Owner',
        fields: {
          type: { type: GraphQLString },
          taxIdNumber: { type: GraphQLString },
          name: { type: GraphQLString },
        },
      }),
    },
    creationDate: { type: GraphQLString },
    keyOwnershipDate: { type: GraphQLString },
  },
});