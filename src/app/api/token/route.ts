import { redisToken } from '@/db/redis';

export async function GET() {
  const token = await redisToken;
  if (!token) {
    return Response.json({ error: 'no token from db' });
  }
  return Response.json(token);
}
