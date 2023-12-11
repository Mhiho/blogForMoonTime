'use client';
import { sessionStatus } from '@/auth';
import Layout from '../hoc/Layout';
import { redirect } from 'next/navigation';
import { useState, useLayoutEffect, Suspense } from 'react';

export default function Admin() {
  const [session, setSession] = useState(true);
  useLayoutEffect(() => {
    sessionStatus().then((res) => setSession(res));
    if (!session) redirect('/');
  }, [session]);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Layout>JEST Autoryzacja</Layout>;
    </Suspense>
  );
}
