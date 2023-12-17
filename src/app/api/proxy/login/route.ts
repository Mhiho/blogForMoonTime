import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = { login: body.login, password: body.password };
  if (
    user.password === process.env.PASSWORD &&
    user.login === process.env.LOGIN
  ) {
    const token: string | undefined =
      process.env.SECRET && jwt.sign({ cos: user.login }, process.env.SECRET);
    return Response.json({ token });
  }
  return Response.json('login or password not correct');
}
