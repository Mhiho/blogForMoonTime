'use client';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { Post } from '../posts/[slug]/page';
import Link from 'next/link';
import { deleteToken } from '@/ helpers/deleteToken';
import { getToken } from '@/ helpers/getToken';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visibleLogout, setVisibleLogout] = useState(false);

  const router = useRouter();

  const logoutHandler = async () => {
    deleteToken();
    setVisibleLogout(false);
    router.push('/');
  };

  useEffect(() => {
    const helper = async () => {
      const data = await fetch('/api/readFiles');
      setPosts(await data.json());
    };
    helper();
  }, []);
  useEffect(() => {
    const helper = async () => {
      const token = await Promise.resolve(getToken());
      if (token) setVisibleLogout(true);
      if (!token) setVisibleLogout(false);
    };
    helper();
  }, [setVisibleLogout]);

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
      {!visibleLogout ? (
        <Button>
          <Link href='/login'>Login</Link>
        </Button>
      ) : (
        <Button onClick={() => logoutHandler()}>Logout</Button>
      )}
      {/* <Breadcrumb items={items} /> */}
    </>
  );
};

export default Navbar;
