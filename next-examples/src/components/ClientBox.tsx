"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export function ClientBox({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="practice">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <strong>ClientBox (Client Component)</strong>
        <button
          className="btn btn-secondary"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? "Ocultar" : "Mostrar"} children
        </button>
      </div>
      <p className="muted" style={{ marginTop: "0.5rem" }}>
        Este componente tem estado no cliente e recebe conteúdo renderizado no
        servidor via children.
      </p>
      {open && <div style={{ marginTop: "0.75rem" }}>{children}</div>}
    </div>
  );
}
