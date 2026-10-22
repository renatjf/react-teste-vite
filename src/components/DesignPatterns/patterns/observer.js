export function criarEventEmitter() {
  const ouvintes = new Map();

  return {
    inscrever(evento, fn) {
      if (!ouvintes.has(evento)) {
        ouvintes.set(evento, new Set());
      }
      ouvintes.get(evento).add(fn);
      return () => ouvintes.get(evento).delete(fn);
    },
    publicar(evento, dados) {
      ouvintes.get(evento)?.forEach((fn) => fn(dados));
    },
  };
}

export const barramento = criarEventEmitter();
