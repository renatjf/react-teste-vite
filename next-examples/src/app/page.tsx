import Link from "next/link";

const examples = [
  {
    href: "/app-router",
    title: "App Router e layouts",
    description:
      "Layouts aninhados, loading.tsx, error.tsx, not-found.tsx e a estrutura de pastas do App Router.",
  },
  {
    href: "/server-client",
    title: "Server e Client Components",
    description:
      "Quando um componente roda no servidor, quando precisa de 'use client' e como compor os dois.",
  },
  {
    href: "/data-fetching",
    title: "Data fetching",
    description:
      "Busca de dados em Server Components, fetch paralelo, cache, revalidação e streaming com Suspense.",
  },
  {
    href: "/dynamic-routes",
    title: "Rotas dinâmicas e navegação",
    description:
      "Segmentos dinâmicos com [id], params assíncronos, generateMetadata, Link e useRouter.",
  },
  {
    href: "/api-routes",
    title: "Route Handlers (API)",
    description:
      "Endpoints GET e POST em app/api, leitura de JSON, parâmetros dinâmicos e status HTTP.",
  },
  {
    href: "/server-actions",
    title: "Server Actions e formulários",
    description:
      "Mutações executadas no servidor, revalidatePath, useActionState e useFormStatus.",
  },
];

export default function Home() {
  return (
    <div>
      <h1>Exemplos de Next.js</h1>
      <p>
        Este projeto demonstra os principais recursos do Next.js com App Router.
        Cada página explica o conceito e mostra o código em execução.
      </p>

      <div className="card-grid" style={{ marginTop: "1.5rem" }}>
        {examples.map((example) => (
          <section className="card" key={example.href}>
            <h2>{example.title}</h2>
            <p>{example.description}</p>
            <Link className="more" href={example.href}>
              Ver exemplo →
            </Link>
          </section>
        ))}
      </div>

      <section className="card" style={{ marginTop: "1.5rem" }}>
        <h2>Como executar</h2>
        <pre className="code">
          <code>{`cd next-examples
npm run dev
# abra http://localhost:3000`}</code>
        </pre>
        <p>
          Este é um projeto separado do app Vite que está na raiz do
          repositório. Ele usa Next.js 16 com App Router, TypeScript e
          src/app.
        </p>
      </section>
    </div>
  );
}
