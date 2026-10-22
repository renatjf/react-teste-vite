const configuracoes = {
  sucesso: { cor: "#16a34a", rotulo: "SUCESSO" },
  erro: { cor: "#dc2626", rotulo: "ERRO" },
  info: { cor: "#2563eb", rotulo: "INFO" },
};

let proximoId = 1;

export const FabricaNotificacao = {
  criar(tipo, texto) {
    const config = configuracoes[tipo] ?? configuracoes.info;
    return {
      id: proximoId++,
      tipo,
      cor: config.cor,
      rotulo: config.rotulo,
      texto,
    };
  },
};
