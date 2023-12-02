import path from 'path';
import fs from 'fs';

const place = path.join(process.cwd(), 'posts/');
export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const data = `---\n
  title: "${body.title}"
  subtitle: "${body.subtitle}"
  date: "${body.date}"\n---
  \n
  ${body.content}`;
  fs.writeFile(`${place}${body.title}.md`, data, () => {});
  return Response.json('Hello');
}
