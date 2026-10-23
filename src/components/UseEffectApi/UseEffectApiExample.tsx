import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
}

export function UseEffectApiExample() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<User | null>(null);

  // Exemplo 1: Buscar lista de usuários ao montar componente
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Erro ao buscar usuários");
        const data = (await response.json()) as User[];
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar usuários");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // Exemplo 2: Buscar usuário específico quando userId mudar
  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) throw new Error("Erro ao buscar usuário");
        const data = (await response.json()) as User;
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar usuário");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  return (
    <div>
      <h2>useEffect com API</h2>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 1: Buscar dados ao montar o componente</h3>
        <p><strong>O que foi feito:</strong> Usamos useEffect com array de dependências vazio [] para fazer uma requisição GET à API assim que o componente é montado. O estado loading controla o carregamento, error trata falhas.</p>
        
        <h4>Lista de Usuários</h4>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>Erro: {error}</p>}
        {!loading && !error && (
          <ul style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #eee", padding: "1rem" }}>
            {users.map((u) => (
              <li key={u.id}>
                {u.name} - {u.email}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 2: Buscar dados com dependência</h3>
        <p><strong>O que foi feito:</strong> Usamos useEffect com [userId] como dependência. Toda vez que userId muda, uma nova requisição é feita para buscar os dados daquele usuário específico.</p>
        
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <strong>Selecione um usuário (ID):</strong>{" "}
            <select
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
              style={{ padding: "0.5rem", marginLeft: "0.5rem" }}
            >
              {[1, 2, 3, 4, 5].map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </label>
        </div>

        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>Erro: {error}</p>}
        {user && !loading && !error && (
          <div style={{ padding: "1rem", background: "#f0f8ff", border: "1px solid #87ceeb" }}>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Telefone:</strong> {user.phone}</p>
            <p><strong>Empresa:</strong> {user.company.name}</p>
            <p><strong>Website:</strong> {user.website}</p>
          </div>
        )}
      </section>

      <section style={{ padding: "1rem", background: "#f9f9f9", border: "1px solid #ddd" }}>
        <h3>Boas práticas com useEffect e API</h3>
        <ul>
          <li><strong>Cleanup:</strong> Em casos com subscriptions ou requests canceláveis, usar função de limpeza.</li>
          <li><strong>Loading states:</strong> Sempre mostrar estado de carregamento para melhor UX.</li>
          <li><strong>Tratamento de erros:</strong> Capturar e exibir erros adequadamente.</li>
          <li><strong>Dependências corretas:</strong> Incluir todas as variáveis usadas dentro do effect no array de dependências.</li>
          <li><strong>Funções async:</strong> Definir função async dentro do effect, não passar async diretamente.</li>
        </ul>
      </section>
    </div>
  );
}
