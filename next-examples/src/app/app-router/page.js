import Link from "next/link";

export const metadata = {
  title: "App Router e layouts",
};

export default function AppRouterPage() {
  return (
    <div>
      <h1>App Router e layouts</h1>
      <p>
        O App Router organiza as rotas pela estrutura de pastas dentro de{" "}
        <code>src/app</code>. Cada pasta representa um segmento de URL e arquivos
        especiais definem o comportamento daquele segmento.
      </p>

      <section className="card">
        <h2>Arquivos especiais usados nesta seção</h2>
        <pre className="code">
          <code>{`src/app/
├── layout.js              # layout raiz (cabeçalho global)
├── not-found.js           # 404 global
└── app-router/
    ├── layout.js          # layout aninhado (menu lateral)
    ├── page.js            # /app-router
    ├── loading.js         # UI de carregamento do segmento
    ├── error.js           # error boundary do segmento
    ├── not-found.js       # 404 do segmento
    ├── sobre/page.js      # /app-router/sobre
    ├── lento/page.js      # demonstra loading.js
    ├── erro/page.js       # demonstra error.js
    └── [...slug]/page.js  # captura rotas desconhecidas e chama notFound()`}</code>
        </pre>
      </section>

      <section className="card">
        <h2>O que observar</h2>
        <ul>
          <li>
            <strong>layout.js</strong>: envolve todas as páginas filhas e não
            desmonta ao navegar entre elas. Ideal para menus e cabeçalhos.
          </li>
          <li>
            <strong>page.js</strong>: o conteúdo exclusivo daquela rota.
          </li>
          <li>
            <strong>loading.js</strong>: exibido automaticamente enquanto o
            conteúdo da rota carrega (streaming/Suspense).
          </li>
          <li>
            <strong>error.js</strong>: captura erros das rotas filhas. Precisa
            ser um Client Component.
          </li>
          <li>
            <strong>not-found.js</strong>: renderizado quando a página chama{" "}
            <code>notFound()</code> ou quando a rota não existe.
          </li>
        </ul>
        <div className="hint">
          Use o menu lateral para navegar: o layout permanece, só o conteúdo
          central muda. Note também que o cabeçalho global do layout raiz nunca
          é recarregado.
        </div>
      </section>

      <section className="card">
        <h2>Exemplo prático: estado que sobrevive à navegação</h2>
        <p>
          No menu lateral há um contador. Ele está em um Client Component
          renderizado dentro do <code>layout.js</code> da seção.
        </p>
        <div className="practice">
          <p>
            <strong>Teste agora:</strong> clique no contador do menu lateral,
            navegue para <Link href="/app-router/sobre">Sobre</Link> e volte. O
            valor permanece porque o layout não é desmontado.
          </p>
          <p className="muted">
            Esse é um dos principais benefícios dos layouts aninhados: preservar
            estado e evitar re-renderizações desnecessárias durante a navegação.
          </p>
        </div>
      </section>

      <section className="card">
        <h2>Layout raiz</h2>
        <p>
          O <code>src/app/layout.js</code> é obrigatório e deve conter as tags{" "}
          <code>html</code> e <code>body</code>. Ele é compartilhado por todas as
          rotas.
        </p>
      </section>
    </div>
  );
}
