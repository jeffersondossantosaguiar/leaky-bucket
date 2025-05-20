import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { redisClient } from '../../lib/index.js';
import { requireAuth } from '../../utils/auth.js';
import { keys } from './samples.js';
import { tokenBucket } from './strategy/token-bucket.js';
import { Bucket, PixKey, PixType } from './types.js';
import { MAX_TOKENS, TTL_SECONDS } from './utils/constants.js';

function findPixKeyByValue(
  value: string
): PixKey | undefined {
  return keys.find(key => key.key === value);
}

export async function updateBucket(key: string, bucket: Bucket) {
  await redisClient.set(key, JSON.stringify(bucket), {
    expiration: {
      type: 'EX', value: TTL_SECONDS
    }
  });
}

export async function getBucket(key: string): Promise<Bucket> {
  const data = await redisClient.get(key);

  if (data) {
    return JSON.parse(data) as Bucket;
  }

  const newBucket: Bucket = {
    tokens: MAX_TOKENS,
    lastRefill: Math.floor(Date.now() / 1000) // timestamp in seconds
  };

  await updateBucket(key, newBucket);

  return newBucket;
}

export async function getPixKey(userId: string, key: string) {
  const redisKey = `token_bucket:${userId}`;
  let userBucket = await getBucket(redisKey);

  userBucket = tokenBucket(userBucket);

  if (userBucket.tokens < 1)
    throw new Error('Rate limit exceeded. Please try again later.');

  const pixKey = findPixKeyByValue(key);

  if (!pixKey) {
    userBucket.tokens -= 1;
    await updateBucket(redisKey, userBucket);
    throw new Error('Pix key not found.');
  }

  await updateBucket(redisKey, userBucket);
  return pixKey;
}

export const pixResolvers = {
  pixKey: {
    type: PixType,
    args: {
      key: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: requireAuth(async (_parentValue, { key }, ctx) => {
      const { user } = ctx;
      return await getPixKey(user.id, key);
    })
  } as GraphQLFieldConfig<any, any>
};