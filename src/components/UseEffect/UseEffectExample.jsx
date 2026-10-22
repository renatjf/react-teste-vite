import { useEffect, useState } from "react";

export function UseEffectExample() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Exemplo 1: useEffect sem dependências - executa em toda renderização
  useEffect(() => {
    console.log("Executou: useEffect sem dependências (toda renderização)");
  });

  // Exemplo 2: useEffect com array vazio - executa apenas na montagem
  useEffect(() => {
    console.log("Executou: useEffect com [] (apenas montagem)");
  }, []);

  // Exemplo 3: useEffect com dependências - executa quando count muda
  useEffect(() => {
    console.log(`Executou: useEffect com [count] - count = ${count}`);
    document.title = `Contador: ${count}`;
  }, [count]);

  // Exemplo 4: useEffect com cleanup - event listener
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    console.log("Adicionado event listener de resize");

    // Cleanup: remove event listener quando componente desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("Removido event listener de resize");
    };
  }, []);

  // Exemplo 5: useEffect com intervalo e cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    console.log("Iniciado intervalo");

    return () => {
      clearInterval(interval);
      console.log("Intervalo limpo");
    };
  }, []);

  return (
    <div>
      <h2>useEffect - Diferentes casos de uso</h2>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 1: Dependências do useEffect</h3>
        <p><strong>O que foi feito:</strong> Demonstramos os 3 tipos principais: sem dependências (toda renderização), array vazio [] (apenas montagem), e com dependências [count] (quando count muda).</p>
        
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button 
            onClick={() => setCount(count + 1)}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            count: {count}
          </button>
          <button 
            onClick={() => setCount2(count2 + 1)}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            count2: {count2} (não afeta useEffect com [count])
          </button>
        </div>
        <p><small>Abra o console para ver quando cada useEffect é executado.</small></p>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 2: Event Listener com Cleanup</h3>
        <p><strong>O que foi feito:</strong> Adicionamos um event listener para resize da janela com useEffect. A função de cleanup remove o listener quando o componente é desmontado, evitando vazamentos de memória.</p>
        <p><strong>Largura da janela:</strong> {windowWidth}px</p>
        <p><small>Redimensione a janela para ver o valor atualizar.</small></p>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 3: Timer/Interval com Cleanup</h3>
        <p><strong>O que foi feito:</strong> Criamos um intervalo que atualiza o relógio a cada segundo. Na função de cleanup (retorno do useEffect), limpamos o intervalo com clearInterval para evitar execução contínua após desmontagem.</p>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold", fontFamily: "monospace" }}>
          {time}
        </p>
      </section>

      <section style={{ padding: "1rem", background: "#f9f9f9", border: "1px solid #ddd" }}>
        <h3>Resumo do useEffect</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e0e0e0" }}>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "left" }}>Sintaxe</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "left" }}>Quando executa</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "left" }}>Uso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}><code>{"useEffect(() => {})"}</code></td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Toda renderização</td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Raro, geralmente evitar</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}><code>{"useEffect(() => {}, [])"}</code></td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Apenas montagem</td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Buscar dados, configurar listeners</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}><code>{"useEffect(() => {}, [dep])"}</code></td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Montagem + quando dep mudar</td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Sincronização com props/states</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}><code>{"useEffect(() => { return () => {} }, [])"}</code></td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Cleanup na desmontagem</td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Remover listeners, limpar timers</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
