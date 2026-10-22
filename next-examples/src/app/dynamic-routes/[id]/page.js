import Link from "next/link";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { getPostById, posts } from "@/data/posts";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = getPostById(id);

  return {
    title: post ? post.title : "Post não encontrado",
    description: post?.excerpt,
  };
}

export default async function PostPage({ params }) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    notFound();
  }

  const currentIndex = posts.findIndex((item) => item.id === id);
  const previousPost = posts[currentIndex - 1];
  const nextPost = posts[currentIndex + 1];

  return (
    <div>
      <BackButton />

      <h1 style={{ marginTop: "1rem" }}>{post.title}</h1>
      <p style={{ color: "var(--muted)" }}>
        Rota acessada: <code>/dynamic-routes/{post.id}</code>
      </p>

      <section className="card">
        <p>{post.content}</p>
      </section>

      <section className="card">
        <h2>generateMetadata</h2>
        <p>
          O título da aba do navegador foi gerado dinamicamente com{" "}
          <code>generateMetadata</code>, que também recebe <code>params</code>{" "}
          como Promise.
        </p>
        <pre className="code">
          <code>{`export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = getPostById(id);
  return { title: post.title, description: post.excerpt };
}`}</code>
        </pre>
      </section>

      <div className="row" style={{ justifyContent: "space-between" }}>
        {previousPost ? (
          <Link href={`/dynamic-routes/${previousPost.id}`}>
            ← {previousPost.title}
          </Link>
        ) : (
          <span />
        )}
        {nextPost ? (
          <Link href={`/dynamic-routes/${nextPost.id}`}>
            {nextPost.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
