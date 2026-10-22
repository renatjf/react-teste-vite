"use client";

import { useState } from "react";

export function ClientCounter({ initial = 0 }) {
  const [count, setCount] = useState(initial);
  const [name, setName] = useState("");

  return (
    <div>
      <p>
        Este é um Client Component: o arquivo começa com{" "}
        <code>&quot;use client&quot;</code> e pode usar hooks de estado e
        eventos.
      </p>

      <div className="row" style={{ marginBottom: "0.75rem" }}>
        <button className="btn" onClick={() => setCount(count + 1)}>
          Contador: {count}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setCount(initial)}
        >
          Resetar para o valor inicial ({initial})
        </button>
      </div>

      <input
        className="input"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Digite algo (estado local no cliente)"
      />
      <p style={{ marginTop: "0.5rem" }}>
        <strong>Valor digitado:</strong> {name || "(vazio)"}
      </p>
    </div>
  );
}
