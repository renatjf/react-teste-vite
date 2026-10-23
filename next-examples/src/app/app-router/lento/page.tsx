export const dynamic = "force-dynamic";

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export default async function LentoPage() {
  await delay(2000);
  const renderedAt = new Date().toLocaleString("pt-BR");

  return (
    <div>
      <h1>Página lenta</h1>
      <p>
        Esta página espera 2 segundos no servidor antes de renderizar. Durante
        essa espera, o Next.js mostra o <code>loading.tsx</code> do segmento.
      </p>
      <div className="ok">
        Renderizada no servidor em: <strong>{renderedAt}</strong>
      </div>
      <section className="card">
        <h2>Por que isso acontece?</h2>
        <p>
          O App Router usa streaming. Assim que a navegação começa, o Next.js
          envia o layout e o fallback de <code>loading.tsx</code>. Quando o
          conteúdo assíncrono termina, ele é enviado e substitui o loading.
        </p>
        <pre className="code">
          <code>{`export default async function LentoPage() {
  await delay(2000);
  return <h1>Página lenta</h1>;
}`}</code>
        </pre>
      </section>
    </div>
  );
}
