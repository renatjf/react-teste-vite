import { ClientBox } from "@/components/ClientBox";
import { ClientCounter } from "@/components/ClientCounter";

export const metadata = {
  title: "Server e Client Components",
};

export default function ServerClientPage() {
  const serverTime = new Date().toLocaleString("pt-BR");
  const nodeVersion = process.version;

  return (
    <div>
      <h1>Server e Client Components</h1>
      <p>
        No App Router, todos os componentes são Server Components por padrão. Um
        componente só vira Client Component quando o arquivo declara{" "}
        <code>&quot;use client&quot;</code>.
      </p>

      <section className="card">
        <h2>
          <span className="badge">Server</span> Esta página
        </h2>
        <p>
          Esta página é um Server Component. Ela roda apenas no servidor e pode
          acessar recursos de backend diretamente, sem enviar esse código para o
          navegador.
        </p>
        <ul>
          <li>
            <strong>Horário do servidor:</strong> {serverTime}
          </li>
          <li>
            <strong>Versão do Node:</strong> {nodeVersion}
          </li>
          <li>
            <strong>Hooks de estado:</strong> indisponíveis aqui
          </li>
        </ul>
        <pre className="code">
          <code>{`// src/app/server-client/page.tsx (Server Component)
import { ClientCounter } from "@/components/ClientCounter";

export default function Page() {
  const serverTime = new Date().toLocaleString("pt-BR");
  return (
    <>
      <p>Horário do servidor: {serverTime}</p>
      <ClientCounter initial={0} />
    </>
  );
}`}</code>
        </pre>
      </section>

      <section className="card">
        <h2>
          <span className="badge">Client</span> Componente interativo
        </h2>
        <p>
          O componente abaixo está em um arquivo separado com{" "}
          <code>&quot;use client&quot;</code>. Ele pode usar <code>useState</code>,
          eventos de clique e APIs do navegador.
        </p>
        <ClientCounter initial={0} />
        <pre className="code">
          <code>{`"use client";

import { useState } from "react";

export function ClientCounter({ initial = 0 }) {
  const [count, setCount] = useState(initial);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`}</code>
        </pre>
      </section>

      <section className="card">
        <h2>Exemplo prático: composição Server + Client</h2>
        <p>
          Um Client Component não pode importar um Server Component, mas pode
          recebê-lo como <code>children</code>. O bloco abaixo é renderizado no
          servidor e passado para o <code>ClientBox</code>, que controla apenas
          a visibilidade com estado local.
        </p>
        <ClientBox>
          <div className="ok">
            <strong>Conteúdo renderizado no servidor:</strong> {serverTime}.
            Este trecho não usa estado nem JavaScript de cliente; ele foi
            enviado pronto pelo servidor e colocado dentro do Client Component.
          </div>
        </ClientBox>
      </section>

      <section className="card">
        <h2>Regras importantes</h2>
        <ul>
          <li>
            O código do Client Component é enviado ao navegador; o do Server
            Component não.
          </li>
          <li>
            Um Server Component pode importar e renderizar um Client Component.
          </li>
          <li>
            Um Client Component não pode importar um Server Component, mas pode
            receber um Server Component como <code>children</code>.
          </li>
          <li>
            Props passadas do servidor para o cliente precisam ser
            serializáveis (sem funções, classes ou valores não serializáveis).
          </li>
          <li>
            A diretiva <code>&quot;use client&quot;</code> marca o limite: todos
            os imports abaixo dela no grafo também viram client-side.
          </li>
        </ul>
        <div className="hint">
          Regra prática: comece com Server Components. Adicione{" "}
          <code>&quot;use client&quot;</code> apenas onde precisar de
          interatividade, estado ou APIs do navegador.
        </div>
      </section>
    </div>
  );
}
