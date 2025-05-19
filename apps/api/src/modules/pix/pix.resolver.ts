import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { requireAuth } from '../../utils/auth.js';
import { keys } from './pix.samples.js';
import { PixKey, PixType } from './pix.types.js';

function findPixKeyByValue(
  value: string
): PixKey | undefined {
  return keys.find(key => key.key === value);
}

export const pixResolvers = {
  pixKey: {
    type: PixType,
    args: {
      key: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: requireAuth(async (_parentValue, { key }) => {
      return findPixKeyByValue(key);
    })
  } as GraphQLFieldConfig<any, any>
};