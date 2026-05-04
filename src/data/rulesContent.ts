export type RulesBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "sub"; title: string };

export type RuleSection = {
  id: string;
  title: string;
  blocks: RulesBlock[];
};

/**
 * Regulamento interno — texto original para a comunidade.
 * Ajuste trechos conforme deliberação da staff no Discord.
 */
export const RULE_SECTIONS: RuleSection[] = [
  {
    id: "introducao",
    title: "Introdução e validade",
    blocks: [
      {
        type: "p",
        text: "Este documento define as normas de convívio e interpretação no ecossistema Capital do MT BR. O objetivo é garantir partidas justas, imersivas e respeitosas para todos.",
      },
      {
        type: "p",
        text: "Ao entrar no Discord ou no servidor de jogo, você declara ter lido e concordado com as regras. Dúvidas devem ser esclarecidas com a staff antes de ações arriscadas em jogo.",
      },
      {
        type: "list",
        items: [
          "A staff pode atualizar as regras; mudanças relevantes serão comunicadas nos canais oficiais.",
          "Desconhecimento da regra não isenta punição quando a conduta for objetivamente nociva ao RP.",
          "Em caso de conflito entre normas, prevalece a orientação publicada pela administração no Discord.",
        ],
      },
    ],
  },
  {
    id: "glossario",
    title: "Glossário rápido (IC / OOC)",
    blocks: [
      {
        type: "p",
        text: "Termos usados no dia a dia do roleplay. Servem para alinhar expectativas entre jogadores e suporte.",
      },
      {
        type: "sub",
        title: "Conceitos básicos",
      },
      {
        type: "list",
        items: [
          "IC (In Character): tudo que acontece no mundo do jogo como fato da história.",
          "OOC (Out Of Character): conversa fora do personagem — Discord, suporte, chat global quando aplicável.",
          "Metagaming (MG): usar informação obtida OOC para obter vantagem IC (ex.: stream, print, call externo).",
          "Powergaming (PG): forçar resultado sem dar chance de reação plausível ao outro jogador.",
          "Fear RP: demonstrar medo e autoconservação diante de ameaça real (ex.: arma apontada).",
          "VDM: uso inadequado de veículo para ferir/matar sem construção de cena.",
          "RDM: eliminar ou agredir sem motivo IC válido ou sem interação prévia coerente.",
        ],
      },
    ],
  },
  {
    id: "conduta",
    title: "Conduta OOC e respeito",
    blocks: [
      {
        type: "p",
        text: "O Discord e os canais de voz/texto são extensão da comunidade. Trate todos com respeito, inclusive em discussões sobre regras.",
      },
      {
        type: "list",
        items: [
          "Proibido assédio, discriminação, incitação à violência e divulgação de dados pessoais.",
          "Evite flood, spam, ruído intencional em canais e conteúdo NSFW fora dos espaços permitidos.",
          "Brigas OOC não devem contaminar o jogo; use tickets de suporte para mediação.",
          "Publicidade de outros servidores ou vendas não autorizadas passam por aprovação da staff.",
        ],
      },
    ],
  },
  {
    id: "roleplay",
    title: "Qualidade de interpretação",
    blocks: [
      {
        type: "p",
        text: "Busque coerência com o cenário regional e com o arco do seu personagem. O bom RP constrói cena — não só resultado.",
      },
      {
        type: "list",
        items: [
          "Mantenha voz e postura condizentes com o contexto da cena; evite quebrar imersão com piadas OOC em momento sério.",
          "Meta/powergaming: não force narrativas que ignorem ações dos outros; ofereça tempo de reação em confrontos.",
          "Valorize a vida do personagem: ameaças letais exigem tensão e consequência.",
          "Evite personagens ‘imortais emocionalmente’ — reaja a perdas, riscos e pressão social.",
          "Use /me ou equivalentes quando o servidor disponibilizar para ações não explícitas na animação.",
        ],
      },
      {
        type: "sub",
        title: "Comunicação entre facções e polícia",
      },
      {
        type: "p",
        text: "Negociações e operações organizadas devem respeitar hierarquia e risco. Trapaças fazem parte do crime, mas não confundam construção de história com griefing de jogadores.",
      },
    ],
  },
  {
    id: "combate",
    title: "Confrontos, armas e veículos",
    blocks: [
      {
        type: "p",
        text: "Conflitos precisam de motivação IC e desenvolvimento mínimo. Ação repentina deve ser plausível no contexto (emboscada planejada, etc.).",
      },
      {
        type: "list",
        items: [
          "É proibido atropelar propositalmente para resolver confronto sem RP prévio adequado (VDM).",
          "Tiroteios exigem motivo e chance de fuga negociação quando aplicável à narrativa.",
          "Abuso de bugs, macros ou qualquer vantagem externa à mecânica oficial resulta em punição.",
          "Após derrota ou prisão, respeite o desenrolar da cena com a equipe que conduz o RP.",
        ],
      },
      {
        type: "sub",
        title: "New Life Rule (quando adotada pela cidade)",
      },
      {
        type: "p",
        text: "Se o servidor aplicar NLR, não retorne ao mesmo conflito nem use informação da morte anterior até o tempo definido pela staff. Confirme no canal de regras do Discord se há variações locais.",
      },
    ],
  },
  {
    id: "economia",
    title: "Economia, propriedades e itens",
    blocks: [
      {
        type: "p",
        text: "Transações devem respeitar o equilíbrio da economia do servidor. Exploit de trabalhos, dupes ou troca suspeita será revertido.",
      },
      {
        type: "list",
        items: [
          "Não realize ‘farm’ automatizado ou comportamento robótico para ganhos.",
          "Respeite limites de propriedades e veículos conforme anúncios da administração.",
          "Itens obtidos por erro devem ser reportados — uso consciente de bug é passível de banimento.",
        ],
      },
    ],
  },
  {
    id: "suporte",
    title: "Tickets, denúncias e punições",
    blocks: [
      {
        type: "p",
        text: "Utilize os canais de suporte do Discord com prints/vídeos claros e linha do tempo do ocorrido. Agressividade contra moderadores atrasa a solução.",
      },
      {
        type: "list",
        items: [
          "Escala típica: advertência, tempo de suspensão, banimento temporário ou permanente — conforme gravidade e reincidência.",
          "Gravações podem ser solicitadas para apurar casos de combate ou denúncia de MG.",
          "Decisões da staff são válidas durante a temporada; recursos seguem o fluxo informado nos canais fixados.",
        ],
      },
    ],
  },
];
