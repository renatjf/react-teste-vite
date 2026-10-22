import { memo, useCallback, useState } from "react";

const MemoChild = memo(function MemoChild({ label, onAction }) {
  console.log(`Renderizou: ${label}`);

  return (
    <div style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }}>
      <p><strong>{label}</strong></p>
      <button onClick={onAction} style={{ padding: "0.4rem 0.8rem", cursor: "pointer" }}>
        Executar ação
      </button>
    </div>
  );
});

export function UseCallbackExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [step, setStep] = useState(1);

  const handleIncrementMemoized = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleIncrementInline = () => {
    setCount((prev) => prev + 1);
  };

  const handleIncrementByStep = useCallback(() => {
    setCount((prev) => prev + step);
  }, [step]);

  return (
    <div>
      <h2>useCallback</h2>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 1: Função memorizada vs função recriada</h3>
        <p><strong>O que foi feito:</strong> Os dois filhos usam React.memo. O primeiro recebe uma função criada com useCallback (referência estável). O segundo recebe uma função inline, recriada a cada render do pai. Ao digitar no input, apenas o segundo filho re-renderiza.</p>
        <p><small>Abra o console e veja as mensagens "Renderizou" para confirmar.</small></p>
        <p><strong>count:</strong> {count}</p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite para re-renderizar o pai"
          style={{ padding: "0.5rem", width: "100%", maxWidth: "300px", marginBottom: "1rem" }}
        />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <MemoChild label="Com useCallback" onAction={handleIncrementMemoized} />
          <MemoChild label="Sem useCallback (inline)" onAction={handleIncrementInline} />
        </div>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 2: useCallback com dependências</h3>
        <p><strong>O que foi feito:</strong> A função handleIncrementByStep é recriada apenas quando step muda. O array de dependências garante que a função use sempre o valor atualizado de step.</p>
        <p><strong>count:</strong> {count}</p>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <label>
            Passo:{" "}
            <select
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              style={{ padding: "0.4rem" }}
            >
              {[1, 2, 5, 10].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={handleIncrementByStep}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Incrementar em {step}
          </button>
        </div>
      </section>

      <section style={{ padding: "1rem", background: "#f9f9f9", border: "1px solid #ddd" }}>
        <h3>Quando usar useCallback</h3>
        <ul>
          <li><strong>Props de componentes memoizados:</strong> Evita que filhos com React.memo re-renderizem por causa de uma nova referência de função.</li>
          <li><strong>Dependências de outros hooks:</strong> Funções usadas em useEffect/useMemo que precisam de referência estável.</li>
          <li><strong>Não use em tudo:</strong> Sem React.memo ou dependências, o ganho é nulo e adiciona complexidade.</li>
        </ul>
        <p><strong>Relação com useMemo:</strong> useCallback(fn, deps) é equivalente a useMemo(() =&gt; fn, deps). useMemo memoriza um valor; useCallback memoriza uma função.</p>
      </section>
    </div>
  );
}
