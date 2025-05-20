import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { config } from '../../config/index.js';
import { redisClient } from '../../lib/index.js';
import { requireAuth } from '../../utils/auth.js';
import { keys } from './samples.js';
import { Bucket, PixKey, PixType } from './types.js';

const MAX_TOKENS = config.MAX_BUCKET_TOKENS;
const REFILL_INTERVAL_SECONDS = 3600; // 3600s = 1 hour
const TTL_SECONDS = MAX_TOKENS * REFILL_INTERVAL_SECONDS;

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

export function refillTokens(bucket: Bucket): Bucket {
  const now = Math.floor(Date.now() / 1000); // timestamp in seconds;
  const secondsPassed = now - bucket.lastRefill;
  const tokensToAdd = Math.floor(secondsPassed / REFILL_INTERVAL_SECONDS);

  if (tokensToAdd > 0) {
    bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  return bucket;
}

export async function getPixKey(userId: string, key: string) {
  const redisKey = `leaky_bucket:${userId}`;
  let userBucket = await getBucket(redisKey);

  userBucket = refillTokens(userBucket);

  if (userBucket.tokens <= 0)
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