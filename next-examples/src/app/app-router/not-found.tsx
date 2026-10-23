import Link from "next/link";

export default function AppRouterNotFound() {
  return (
    <div className="card">
      <h1>404 — Página não encontrada</h1>
      <p>
        Este conteúdo vem de <code>app-router/not-found.tsx</code>. Ele é
        exibido quando uma rota filha chama <code>notFound()</code>.
      </p>
      <Link className="btn" href="/app-router">
        Voltar para a visão geral
      </Link>
    </div>
  );
}
