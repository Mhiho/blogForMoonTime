'use client';
import Layout from '../hoc/Layout';
import { Suspense } from 'react';

export default function Admin() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Layout>JEST Autoryzacja</Layout>;
    </Suspense>
  );
}
