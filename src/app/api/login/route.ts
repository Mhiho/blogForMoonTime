import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { redis } from '@/db/redis';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = { login: body.login, password: body.password };
  if (
    user.password === process.env.PASSWORD &&
    user.login === process.env.LOGIN
  ) {
    const token: string | undefined =
      process.env.SECRET &&
      jwt.sign({ cos: process.env.SECRET }, process.env.SECRET);

    token && (await redis.set('token', token));
    return Response.json(token);
  }
  return Response.json('login or password not correct');
}
