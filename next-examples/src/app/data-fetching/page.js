import { Suspense } from "react";
import { RefreshButton } from "@/components/RefreshButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Data fetching",
};

const fallbackUsers = [
  { id: 1, name: "Ana (dados locais)", email: "ana@example.com" },
  { id: 2, name: "Bruno (dados locais)", email: "bruno@example.com" },
];

const fallbackPosts = [
  { id: 1, title: "Post local de exemplo" },
  { id: 2, title: "Outro post local de exemplo" },
];

async function fetchUsers() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users?_limit=5",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    return { data: await response.json(), fromApi: true };
  } catch {
    return { data: fallbackUsers, fromApi: false };
  }
}

async function fetchPosts() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    return { data: await response.json(), fromApi: true };
  } catch {
    return { data: fallbackPosts, fromApi: false };
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function SlowBox() {
  await delay(1500);

  return (
    <div className="ok">
      Este bloco demorou 1,5s para renderizar no servidor e chegou depois do
      restante da página, graças ao streaming com Suspense.
    </div>
  );
}

export default async function DataFetchingPage() {
  const [usersResult, postsResult] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
  ]);
  const renderedAt = new Date().toLocaleString("pt-BR");

  return (
    <div>
      <h1>Data fetching</h1>
      <p>
        Server Components podem ser assíncronos e buscar dados diretamente com{" "}
        <code>async/await</code>. O resultado já chega renderizado ao navegador,
        sem um <code>useEffect</code> para carregar dados.
      </p>

      <section className="card">
        <h2>Exemplo 1: fetch em paralelo</h2>
        <p>
          As duas requisições abaixo são disparadas juntas com{" "}
          <code>Promise.all</code>. Se fossem sequenciais, o tempo total seria a
          soma das duas.
        </p>
        <pre className="code">
          <code>{`export default async function Page() {
  const [users, posts] = await Promise.all([
    fetch("https://api.example.com/users", { cache: "no-store" }),
    fetch("https://api.example.com/posts", { cache: "no-store" }),
  ]);
  // ...
}`}</code>
        </pre>

        {!usersResult.fromApi && (
          <div className="hint">
            A API externa não respondeu (provavelmente sem rede). Exibindo dados
            locais de fallback.
          </div>
        )}

        <div className="card-grid">
          <div>
            <h3>Usuários</h3>
            <ul className="list">
              {usersResult.data.map((user) => (
                <li key={user.id}>
                  <span>{user.name}</span>
                  <small style={{ color: "var(--muted)" }}>{user.email}</small>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Posts</h3>
            <ul className="list">
              {postsResult.data.map((post) => (
                <li key={post.id}>
                  <span>{post.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Exemplo 2: Streaming com Suspense</h2>
        <p>
          Partes lentas podem ser isoladas em um <code>&lt;Suspense&gt;</code>.
          O restante da página aparece imediatamente e o bloco abaixo chega
          depois.
        </p>
        <pre className="code">
          <code>{`<Suspense fallback={<p>Carregando bloco lento…</p>}>
  <SlowBox />
</Suspense>`}</code>
        </pre>
        <Suspense
          fallback={
            <div className="row">
              <span className="spinner" aria-hidden="true" />
              <span>Carregando bloco lento…</span>
            </div>
          }
        >
          <SlowBox />
        </Suspense>
      </section>

      <section className="card">
        <h2>Exemplo prático: atualizar os dados</h2>
        <p>
          O botão abaixo usa <code>router.refresh()</code> para pedir ao Next.js
          que renderize novamente esta rota no servidor, executando os{" "}
          <code>fetch</code> outra vez sem recarregar a página inteira.
        </p>
        <div className="practice">
          <p>
            <strong>Última renderização no servidor:</strong> {renderedAt}
          </p>
          <RefreshButton />
          <p className="muted" style={{ marginTop: "0.5rem" }}>
            Clique e observe o horário e os dados serem atualizados.
          </p>
        </div>
      </section>

      <section className="card">
        <h2>Controle de cache</h2>
        <p>
          O Next.js estende o <code>fetch</code> para integrar com seu cache.
          Algumas opções comuns:
        </p>
        <pre className="code">
          <code>{`// Sempre buscar novamente no servidor
fetch(url, { cache: "no-store" });

// Guardar no cache e revalidar a cada 60 segundos (ISR)
fetch(url, { next: { revalidate: 60 } });

// Revalidar uma rota inteira após uma mutação
import { revalidatePath } from "next/cache";
revalidatePath("/data-fetching");

// Forçar a rota a ser sempre dinâmica
export const dynamic = "force-dynamic";`}</code>
        </pre>
        <ul>
          <li>
            <strong>no-store</strong>: dados sempre frescos, sem cache.
          </li>
          <li>
            <strong>revalidate</strong>: cache com revalidação periódica
            (Incremental Static Regeneration).
          </li>
          <li>
            <strong>dynamic = &quot;force-dynamic&quot;</strong>: renderiza a
            rota a cada requisição.
          </li>
        </ul>
        <div className="hint">
          Nesta página usamos <code>force-dynamic</code> e{" "}
          <code>cache: &quot;no-store&quot;</code> para que os dados sejam
          buscados a cada acesso. Em produção, escolha a estratégia de cache de
          acordo com a frequência de atualização dos dados.
        </div>
      </section>
    </div>
  );
}
