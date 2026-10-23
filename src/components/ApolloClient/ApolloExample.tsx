import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const CHARACTERS_QUERY = gql`
  query Characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface CharactersInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

interface CharactersData {
  characters: {
    info: CharactersInfo | null;
    results: Character[] | null;
  } | null;
}

interface CharactersVariables {
  page: number;
  filter: { name: string } | null;
}

const cardStyle: CSSProperties = {
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "1rem",
  marginBottom: "1rem",
};

const codeStyle: CSSProperties = {
  background: "#0f172a",
  color: "#e2e8f0",
  padding: "1rem",
  borderRadius: "8px",
  overflowX: "auto",
  fontSize: "0.85rem",
  lineHeight: 1.5,
  margin: "0.75rem 0",
};

function CharacterCard({ character }: { character: Character }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <img
        src={character.image}
        alt={character.name}
        style={{ width: "100%", display: "block" }}
      />
      <div style={{ padding: "0.6rem" }}>
        <strong>{character.name}</strong>
        <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "#555" }}>
          {character.status} — {character.species}
        </p>
      </div>
    </div>
  );
}

function CharactersList() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const { data, loading, error, refetch } = useQuery<
    CharactersData,
    CharactersVariables
  >(CHARACTERS_QUERY, {
    variables: {
      page,
      filter: search ? { name: search } : null,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function clearSearch() {
    setSearchInput("");
    setSearch("");
    setPage(1);
  }

  const characters = data?.characters?.results ?? [];
  const info = data?.characters?.info;

  return (
    <div>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}
      >
        <input
          type="text"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Buscar personagem por nome"
          style={{ padding: "0.55rem 0.75rem", flex: "1 1 220px", maxWidth: "320px" }}
        />
        <button
          type="submit"
          style={{ padding: "0.55rem 1rem", cursor: "pointer" }}
        >
          Buscar
        </button>
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            style={{ padding: "0.55rem 1rem", cursor: "pointer" }}
          >
            Limpar busca
          </button>
        )}
      </form>

      {error && (
        <div
          style={{
            background: "#fdecea",
            borderLeft: "4px solid #d93025",
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            marginBottom: "1rem",
          }}
        >
          <p style={{ margin: 0 }}>
            Não foi possível carregar os personagens. Verifique sua conexão.
          </p>
          <p style={{ margin: "0.25rem 0 0.5rem", fontSize: "0.85rem" }}>
            {error.message}
          </p>
          <button
            onClick={() => refetch()}
            style={{ padding: "0.4rem 0.8rem", cursor: "pointer" }}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {loading && characters.length === 0 && !error && (
        <p>Carregando personagens...</p>
      )}

      {loading && characters.length > 0 && (
        <p style={{ fontSize: "0.85rem", color: "#555" }}>
          Atualizando dados...
        </p>
      )}

      {!loading && !error && characters.length === 0 && (
        <p>Nenhum personagem encontrado para &quot;{search}&quot;.</p>
      )}

      {info && (
        <p style={{ fontSize: "0.9rem", color: "#555" }}>
          {info.count} personagens encontrados — página {page} de {info.pages}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {info && (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setPage((current) => current - 1)}
            disabled={!info.prev || loading}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            ← Página anterior
          </button>
          <button
            onClick={() => setPage((current) => current + 1)}
            disabled={!info.next || loading}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Próxima página →
          </button>
        </div>
      )}
    </div>
  );
}

export function ApolloExample() {
  return (
    <ApolloProvider client={client}>
      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Exemplo prático: consultando uma API GraphQL</h2>
        <p>
          Esta lista consulta a API GraphQL pública de Rick and Morty usando{" "}
          <code>useQuery</code>. A busca envia uma variável <code>filter</code>{" "}
          e a paginação altera a variável <code>page</code>.
        </p>
        <CharactersList />
      </section>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>O que foi feito</h2>
        <ul>
          <li>
            <strong>ApolloClient</strong>: configurado com a URL do GraphQL e um{" "}
            <code>InMemoryCache</code>.
          </li>
          <li>
            <strong>ApolloProvider</strong>: disponibiliza o client para toda a
            árvore de componentes.
          </li>
          <li>
            <strong>gql</strong>: transforma a string GraphQL em um documento
            interpretável pelo Apollo.
          </li>
          <li>
            <strong>useQuery</strong>: executa a consulta, controla{" "}
            <code>loading</code>, <code>error</code> e <code>data</code>, além de
            aceitar variáveis.
          </li>
          <li>
            <strong>cache-and-network</strong>: mostra o cache imediatamente e
            atualiza em segundo plano com a resposta da rede.
          </li>
          <li>
            <strong>refetch</strong>: refaz a consulta manualmente no botão de
            tentar novamente.
          </li>
        </ul>
        <pre style={codeStyle}>
          <code>{`const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

<ApolloProvider client={client}>
  <CharactersList />
</ApolloProvider>`}</code>
        </pre>
      </section>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>A query GraphQL</h2>
        <p>
          A query declara as variáveis <code>$page</code> e{" "}
          <code>$filter</code>, e seleciona apenas os campos usados na interface.
        </p>
        <pre style={codeStyle}>
          <code>{`const CHARACTERS_QUERY = gql\`
  query Characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info { count pages next prev }
      results { id name status species image }
    }
  }
\`;

const { data, loading, error, refetch } = useQuery(CHARACTERS_QUERY, {
  variables: {
    page,
    filter: search ? { name: search } : null,
  },
  fetchPolicy: "cache-and-network",
});`}</code>
        </pre>
      </section>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Apollo Client vs fetch</h2>
        <ul>
          <li>
            <strong>Cache normalizado</strong>: o Apollo guarda entidades por{" "}
            <code>id</code> e reaproveita dados entre consultas.
          </li>
          <li>
            <strong>Estado da consulta</strong>: loading, error e data já vêm
            prontos do hook.
          </li>
          <li>
            <strong>GraphQL</strong>: você pede exatamente os campos necessários,
            evitando over-fetching.
          </li>
          <li>
            <strong>Quando usar</strong>: aplicações com várias consultas e
            mutações GraphQL. Para uma chamada REST simples, <code>fetch</code>{" "}
            pode ser suficiente.
          </li>
        </ul>
      </section>
    </ApolloProvider>
  );
}
