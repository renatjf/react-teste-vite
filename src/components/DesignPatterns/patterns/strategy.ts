export interface Produto {
  nome: string;
  nota: number;
  preco: number;
}

export type ChaveOrdenacao = "nome" | "nota" | "preco";

export const estrategiasOrdenacao: Record<
  ChaveOrdenacao,
  (a: Produto, b: Produto) => number
> = {
  nome: (a, b) => a.nome.localeCompare(b.nome),
  nota: (a, b) => b.nota - a.nota,
  preco: (a, b) => a.preco - b.preco,
};
