import { useRef, useState } from "react";

export function UseRefExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const clickCountRef = useRef(0);
  const previousValueRef = useRef<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(0);

  return (
    <div>
      <h2>useRef</h2>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 1: Acessando o DOM</h3>
        <p><strong>O que foi feito:</strong> Usamos useRef para guardar a referência de um input e chamar o método focus() diretamente no elemento DOM.</p>
        <input
          ref={inputRef}
          type="text"
          placeholder="Clique no botão para focar aqui"
          style={{ padding: "0.5rem", width: "100%", maxWidth: "300px" }}
        />
        <div style={{ marginTop: "0.5rem" }}>
          <button
            onClick={() => inputRef.current?.focus()}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Focar no input
          </button>
        </div>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 2: Valor mutável sem re-render</h3>
        <p><strong>O que foi feito:</strong> Incrementamos clickCountRef.current a cada clique. Alterar uma ref não provoca re-renderização. O valor só aparece na tela quando outro state é atualizado.</p>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => {
              clickCountRef.current += 1;
            }}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Incrementar ref
          </button>
          <button
            onClick={() => setDisplayCount(clickCountRef.current)}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Mostrar valor da ref
          </button>
        </div>
        <p><strong>Valor exibido:</strong> {displayCount}</p>
        <p><small>Clique várias vezes em "Incrementar ref" e depois em "Mostrar valor" para ver a diferença.</small></p>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 3: Guardando o valor anterior</h3>
        <p><strong>O que foi feito:</strong> Usamos uma ref para armazenar o valor anterior do input. Como refs persistem entre renderizações sem causar re-render, é o lugar ideal para guardar esse histórico.</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setPreviousValue(previousValueRef.current);
            previousValueRef.current = e.target.value;
            setInputValue(e.target.value);
          }}
          placeholder="Digite algo"
          style={{ padding: "0.5rem", width: "100%", maxWidth: "300px" }}
        />
        <p><strong>Valor atual:</strong> {inputValue || "(vazio)"}</p>
        <p><strong>Valor anterior:</strong> {previousValue ?? "(nenhum)"}</p>
      </section>

      <section style={{ padding: "1rem", background: "#f9f9f9", border: "1px solid #ddd" }}>
        <h3>useRef vs useState</h3>
        <ul>
          <li><strong>useRef:</strong> Guarda um valor mutável entre renderizações sem provocar re-render. Ótimo para DOM, timers e valores que não aparecem na UI.</li>
          <li><strong>useState:</strong> Guarda um valor que, ao mudar, provoca re-renderização. Use quando a UI precisa refletir a mudança.</li>
        </ul>
      </section>
    </div>
  );
}
