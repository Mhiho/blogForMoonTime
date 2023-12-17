'use server';
import { cookies } from 'next/headers';

export const setToken = (token: string) => {
  cookies().set('token', token, {
    maxAge: 60 * 60,
    httpOnly: false,
    secure: true,
  });
};
