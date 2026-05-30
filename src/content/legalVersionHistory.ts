/** Entrada no histórico de revisões dos documentos legais. */
export type LegalVersionEntry = {
  version: string;
  date: string;
  summary: string;
  changes: string[];
};

export const legalVersionHistory: LegalVersionEntry[] = [
  {
    version: "1.0",
    date: "24 de maio de 2026",
    summary: "Publicação inicial da área Legal no site em produção.",
    changes: [
      "Termos de uso, Política de privacidade, Termos de segurança",
      "Termos de compras e itens virtuais",
      "Reporte de vulnerabilidades (canal privado, sem GitHub público)",
    ],
  },
  {
    version: "1.1",
    date: "24 de maio de 2026",
    summary:
      "Streaming, cookies, comunicações, reembolsos detalhados e página para responsáveis.",
    changes: [
      "Streaming e gravação: proibido sem consentimento prévio da equipe Reuel",
      "Política de cookies ampliada (página dedicada)",
      "Comunicações oficiais e alteração de termos",
      "Reembolso somente se o benefício não for entregue no prazo informado antes da compra (1 h a 3 dias); sem reembolso após entrega",
      "Confirmação de aceite dos termos antes de cada compra",
      "Página Para responsáveis (idade 13+/16+ na filial RP)",
      "Histórico de versões dos termos",
    ],
  },
];
