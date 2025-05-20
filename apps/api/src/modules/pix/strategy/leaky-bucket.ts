import { Bucket } from '../types.js';
import { MAX_TOKENS, REFILL_INTERVAL_SECONDS } from '../utils/constants.js';

export function leakyBucket(bucket: Bucket): Bucket {
  const now = Math.floor(Date.now() / 1000); // timestamp in seconds;
  const secondsPassed = now - bucket.lastRefill;
  const tokensToAdd = Math.floor(secondsPassed / REFILL_INTERVAL_SECONDS);

  if (tokensToAdd > 0) {
    bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  return bucket;
}
