import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { getInstanciaUnica } from "./patterns/singleton";
import { barramento } from "./patterns/observer";
import { FabricaNotificacao } from "./patterns/factory";
import type { Notificacao, TipoNotificacao } from "./patterns/factory";
import { estrategiasOrdenacao } from "./patterns/strategy";
import type { ChaveOrdenacao, Produto } from "./patterns/strategy";
import { comDestaque } from "./patterns/decorator";
import { CodigoExemplo } from "../CodigoExemplo/CodigoExemplo";
import codigoSingleton from "./patterns/singleton.ts?raw";
import codigoObserver from "./patterns/observer.ts?raw";
import codigoFactory from "./patterns/factory.ts?raw";
import codigoStrategy from "./patterns/strategy.ts?raw";
import codigoDecorator from "./patterns/decorator.tsx?raw";

const estilos: Record<string, CSSProperties> = {
  secao: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "24px",
    background: "#fafafa",
  },
  cabecalho: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  categoria: {
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    color: "#fff",
    background: "#333",
    padding: "3px 10px",
    borderRadius: "999px",
  },
  descricao: { fontSize: "14px", color: "#555", margin: "0 0 16px" },
  tecnologia: {
    fontSize: "13px",
    color: "#7c3aed",
    marginTop: "16px",
    paddingTop: "12px",
    borderTop: "1px dashed #ccc",
  },
  botao: {
    padding: "8px 14px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#fff",
  },
  input: {
    padding: "8px",
    marginRight: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  assinante: {
    flex: 1,
    border: "1px solid #bbb",
    borderRadius: "8px",
    padding: "12px",
    background: "#fff",
  },
};

interface SecaoProps {
  numero: number;
  titulo: string;
  categoria: string;
  descricao: string;
  tecnologia: string;
  codigo?: string;
  arquivo?: string;
  children?: ReactNode;
}

function Secao({
  numero,
  titulo,
  categoria,
  descricao,
  tecnologia,
  codigo,
  arquivo,
  children,
}: SecaoProps) {
  return (
    <section style={estilos.secao}>
      <header style={estilos.cabecalho}>
        <h2>
          {numero}. {titulo}
        </h2>
        <span style={estilos.categoria}>{categoria}</span>
      </header>
      <p style={estilos.descricao}>{descricao}</p>
      {children}
      {codigo && (
        <CodigoExemplo
          titulo="Código-fonte (exemplo):"
          arquivos={[{ nome: arquivo ?? "", codigo }]}
        />
      )}
      <p style={estilos.tecnologia}>
        <strong>Tecnologia utilizada:</strong> {tecnologia}
      </p>
    </section>
  );
}

function DemoSingleton() {
  const [contagem, setContagem] = useState(() => getInstanciaUnica().getContagem());

  useEffect(() => {
    const desinscrever = getInstanciaUnica().inscrever(setContagem);
    return () => desinscrever();
  }, []);

  return (
    <>
      <p data-testid="contagem-singleton">
        Contagem global atual: <strong>{contagem}</strong> (compartilhada por qualquer componente
        que importar o módulo)
      </p>
      <button
        data-testid="incrementar-singleton"
        style={estilos.botao}
        onClick={() => getInstanciaUnica().incrementar()}
      >
        Incrementar singleton
      </button>
    </>
  );
}

function AssinanteMensagem({ titulo }: { titulo: string }) {
  const [mensagem, setMensagem] = useState("Nenhuma mensagem recebida ainda.");

  useEffect(() => {
    const desinscrever = barramento.inscrever("mensagem", setMensagem);
    return () => desinscrever();
  }, []);

  return (
    <div style={estilos.assinante} data-testid="assinante-observer">
      <strong>{titulo}</strong>
      <p>{mensagem}</p>
    </div>
  );
}

function DemoObserver() {
  const [texto, setTexto] = useState("");

  return (
    <>
      <input
        value={texto}
        placeholder="Digite uma mensagem..."
        onChange={(e) => setTexto(e.target.value)}
        style={estilos.input}
      />
      <button
        style={estilos.botao}
        onClick={() => barramento.publicar("mensagem", texto || "(vazio)")}
      >
        Publicar evento
      </button>
      <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
        <AssinanteMensagem titulo="Assinante A (componente irmão)" />
        <AssinanteMensagem titulo="Assinante B (componente irmão)" />
      </div>
    </>
  );
}

function DemoFactory() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  const adicionar = (tipo: TipoNotificacao) => {
    setNotificacoes((atual) =>
      [
        ...atual,
        FabricaNotificacao.criar(tipo, `Objeto criado pela fábrica do tipo "${tipo}".`),
      ].slice(-4)
    );
  };

  return (
    <>
      <div style={{ display: "flex", gap: "8px" }}>
        <button style={estilos.botao} onClick={() => adicionar("sucesso")}>
          Criar sucesso
        </button>
        <button style={estilos.botao} onClick={() => adicionar("erro")}>
          Criar erro
        </button>
        <button style={estilos.botao} onClick={() => adicionar("info")}>
          Criar info
        </button>
      </div>
      <ul style={{ marginTop: "12px" }}>
        {notificacoes.map((n) => (
          <li key={n.id} style={{ color: n.cor, fontWeight: 600 }}>
            [{n.rotulo}] {n.texto}
          </li>
        ))}
      </ul>
    </>
  );
}

