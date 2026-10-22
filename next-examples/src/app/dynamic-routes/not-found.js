import Link from "next/link";

export default function DynamicRoutesNotFound() {
  return (
    <div className="card">
      <h1>Post não encontrado</h1>
      <p>
        O id informado não existe. Esta página vem de{" "}
        <code>dynamic-routes/not-found.js</code> e foi acionada por{" "}
        <code>notFound()</code>.
      </p>
      <Link className="btn" href="/dynamic-routes">
        Ver todos os posts
      </Link>
    </div>
  );
}
