import { redis } from '@/db/redis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = await req.json();
  try {
    redis.del('token');
    return Response.json('token cleared');
  } catch (err) {
    return Response.json('nie udało się ' + err);
  }
}
