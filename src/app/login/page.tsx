'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { setToken } from '@/ helpers/setToken';
import { loginData } from '@/db/configuration';
import { getToken } from '@/ helpers/getToken';
import { useEffect, useState } from 'react';

interface Inputs {
  login: string;
  password: string;
}
const Login = () => {
  const login = process.env.NEXT_PUBLIC_LOGIN;
  const password = process.env.NEXT_PUBLIC_PASSWORD;
  const [submited, setSubmited] = useState(false);
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
      let res;
      if (data.login === login && data.password === password) {
        res = await fetch('/api/proxy/login', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        });
      }
      if (res && res.ok) {
        const { token } = await res.json();
        setToken(token);
        setSubmited(true);
      } else {
        console.log('response not ok');
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(submited);
  useEffect(() => {
    const token = Promise.resolve(getToken());
    token.then((res) => res && setSubmited(true));
    submited && router.push('/');
  }, [router, submited]);
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
