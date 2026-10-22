import { getMessages, removeMessage } from "./actions";
import { MessageForm } from "@/components/MessageForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Server Actions e formulários",
};

export default async function ServerActionsPage() {
  const messages = await getMessages();

  return (
    <div>
      <h1>Server Actions e formulários</h1>
      <p>
        Server Actions são funções assíncronas que executam no servidor e podem
        ser chamadas diretamente de formulários ou de Client Components. Elas
        eliminam a necessidade de criar uma API Route só para uma mutação
        simples.
      </p>

      <section className="card">
        <h2>Como funciona</h2>
        <p>
          O arquivo <code>actions.js</code> começa com{" "}
          <code>&quot;use server&quot;</code>. Todas as funções exportadas viram
          Server Actions e são executadas no servidor.
        </p>
        <pre className="code">
          <code>{`"use server";

import { revalidatePath } from "next/cache";

export async function addMessage(previousState, formData) {
  const text = formData.get("text")?.toString().trim();
  if (!text) return { error: "Digite uma mensagem.", success: false };

  messages = [...messages, { id: Date.now(), text }];
  revalidatePath("/server-actions");

  return { error: null, success: true };
}`}</code>
        </pre>
      </section>

      <section className="card">
        <h2>Exemplo 1: formulário com useActionState</h2>
        <p>
          O Client Component usa <code>useActionState</code> para chamar a
          action, receber o estado retornado e renderizar erros. O botão fica
          desabilitado durante o envio.
        </p>
        <MessageForm />
        <pre className="code" style={{ marginTop: "1rem" }}>
          <code>{`"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { addMessage } from "@/app/server-actions/actions";

export function MessageForm() {
  const [state, formAction] = useActionState(addMessage, { error: null });
  return (
    <form action={formAction}>
      <input name="text" />
      <button disabled={state.error}>Enviar</button>
    </form>
  );
}`}</code>
        </pre>
      </section>

      <section className="card">
        <h2>Exemplo 2: formulário direto com server action</h2>
        <p>
          Para ações simples, o formulário pode apontar direto para a action. O
          botão abaixo remove uma mensagem e chama{" "}
          <code>revalidatePath</code> para atualizar a página.
        </p>
        <ul className="list">
          {messages.map((message) => (
            <li key={message.id}>
              <span>{message.text}</span>
              <form action={removeMessage}>
                <input type="hidden" name="id" value={message.id} />
                <button className="btn btn-secondary" type="submit">
                  Remover
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Pontos importantes</h2>
        <ul>
          <li>
            <strong>useFormStatus</strong> precisa estar dentro de um componente
            filho do <code>&lt;form&gt;</code> para funcionar.
          </li>
          <li>
            <strong>revalidatePath</strong> invalida o cache da rota e faz o
            Server Component buscar os dados atualizados.
          </li>
          <li>
            Server Actions recebem <code>FormData</code> quando usadas em{" "}
            <code>action=</code> de formulários.
          </li>
          <li>
            Ao usar <code>useActionState</code>, a assinatura é{" "}
            <code>(estadoAnterior, formData)</code>.
          </li>
          <li>
            O código da action nunca vai para o navegador; apenas uma referência
            segura é enviada.
          </li>
        </ul>
        <div className="hint">
          Os dados deste exemplo ficam em memória no módulo do servidor. Em uma
          aplicação real, substitua o array por um banco de dados.
        </div>
      </section>
    </div>
  );
}
