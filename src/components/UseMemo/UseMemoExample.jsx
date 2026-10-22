import { useMemo, useState } from "react";

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export function UseMemoExample() {
  const [numero, setNumero] = useState(10);
  const [contador, setContador] = useState(0);

  // Sem useMemo - recalcula toda vez que componente renderiza
  // const resultadoSemMemo = fibonacci(numero);

  // Com useMemo - só recalcula quando 'numero' mudar
  const resultadoComMemo = useMemo(() => {
    console.log("Calculando Fibonacci com useMemo...");
    return fibonacci(numero);
  }, [numero]);

  return (
    <div>
      <h2>useMemo</h2>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 1: Memoização de cálculo pesado</h3>
        <p><strong>O que foi feito:</strong> Usamos useMemo para memorizar o resultado do cálculo de Fibonacci. Quando apenas o contador é incrementado, o cálculo pesado não é refeito. Só recalcula quando o número muda.</p>
        
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <strong>Calcular Fibonacci de:</strong>{" "}
            <input
              type="number"
              value={numero}
              onChange={(e) => setNumero(Number(e.target.value))}
              min="0"
              max="40"
              style={{ padding: "0.5rem", marginLeft: "0.5rem" }}
            />
          </label>
        </div>
        
        <p><strong>Resultado:</strong> {resultadoComMemo}</p>
        
        <div style={{ marginTop: "1rem" }}>
          <button 
            onClick={() => setContador(contador + 1)}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Incrementar contador: {contador}
          </button>
          <p><small>Ao incrementar o contador, o componente re-renderiza, mas o cálculo Fibonacci não é refeito graças ao useMemo.</small></p>
        </div>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 2: Por que usar useMemo?</h3>
        <p><strong>O que foi feito:</strong> Demonstramos a diferença entre calcular em cada renderização vs memorizar com useMemo.</p>
        <ul>
          <li><strong>Sem useMemo:</strong> O cálculo seria executado em TODA renderização, mesmo quando mudamos estados não relacionados.</li>
          <li><strong>Com useMemo:</strong> O cálculo só executa quando as dependências ([numero]) mudarem, otimizando performance em cálculos pesados.</li>
        </ul>
        <p><strong>Abra o console</strong> para ver quando "Calculando Fibonacci com useMemo..." é logado.</p>
      </section>

      <section style={{ padding: "1rem", background: "#f9f9f9", border: "1px solid #ddd" }}>
        <h3>Quando usar useMemo</h3>
        <ul>
          <li><strong>Cálculos pesados:</strong> Processamentos complexos, loops grandes, etc.</li>
          <li><strong>Referências estáveis:</strong> Para evitar re-renderizações desnecessárias em componentes filhos que recebem objetos/arrays como props.</li>
          <li><strong>Otimização:</strong> Use apenas quando houver ganho real de performance. Não use para tudo.</li>
        </ul>
        <p><strong>Diferença do useCallback:</strong> useMemo memoriza o <em>resultado</em> da função. useCallback memoriza a <em>função</em> em si.</p>
      </section>
    </div>
  );
}
