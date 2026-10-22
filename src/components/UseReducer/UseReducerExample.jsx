import { useReducer, useState } from "react";

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "incrementBy":
      return { count: state.count + action.payload };
    case "reset":
      return { count: 0 };
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}

function todosReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case "remove":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}

export function UseReducerExample() {
  const [counter, dispatch] = useReducer(counterReducer, { count: 0 });
  const [todos, todosDispatch] = useReducer(todosReducer, []);
  const [text, setText] = useState("");

  return (
    <div>
      <h2>useReducer</h2>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 1: Contador com reducer</h3>
        <p><strong>O que foi feito:</strong> Criamos um reducer que recebe o estado atual e uma ação, e retorna o novo estado. O componente usa dispatch para enviar ações em vez de chamar setters individuais.</p>
        <p><strong>Valor:</strong> {counter.count}</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button onClick={() => dispatch({ type: "increment" })} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
            +1
          </button>
          <button onClick={() => dispatch({ type: "decrement" })} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
            -1
          </button>
          <button onClick={() => dispatch({ type: "incrementBy", payload: 5 })} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
            +5
          </button>
          <button onClick={() => dispatch({ type: "reset" })} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
            Resetar
          </button>
        </div>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 2: Lista de tarefas com reducer</h3>
        <p><strong>O que foi feito:</strong> O reducer gerencia a lista de tarefas com as ações add, toggle e remove. Toda a lógica de atualização fica centralizada e previsível em uma única função pura.</p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nova tarefa"
            style={{ padding: "0.5rem", flex: 1 }}
          />
          <button
            onClick={() => {
              if (!text.trim()) return;
              todosDispatch({ type: "add", payload: text });
              setText("");
            }}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Adicionar
          </button>
        </div>
        {todos.length === 0 && <p><small>Nenhuma tarefa ainda.</small></p>}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem",
                borderBottom: "1px solid #eee",
              }}
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => todosDispatch({ type: "toggle", payload: todo.id })}
              />
              <span style={{ flex: 1, textDecoration: todo.done ? "line-through" : "none" }}>
                {todo.text}
              </span>
              <button
                onClick={() => todosDispatch({ type: "remove", payload: todo.id })}
                style={{ cursor: "pointer" }}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ padding: "1rem", background: "#f9f9f9", border: "1px solid #ddd" }}>
        <h3>Quando usar useReducer</h3>
        <ul>
          <li><strong>Estado complexo:</strong> Múltiplos valores relacionados que mudam juntos.</li>
          <li><strong>Muitas ações:</strong> Várias formas de atualizar o estado.</li>
          <li><strong>Lógica testável:</strong> O reducer é uma função pura, fácil de testar isoladamente.</li>
        </ul>
        <p><strong>useState vs useReducer:</strong> useState é mais simples para estados independentes e simples. useReducer é melhor para lógica de transição complexa e estados centralizados.</p>
      </section>
    </div>
  );
}
