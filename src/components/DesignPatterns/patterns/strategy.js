export const estrategiasOrdenacao = {
  nome: (a, b) => a.nome.localeCompare(b.nome),
  nota: (a, b) => b.nota - a.nota,
  preco: (a, b) => a.preco - b.preco,
};
