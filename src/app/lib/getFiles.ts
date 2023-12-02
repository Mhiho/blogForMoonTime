import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { usePathname } from 'next/navigation';
export function getPostsData() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...matterResult,
    };
  });
  return allPostsData;
}
export function getPostData(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  console.log(slug);
  const fileName = fileNames.find((files) => files === `${slug}.md`);
  const filePath = fileName && path.join(postsDirectory, fileName);
  console.log({ filePath });
  const file = filePath && fs.readFileSync(filePath, 'utf8');
  const matterResult = file && matter(file);
  return {
    ...matterResult,
  };
}
