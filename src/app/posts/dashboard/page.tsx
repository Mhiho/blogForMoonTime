'use client';
import { getPostsData } from '@/app/lib/getFiles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('/api/readFiles')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  console.log({ posts });
  return (
    <ul>
      {posts &&
        posts.map(({ slug, data }) => {
          return (
            <li key={slug}>
              <a href={slug}>{data.title}</a>
              <h3>{data.date}</h3>
            </li>
          );
        })}
    </ul>
  );
};
export default Dashboard;
