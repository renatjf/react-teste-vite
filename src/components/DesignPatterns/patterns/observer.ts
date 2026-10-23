type MapaEventos = Record<string, unknown>;

export function criarEventEmitter<T extends MapaEventos = MapaEventos>() {
  const ouvintes = new Map<keyof T, Set<(dados: unknown) => void>>();

  return {
    inscrever<K extends keyof T>(evento: K, fn: (dados: T[K]) => void) {
      let conjunto = ouvintes.get(evento);
      if (!conjunto) {
        conjunto = new Set();
        ouvintes.set(evento, conjunto);
      }
      const ouvinte = fn as (dados: unknown) => void;
      conjunto.add(ouvinte);
      return () => {
        conjunto.delete(ouvinte);
      };
    },
    publicar<K extends keyof T>(evento: K, dados: T[K]) {
      ouvintes.get(evento)?.forEach((fn) => fn(dados));
    },
  };
}

export const barramento = criarEventEmitter<{ mensagem: string }>();
