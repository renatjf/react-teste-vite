"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { addMessage } from "@/app/server-actions/actions";
import type { MessageActionState } from "@/app/server-actions/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="btn" type="submit" disabled={pending}>
      {pending ? "Enviando…" : "Adicionar mensagem"}
    </button>
  );
}

export function MessageForm() {
  const [state, formAction] = useActionState<MessageActionState, FormData>(
    addMessage,
    {
      error: null,
      success: false,
    }
  );

  return (
    <form action={formAction}>
      <div className="row">
        <input
          className="input"
          type="text"
          name="text"
          placeholder="Nova mensagem"
          autoComplete="off"
        />
        <SubmitButton />
      </div>
      {state.error && (
        <p className="error-box" style={{ marginBottom: 0 }}>
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="ok" style={{ marginBottom: 0 }}>
          Mensagem adicionada no servidor.
        </p>
      )}
    </form>
  );
}
