'use client';
import { AuthContext, useAuthContext } from '@/app/hoc/Context';
import { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getToken, sessionStatus, setToken } from '@/auth';

interface Inputs {
  login: string;
  password: string;
}
const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      });
      if (res.ok) {
        const token = await res.json();
        setToken(token);
        router.push('/admin');
      } else {
        console.log('Oops! Something is wrong.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Login</label>
        <input {...register('login', { required: true })} />
        {errors.login && <span>This field is required</span>}
        <label>Hasło</label>
        <input type='password' {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
        <input type='submit' />
      </form>
    </>
  );
};
export default Login;
