import { Redis } from 'ioredis';
import { configuration } from './configuration';

export const redis = new Redis(configuration);
export const redisToken = redis.get('token');
