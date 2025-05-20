import { config } from '../../../config/index.js';

const MAX_TOKENS = config.MAX_BUCKET_TOKENS;
const REFILL_INTERVAL_SECONDS = 3600; // 1 hour
const TTL_SECONDS = MAX_TOKENS * REFILL_INTERVAL_SECONDS;


export { MAX_TOKENS, REFILL_INTERVAL_SECONDS, TTL_SECONDS };
