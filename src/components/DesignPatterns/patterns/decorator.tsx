import type { ComponentType } from "react";

export function comDestaque<P extends object>(Componente: ComponentType<P>) {
  function ComponenteComDestaque(props: P) {
    return (
      <div
        style={{
          border: "2px dashed #7c3aed",
          padding: "8px",
          borderRadius: "10px",
          display: "inline-block",
        }}
      >
        <Componente {...props} />
      </div>
    );
  }
  const nome =
    (Componente as { displayName?: string }).displayName ||
    (Componente as { name?: string }).name ||
    "Component";
  ComponenteComDestaque.displayName = `comDestaque(${nome})`;
  return ComponenteComDestaque;
}
