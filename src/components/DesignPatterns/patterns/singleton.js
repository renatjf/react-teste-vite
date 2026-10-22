let instancia = null;

function criarInstancia() {
  let contagem = 0;
  const inscritos = new Set();

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

export function getInstanciaUnica() {
  if (!instancia) {
    instancia = criarInstancia();
  }
  return instancia;
}
