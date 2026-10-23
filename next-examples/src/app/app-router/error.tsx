"use client";

export default function AppRouterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="card">
      <h1>Algo deu errado</h1>
      <p>
        Este componente é o <code>error.tsx</code> do segmento app-router. Ele
        capturou um erro lançado por uma página filha.
      </p>
      <div className="error-box">
        <strong>Mensagem:</strong> {error.message}
      </div>
      <p>
        Como é um Client Component, ele recebe <code>error</code> e{" "}
        <code>reset</code>. O botão abaixo tenta renderizar o segmento
        novamente.
      </p>
      <button className="btn" onClick={() => reset()}>
        Tentar novamente
      </button>
    </div>
  );
}
