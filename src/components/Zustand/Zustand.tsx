import { useContadorStore } from "./store";

export function Zustand() {
  const { contador, incrementar, decrementar, resetar } = useContadorStore();

  return (
    <div>
      <h1>Zustand</h1>
      <p>Gerenciamento de estado com Zustand</p>
      <p>Contador: <span data-testid="contador">{contador}</span></p>
      <button data-testid="incrementar" onClick={incrementar}>
        Incrementar
      </button>
      <button data-testid="decrementar" onClick={decrementar}>
        Decrementar
      </button>
      <button data-testid="resetar" onClick={resetar}>
        Resetar
      </button>
    </div>
  );
}