const produtos: Produto[] = [
  { nome: "Teclado", nota: 4.5, preco: 199 },
  { nome: "Mouse", nota: 4.9, preco: 89 },
  { nome: "Monitor", nota: 4.2, preco: 899 },
  { nome: "Headset", nota: 4.7, preco: 349 },
];

function DemoStrategy() {
  const [estrategia, setEstrategia] = useState<ChaveOrdenacao>("nota");

  const ordenados = [...produtos].sort(estrategiasOrdenacao[estrategia]);

  return (
    <>
      <select
        value={estrategia}
        onChange={(e) => setEstrategia(e.target.value as ChaveOrdenacao)}
        style={{ ...estilos.input, marginRight: 0 }}
      >
        {Object.keys(estrategiasOrdenacao).map((chave) => (
          <option key={chave} value={chave}>
            Ordenar por {chave}
          </option>
        ))}
      </select>
      <ul style={{ marginTop: "12px" }}>
        {ordenados.map((p) => (
          <li key={p.nome}>
            {p.nome} — nota {p.nota} — R$ {p.preco}
          </li>
        ))}
      </ul>
    </>
  );
}

const Etiqueta = ({ texto }: { texto: string }) => (
  <span
    style={{
      background: "#f1f5f9",
      padding: "6px 10px",
      borderRadius: "6px",
      display: "inline-block",
    }}
  >
    {texto}
  </span>
);

const EtiquetaComDestaque = comDestaque(Etiqueta);

function DemoDecorator() {
  return (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Etiqueta texto="Componente original" />
      <EtiquetaComDestaque texto="Componente decorado com comDestaque()" />
    </div>
  );
}

export function DesignPatterns() {
  return (
    <div data-testid="pagina-design-patterns">
      <h1>Design Patterns</h1>
      <p style={{ color: "#555", marginBottom: "24px" }}>
        Demonstração prática de padrões de projeto (GoF) aplicados no front-end com React e
        TypeScript puro.
      </p>

      <Secao
        numero={1}
        titulo="Singleton"
        categoria="Criacional"
        descricao="Garante que exista apenas uma única instância de um objeto em toda a aplicação, com ponto de acesso global."
        tecnologia="ES Modules (import/export): o cache do módulo mantém a instância única, combinado com closures para encapsular o estado."
        codigo={codigoSingleton}
        arquivo="patterns/singleton.ts"
      >
        <DemoSingleton />
      </Secao>

      <Secao
        numero={2}
        titulo="Observer (Pub/Sub)"
        categoria="Comportamental"
        descricao="Define uma relação um-para-muitos: quando o sujeito muda de estado, todos os observadores inscritos são notificados automaticamente."
        tecnologia="TypeScript puro (Map + Set de listeners) integrado aos hooks useEffect/useRef do React para inscrever e limpar os observadores."
        codigo={codigoObserver}
        arquivo="patterns/observer.ts"
      >
        <DemoObserver />
      </Secao>

      <Secao
        numero={3}
        titulo="Factory Method"
        categoria="Criacional"
        descricao="Centraliza a criação de objetos complexos: quem consome pede um objeto à fábrica sem precisar conhecer os detalhes de construção."
        tecnologia="Função factory em TypeScript (objeto literal com método criar), retornando objetos já configurados por tipo."
        codigo={codigoFactory}
        arquivo="patterns/factory.ts"
      >
        <DemoFactory />
      </Secao>

      <Secao
        numero={4}
        titulo="Strategy"
        categoria="Comportamental"
        descricao="Encapsula algoritmos intercambiáveis: a mesma tarefa (ordenar) pode usar diferentes estratégias escolhidas em tempo de execução."
        tecnologia="Funções de primeira classe em TypeScript: cada estratégia é uma função comparadora passada ao Array.prototype.sort."
        codigo={codigoStrategy}
        arquivo="patterns/strategy.ts"
      >
        <DemoStrategy />
      </Secao>

      <Secao
        numero={5}
        titulo="Decorator"
        categoria="Estrutural"
        descricao="Adiciona responsabilidades a um objeto/componente sem modificar seu código original, envolvendo-o com comportamento extra."
        tecnologia="Higher-Order Components (HOC), padrão nativo do React: função que recebe um componente e retorna um novo componente estendido."
        codigo={codigoDecorator}
        arquivo="patterns/decorator.tsx"
      >
        <DemoDecorator />
      </Secao>
    </div>
  );
}
