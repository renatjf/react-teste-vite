import { useMemo, useState } from "react";
import { ThemeContext, UserContext, useTheme, useUser } from "./ThemeContext";
import type { Theme } from "./ThemeContext";

function ThemeDisplay() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "4px",
        background: theme === "light" ? "#ffffff" : "#222",
        color: theme === "light" ? "#222" : "#fff",
        border: "1px solid #888",
      }}
    >
      <p><strong>Componente ThemeDisplay</strong></p>
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme} style={{ padding: "0.4rem 0.8rem", cursor: "pointer" }}>
        Alternar tema
      </button>
    </div>
  );
}

function UserDisplay() {
  const { user, setName } = useUser();

  return (
    <div style={{ padding: "1rem", border: "1px solid #888", borderRadius: "4px" }}>
      <p><strong>Componente UserDisplay</strong></p>
      <p>Usuário: {user.nome}</p>
      <input
        type="text"
        value={user.nome}
        onChange={(e) => setName(e.target.value)}
        placeholder="Novo nome"
        style={{ padding: "0.4rem", width: "100%", maxWidth: "220px" }}
      />
    </div>
  );
}

export function UseContextExample() {
  const [theme, setTheme] = useState<Theme>("light");
  const [name, setName] = useState("Renato");

  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((current) => (current === "light" ? "dark" : "light")),
    }),
    [theme]
  );

  const userValue = useMemo(
    () => ({ user: { nome: name }, setName }),
    [name]
  );

  return (
    <div>
      <h2>useContext</h2>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 1: Compartilhando tema entre componentes</h3>
        <p><strong>O que foi feito:</strong> Criamos um ThemeContext com createContext e envolvemos os componentes com o Provider. ThemeDisplay e UserDisplay consomem os valores via useContext sem precisar receber props intermediárias.</p>
        <p><strong>Important:</strong> qualquer componente abaixo do Provider pode acessar o contexto, mesmo que esteja em vários níveis de profundidade.</p>

        <ThemeContext.Provider value={themeValue}>
          <UserContext.Provider value={userValue}>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <ThemeDisplay />
              <UserDisplay />
            </div>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 2: Contexto com múltiplos valores</h3>
        <p><strong>O que foi feito:</strong> O UserContext expõe tanto o usuário quanto a função setName. Assim, os componentes podem ler e atualizar o estado compartilhado.</p>
        <p><strong>Valor atual no pai:</strong> {name}</p>
        <p><strong>Por que useMemo:</strong> O objeto do contexto é recriado apenas quando suas dependências mudam, evitando re-renderizações desnecessárias dos consumidores.</p>
      </section>

      <section style={{ padding: "1rem", background: "#f9f9f9", border: "1px solid #ddd" }}>
        <h3>Quando usar useContext</h3>
        <ul>
          <li><strong>Dados globais:</strong> Tema, idioma, usuário autenticado.</li>
          <li><strong>Evitar prop drilling:</strong> Quando muitos componentes intermediários só repassam props.</li>
          <li><strong>Não substitui tudo:</strong> Para estado complexo e frequente, considere Zustand, Redux ou useReducer.</li>
        </ul>
        <p><strong>Componente Consumer:</strong> Também é possível usar {"<ThemeContext.Consumer>"} com render prop, mas o hook useContext é mais simples em componentes funcionais.</p>
      </section>
    </div>
  );
}
