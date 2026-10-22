import Link from "next/link";
import { PostNavigator } from "@/components/PostNavigator";
import { posts } from "@/data/posts";

export const metadata = {
  title: "Rotas dinâmicas e navegação",
};

export default function DynamicRoutesPage() {
  return (
    <div>
      <h1>Rotas dinâmicas e navegação</h1>
      <p>
        A pasta <code>[id]</code> cria uma rota dinâmica. Qualquer valor nesse
        segmento da URL é capturado em <code>params.id</code>.
      </p>

      <section className="card">
        <h2>Estrutura</h2>
        <pre className="code">
          <code>{`src/app/dynamic-routes/
├── page.js          # esta lista
├── not-found.js     # 404 da seção
└── [id]/
    ├── page.js      # /dynamic-routes/:id
    └── loading.js   # loading específico do post`}</code>
        </pre>
        <p>
          Abaixo usamos o componente <code>Link</code> do Next.js. Ele faz
          prefetch das rotas visíveis e navega sem recarregar a página.
        </p>
        <ul className="list">
          {posts.map((post) => (
            <li key={post.id}>
              <div>
                <strong>{post.title}</strong>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>
                  {post.excerpt}
                </p>
              </div>
              <Link href={`/dynamic-routes/${post.id}`}>Abrir →</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Exemplo prático: navegação programática</h2>
        <p>
          Além do <code>Link</code>, podemos navegar com o hook{" "}
          <code>useRouter</code>. Escolha um post e veja o redirecionamento
          acontecer pelo cliente, sem recarregar a página.
        </p>
        <div className="practice">
          <PostNavigator posts={posts} />
          <p className="muted" style={{ marginTop: "0.5rem" }}>
            O botão &quot;Testar notFound()&quot; navega para um id inexistente
            e aciona o <code>not-found.js</code>.
          </p>
        </div>
      </section>

      <section className="card">
        <h2>params é assíncrono</h2>
        <p>
          Em Server Components, <code>params</code> é uma Promise. Por isso
          usamos <code>await params</code> na página e em{" "}
          <code>generateMetadata</code>.
        </p>
        <pre className="code">
          <code>{`export default async function PostPage({ params }) {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) notFound();
  return <h1>{post.title}</h1>;
}`}</code>
        </pre>
        <div className="hint">
          Se o id não existir, chamamos <code>notFound()</code> para renderizar
          o <code>not-found.js</code>. Teste acessando{" "}
          <Link href="/dynamic-routes/999">/dynamic-routes/999</Link>.
        </div>
      </section>
    </div>
  );
}
