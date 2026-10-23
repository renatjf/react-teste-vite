import { useState } from "react";
import type { CSSProperties } from "react";

interface ArquivoExemplo {
  nome: string;
  codigo: string;
}

interface CodigoExemploProps {
  arquivos: ArquivoExemplo[];
  titulo?: string;
}

const estilos: Record<string, CSSProperties> = {
  container: {
    marginTop: "24px",
  },
  titulo: {
    fontSize: "15px",
    marginBottom: "12px",
  },
  abas: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
  },
  aba: {
    padding: "6px 14px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderBottom: "none",
    borderRadius: "8px 8px 0 0",
    background: "#e5e5e5",
    fontSize: "13px",
    fontFamily:
      "'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  abaAtiva: {
    background: "#1e1e2e",
    color: "#cdd6f4",
    fontWeight: 700,
  },
  pre: {
    margin: 0,
    background: "#1e1e2e",
    color: "#cdd6f4",
    borderRadius: "0 8px 8px 8px",
    padding: "16px",
    fontSize: "13px",
    lineHeight: 1.6,
    overflowX: "auto",
    whiteSpace: "pre",
    fontFamily:
      "'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
};

export function CodigoExemplo({
  arquivos,
  titulo = "Como foi feito (código):",
}: CodigoExemploProps) {
  const [abaAtiva, setAbaAtiva] = useState(0);
  const indiceSeguro = Math.min(abaAtiva, arquivos.length - 1);
  const arquivoAtual = arquivos[indiceSeguro];

  return (
    <div style={estilos.container} data-testid="codigo-exemplo">
      <h3 style={estilos.titulo}>{titulo}</h3>
      <div role="tablist" style={estilos.abas}>
        {arquivos.map((arquivo, indice) => (
          <button
            key={arquivo.nome}
            role="tab"
            aria-selected={indice === indiceSeguro}
            style={{
              ...estilos.aba,
              ...(indice === indiceSeguro ? estilos.abaAtiva : {}),
            }}
            onClick={() => setAbaAtiva(indice)}
          >
            {arquivo.nome}
          </button>
        ))}
      </div>
      <pre style={estilos.pre}>
        <code>{arquivoAtual.codigo.trim()}</code>
      </pre>
    </div>
  );
}
