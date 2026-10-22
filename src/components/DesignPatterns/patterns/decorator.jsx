export function comDestaque(Componente) {
  function ComponenteComDestaque(props) {
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
  ComponenteComDestaque.displayName = `comDestaque(${
    Componente.displayName || Componente.name || "Component"
  })`;
  return ComponenteComDestaque;
}
