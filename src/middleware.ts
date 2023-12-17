'use server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request) {
    const isAuthenticated = request?.cookies?.has('token');
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
      }
    }
  }
}
