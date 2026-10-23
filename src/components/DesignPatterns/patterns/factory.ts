export type TipoNotificacao = "sucesso" | "erro" | "info";

export interface Notificacao {
  id: number;
  tipo: TipoNotificacao;
  cor: string;
  rotulo: string;
  texto: string;
}

const configuracoes: Record<TipoNotificacao, { cor: string; rotulo: string }> = {
  sucesso: { cor: "#16a34a", rotulo: "SUCESSO" },
  erro: { cor: "#dc2626", rotulo: "ERRO" },
  info: { cor: "#2563eb", rotulo: "INFO" },
};

let proximoId = 1;

export const FabricaNotificacao = {
  criar(tipo: TipoNotificacao, texto: string): Notificacao {
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
