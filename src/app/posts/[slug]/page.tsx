'use client';
import { getPostData } from '@/app/lib/getFiles';
import { ComponentFactory, useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import { Compatible } from 'vfile';
import { useRouter } from 'next/navigation';
import { useRemark } from 'react-remark';

interface Params {
  params: {
    slug: string;
  };
}

const Post = ({ params }: Params) => {
  const [post, setPost] = useState({});
  const [content, setContent] = useRemark();

  useEffect(() => {
    fetch(`/api/readFile?slug=${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      });
    post && post.content && setContent(post.content.content);
  }, [params.slug, post.content]);

  if (post.data) {
    return (
      <>
        <h1>{post.data.title}</h1>
        <h2>{post.data.date}</h2>
        <br />
        <div>{content}</div>
      </>
    );
  }
};

export default Post;

export async function getStaticPaths({ params }) {
  console.log(params);
}
