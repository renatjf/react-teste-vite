"use client";

import { useState } from "react";

export function LayoutCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="practice">
      <p>
        <strong>Exemplo prático</strong>
      </p>
      <p className="muted">
        Este contador vive no layout da seção. Navegue entre as rotas filhas: o
        valor continua porque o layout não é desmontado.
      </p>
      <button
        className="btn btn-secondary"
        onClick={() => setCount((current) => current + 1)}
      >
        Cliques: {count}
      </button>
    </div>
  );
}
