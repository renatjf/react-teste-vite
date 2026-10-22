import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card">
      <h1>404 — Rota não encontrada</h1>
      <p>
        O <code>not-found.js</code> raiz foi renderizado porque a URL acessada
        não corresponde a nenhuma rota do projeto.
      </p>
      <Link className="btn" href="/">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
