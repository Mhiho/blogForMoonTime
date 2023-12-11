'use client';
import { Breadcrumb, Button } from 'antd';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Post } from '../posts/[slug]/page';
import { getToken, sessionStatus } from '@/auth';
import Link from 'next/link';

export const Navbar = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [session, setSession] = useState(false);
  const logoutHandler = useCallback(async () => {
    if (session) {
      const logout = await fetch('/api/logout', {
        method: 'POST',
        body: JSON.stringify(getToken()),
        headers: {
          'content-type': 'application/json',
        },
      });
      if (logout.ok) setSession(false);
    }
  }, [session]);

  useEffect(() => {
    const getToken = async () => {
      const token = await fetch('/api/token');
      if (token) setSession(true);
    };
    getToken();
  }, []);

  useEffect(() => {
    fetch('/api/readFiles')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const subItems = posts.map((post) => {
    return { path: `/${post.slug}`, element: post.data.title };
  });

  const items = [
    {
      breadcrumbName: 'start',
      path: '/',
      title: 'start',
    },
    {
      path: 'posts',
      title: 'posts',
      children: subItems,
    },
    {
      path: 'second',
      title: 'second',
    },
  ];
  return (
    <>
      {session && <Button onClick={() => logoutHandler()}>Logout</Button>}
      {!session && (
        <Button>
          <Link href='/admin/login'>Login</Link>
        </Button>
      )}
      <Breadcrumb items={items} />
    </>
  );
};
