import { useState } from "react";

export function UseStateExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [user, setUser] = useState({ nome: "Renato", idade: 30 });
  const [lazyValue] = useState(() => {
    console.log("Valor inicial calculado apenas uma vez (lazy initializer)");
    return Math.random().toFixed(4);
  });

  return (
    <div>
      <h2>useState</h2>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 1: Contador simples</h3>
        <p><strong>O que foi feito:</strong> Usamos useState para criar o estado count. Cada clique chama o setter e o componente re-renderiza com o novo valor.</p>
        <p><strong>Valor:</strong> {count}</p>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setCount(count + 1)} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
            +1
          </button>
          <button onClick={() => setCount(count - 1)} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
            -1
          </button>
          <button onClick={() => setCount(0)} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
            Resetar
          </button>
        </div>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 2: Input controlado</h3>
        <p><strong>O que foi feito:</strong> O valor do input vem do estado name e é atualizado via onChange. Isso é um componente controlado: o React é a fonte da verdade.</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          style={{ padding: "0.5rem", width: "100%", maxWidth: "300px" }}
        />
        <p><strong>Valor digitado:</strong> {name || "(vazio)"}</p>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 3: Atualizando objeto de estado</h3>
        <p><strong>O que foi feito:</strong> Ao atualizar um objeto, sempre criamos um novo objeto com spread (...user). Nunca mutamos o estado diretamente, pois o React compara referências para decidir se re-renderiza.</p>
        <p><strong>Usuário:</strong> {user.nome}, {user.idade} anos</p>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setUser({ ...user, idade: user.idade + 1 })}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Fazer aniversário
          </button>
          <button
            onClick={() => setUser({ ...user, nome: user.nome === "Renato" ? "Maria" : "Renato" })}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Alternar nome
          </button>
        </div>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 4: Updater function</h3>
        <p><strong>O que foi feito:</strong> Passando uma função para o setter, o valor anterior é recebido como argumento. Isso evita problemas de estado desatualizado quando há múltiplas atualizações no mesmo evento.</p>
        <p><strong>Valor:</strong> {count}</p>
        <button
          onClick={() => {
            setCount((prev) => prev + 1);
            setCount((prev) => prev + 1);
          }}
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          +2 (duas chamadas com updater)
        </button>
        <p><small>Se usássemos setCount(count + 1) duas vezes, o resultado seria +1.</small></p>
      </section>

      <section style={{ padding: "1rem", background: "#f9f9f9", border: "1px solid #ddd" }}>
        <h3>Exemplo 5: Lazy initializer</h3>
        <p><strong>O que foi feito:</strong> Passamos uma função para o useState. Ela só executa na primeira renderização, ideal para cálculos custosos.</p>
        <p><strong>Valor gerado uma única vez:</strong> {lazyValue}</p>
      </section>
    </div>
  );
}
