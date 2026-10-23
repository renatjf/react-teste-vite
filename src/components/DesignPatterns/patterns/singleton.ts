type Ouvinte = (contagem: number) => void;

interface Instancia {
  incrementar: () => void;
  getContagem: () => number;
  inscrever: (fn: Ouvinte) => () => void;
}

let instancia: Instancia | null = null;

function criarInstancia(): Instancia {
  let contagem = 0;
  const inscritos = new Set<Ouvinte>();

  return {
    incrementar() {
      contagem += 1;
      inscritos.forEach((fn) => fn(contagem));
    },
    getContagem() {
      return contagem;
    },
    inscrever(fn) {
      inscritos.add(fn);
      return () => inscritos.delete(fn);
    },
  };
}

export function getInstanciaUnica(): Instancia {
  if (!instancia) {
    instancia = criarInstancia();
  }
  return instancia;
}
