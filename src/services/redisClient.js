import { createClient } from 'redis';
import dotEnv from 'dotenv';

dotEnv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

redisClient.on('connect', () => {
  console.log('✅ Redis client connected');
});

await redisClient.connect();

export default redisClient;
