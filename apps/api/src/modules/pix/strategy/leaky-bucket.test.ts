import { jest } from '@jest/globals';
import { MAX_TOKENS } from '../utils/constants.js';
import { leakyBucket } from './leaky-bucket.js';

describe('Leaky Bucket Strategy', () => {
  const mockDate = (timestamp: number) => {
    jest.spyOn(Date, 'now').mockImplementation(() => timestamp * 1000);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not add tokens if less than REFILL_INTERVAL_SECONDS passed', () => {
    const now = 1000;
    mockDate(now);

    const bucket = { tokens: 3, lastRefill: now };
    const result = leakyBucket(bucket);

    expect(result.tokens).toBe(3);
    expect(result.lastRefill).toBe(now);
  });

  it('should add one token after REFILL_INTERVAL_SECONDS', () => {
    const startTime = 1000;
    const bucket = { tokens: 3, lastRefill: startTime };
    const oneHour = 3600; // 1h in seconds

    // Advance time by 1 hour (3600 seconds)
    mockDate(startTime + oneHour);

    const result = leakyBucket(bucket);

    expect(result.tokens).toBe(4);
    expect(result.lastRefill).toBe(startTime + 3600);
  });

  it('should not exceed MAX_TOKENS when refilling', () => {
    const startTime = 1000;
    const bucket = { tokens: MAX_TOKENS - 1, lastRefill: startTime };
    const twoHours = 7200; // 2h in seconds

    // Advance time by 2 hours
    mockDate(startTime + twoHours);

    const result = leakyBucket(bucket);

    expect(result.tokens).toBe(MAX_TOKENS);
    expect(result.lastRefill).toBe(startTime + 7200);
  });

  it('should add multiple tokens for longer time periods', () => {
    const startTime = 1000;
    const bucket = { tokens: 1, lastRefill: startTime };
    const treeHours = 10800; // 3h in seconds

    // Advance time by 3 hours
    mockDate(startTime + treeHours);

    const result = leakyBucket(bucket);

    expect(result.tokens).toBe(4); // 1 initial + 3 (one per hour)
    expect(result.lastRefill).toBe(startTime + 10800);
  });
});