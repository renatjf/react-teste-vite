export interface ApiPost {
  id: number;
  title: string;
}

const posts: ApiPost[] = [
  { id: 1, title: "Primeiro post da API" },
  { id: 2, title: "Segundo post da API" },
];

export function getApiPosts(): ApiPost[] {
  return posts;
}

export function addApiPost(title: string): ApiPost {
  const post = { id: posts.length + 1, title };
  posts.push(post);
  return post;
}

export function getApiPostById(id: string): ApiPost | undefined {
  return posts.find((post) => post.id === Number(id));
}
