const posts = [
  { id: 1, title: "Primeiro post da API" },
  { id: 2, title: "Segundo post da API" },
];

export function getApiPosts() {
  return posts;
}

export function addApiPost(title) {
  const post = { id: posts.length + 1, title };
  posts.push(post);
  return post;
}

export function getApiPostById(id) {
  return posts.find((post) => post.id === Number(id));
}
