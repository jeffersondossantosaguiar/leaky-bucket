import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { config } from '../../config/index.js';
import { redisClient } from '../../lib/index.js';
import { requireAuth } from '../../utils/auth.js';
import { keys } from './samples.js';
import { PixKey, PixType } from './types.js';

const tokens = config.MAX_BUCKET_TOKENS;

type Bucket = {
  tokens: number;
  lastRefill: number;
};

function findPixKeyByValue(
  value: string
): PixKey | undefined {
  return keys.find(key => key.key === value);
}

async function updateBucket(key: string, bucket: Bucket) {
  await redisClient.set(key, JSON.stringify(bucket), {
    expiration: {
      type: 'EX', value: 60 * 60 * tokens // hours in seconds}
    }
  });
}

async function getBucket(key: string): Promise<Bucket> {
  const data = await redisClient.get(key);

  if (data) {
    return JSON.parse(data) as Bucket;
  }

  const newBucket: Bucket = {
    tokens,
    lastRefill: Math.floor(Date.now() / 1000) // timestamp in seconds,
  };

  await updateBucket(key, newBucket);

  return newBucket;
}

function refillTokens(bucket: Bucket): Bucket {
  const now = Math.floor(Date.now() / 1000);
  const secondsPassed = now - bucket.lastRefill;
  const tokensToAdd = Math.floor(secondsPassed / 3600);

  if (tokensToAdd > 0) {
    bucket.tokens = Math.min(tokens, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  return bucket;
}


export const pixResolvers = {
  pixKey: {
    type: PixType,
    args: {
      key: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: requireAuth(async (_parentValue, { key }, ctx) => {
      const { user } = ctx;
      const redisKey = `leaky_bucket:${user.id}`;

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
    })
  } as GraphQLFieldConfig<any, any>
};