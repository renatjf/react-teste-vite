import { ApolloExample } from "./ApolloExample";

export function IndexApolloClient() {
  return (
    <div>
      <h1>Exemplos de Apollo Client</h1>
      <p>
        Esta página demonstra o uso do Apollo Client para consumir uma API
        GraphQL com consultas, variáveis, paginação e cache.
      </p>
      <ApolloExample />
    </div>
  );
}
