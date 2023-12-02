'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Post } from '../[slug]/page';

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch('/api/readFiles')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  return (
    <ul>
      {posts &&
        posts.map(({ slug, data }) => {
          return (
            <Link key={slug} href={slug}>
              <li>
                {data.title}
                <h3>{data.date}</h3>
              </li>
            </Link>
          );
        })}
    </ul>
  );
};
export default Dashboard;
