import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function UserLayoutEffectExample() {
  const boxRef = useRef(null);
  const flashRef = useRef(null);
  const [width, setWidth] = useState(0);

  // Exemplo 1: Medição síncrona com useLayoutEffect
  useLayoutEffect(() => {
    if (boxRef.current) {
      setWidth(boxRef.current.getBoundingClientRect().width);
    }
  }, []);

  // Exemplo 2: Efeito que pode causar "flash" - comparação entre useEffect e useLayoutEffect
  useLayoutEffect(() => {
    if (flashRef.current) {
      flashRef.current.style.backgroundColor = "red";
    }
  }, []);

  useEffect(() => {
    // Este useEffect roda após a pintura, causando um "flash" visível
    // Em contraste com useLayoutEffect acima
  }, []);

  return (
    <div>
      <h2>useLayoutEffect</h2>
      
      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 1: Medição de elementos</h3>
        <p><strong>O que foi feito:</strong> Usamos useLayoutEffect para medir a largura de um elemento após o layout ser calculado, mas antes da pintura no navegador. Isso garante que o valor seja correto sem "piscar".</p>
        <div
          ref={boxRef}
          style={{
            padding: "20px",
            background: "#e3f2fd",
            border: "2px solid #2196f3",
            width: "fit-content",
          }}
        >
          Caixa de exemplo
        </div>
        <p><strong>Largura medida:</strong> {width}px</p>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}>
        <h3>Exemplo 2: Prevenção de "flash" visual</h3>
        <p><strong>O que foi feito:</strong> useLayoutEffect executa síncronamente após as mutações DOM e antes da pintura. Se usássemos useEffect, veríamos um "flash" da cor original antes da mudança. Aqui a cor vermelha é aplicada antes da pintura.</p>
        <div
          ref={flashRef}
          style={{
            padding: "20px",
            background: "#fff",
            border: "2px solid #f44336",
            width: "fit-content",
          }}
        >
          Esta caixa fica vermelha antes da pintura
        </div>
      </section>

      <section style={{ padding: "1rem", background: "#f9f9f9", border: "1px solid #ddd" }}>
        <h3>Diferença entre useEffect e useLayoutEffect</h3>
        <ul>
          <li><strong>useEffect:</strong> Executa assíncronamente após a pintura do navegador. Ideal para efeitos não-bloqueantes (API calls, subscriptions).</li>
          <li><strong>useLayoutEffect:</strong> Executa síncronamente após mutações DOM, mas antes da pintura. Ideal para medir elementos, corrigir layout, prevenir flashes visuais.</li>
        </ul>
        <p><strong>Quando usar:</strong> Prefira useEffect na maioria dos casos. Use useLayoutEffect apenas quando precisar sincronizar com o layout DOM antes da pintura.</p>
      </section>
    </div>
  );
}
