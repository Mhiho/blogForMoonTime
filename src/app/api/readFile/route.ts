import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: Request) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  const params = new URL(request.url).searchParams;
  const slug = params.get('slug');
  const fileName = fileNames.find((files) => files === `${slug}.md`);
  const filePath = fileName && path.join(postsDirectory, fileName);
  const file = filePath && fs.readFileSync(filePath, 'utf8');
  const matterResult = file && matter(file);
  const payload = matterResult && {
    slug,
    ...matterResult,
    data: { ...matterResult.data },
  };
  return Response.json(payload);
}
