'use client';
import { ComponentFactory, useEffect, useState } from 'react';
import { useRemark } from 'react-remark';

interface Params {
  params: {
    slug: string;
  };
}
export interface Post {
  slug: string;
  data: {
    title: string;
    subtitle: string;
    date: string;
  };
  content: string;
}

const Post = ({ params }: Params) => {
  const [post, setPost] = useState<Post>();
  const [content, setContent] = useRemark();

  useEffect(() => {
    fetch(`/api/readFile?slug=${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      });
    post && post.content && setContent(post.content);
  }, [params.slug, post, setContent]);

  if (post) {
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
