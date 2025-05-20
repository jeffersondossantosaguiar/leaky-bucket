import { createClient, RedisClientType } from 'redis';
import { PrismaClient } from './prisma/index.js';

const prismaClient = new PrismaClient();

const redisClient: RedisClientType = createClient({ url: 'redis://localhost:6379' });

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export { prismaClient, redisClient };

