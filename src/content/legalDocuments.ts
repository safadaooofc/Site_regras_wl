import type { LegalDocument, LegalDocumentSlug } from "../types/legal";
import {
  COMPANY_NAME,
  DEVELOPER_NAME,
  SECURITY_REPORT_CONTACT_NAME,
  SECURITY_REPORT_CONTACT_URL,
  SUPPORT_DISCORD_INVITE_DEFAULT,
} from "../config/community";

/** Data da última revisão dos textos legais (exibida em todas as páginas). */
export const LEGAL_LAST_UPDATED = "24 de maio de 2026 — versão 1.1";

const SITE_URL = "https://reueleberp.discloud.app";

export const legalDocuments: LegalDocument[] = [
  {
    slug: "termos",
    title: "Termos de uso",
    shortDescription:
      "Regras gerais de uso do site, Discord e experiências Roblox vinculadas à rede Reuel.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      {
        id: "aceitacao",
        title: "1. Aceitação",
        paragraphs: [
          `Ao acessar ${SITE_URL}, fazer login com Discord, entrar nos servidores da rede ${COMPANY_NAME} ou utilizar mapas e experiências associadas, você declara ter lido e concordado com estes Termos de Uso, a Política de Privacidade, a Política de Cookies, os Termos de Segurança, os Termos de Compras (quando aplicável), a política de Streaming e gravação e as Comunicações oficiais.`,
          "Responsáveis legais de menores: consulte também a página Para responsáveis em /legal/responsaveis.",
          "Se você não concordar, não utilize o site nem os serviços vinculados.",
        ],
      },
      {
        id: "servicos",
        title: "2. O que oferecemos",
        paragraphs: [
          `${COMPANY_NAME} é uma organização comunitária de entretenimento em plataformas de terceiros (Roblox, Discord). O site institucional informa regras, equipe, convites e conteúdo editorial; não substitui os Termos de Serviço da Roblox Corporation nem os Termos de Serviço do Discord Inc.`,
          "Conteúdo de regras, anúncios e equipe pode ser alterado pela administração a qualquer momento, com publicação no site ou nos canais oficiais.",
        ],
      },
      {
        id: "elegibilidade",
        title: "3. Elegibilidade e conta",
        paragraphs: [
          "Você deve cumprir a idade mínima exigida pela Roblox e pelo Discord em sua região. Menores devem ter autorização e supervisão de responsável legal quando a lei assim exigir.",
          "O login no site usa OAuth do Discord. Você é responsável pela segurança da sua conta Discord e por toda atividade realizada após autenticação.",
          "É proibido criar identidades falsas, compartilhar conta para burlar punições ou se passar por membro da equipe.",
        ],
      },
      {
        id: "conduta",
        title: "4. Conduta permitida",
        paragraphs: [
          "Respeite os regulamentos das filiais (RP e EB), a equipe de moderação e os demais jogadores.",
          "Use o site apenas para fins informativos e de integração com a comunidade (leitura de regras, login, painel administrativo quando autorizado).",
          "Não publique, por meio do site ou integrações, conteúdo ilegal, discriminatório, sexual envolvendo menores, ameaçador ou que viole direitos de terceiros.",
        ],
      },
      {
        id: "propriedade",
        title: "5. Propriedade intelectual",
        paragraphs: [
          `Marcas, textos institucionais, layout do site e materiais produzidos para ${COMPANY_NAME} pertencem aos respectivos titulares. Roblox®, Discord® e logotipos associados são de seus proprietários.`,
          "É vedada a cópia, redistribuição comercial ou modificação do site sem autorização prévia por escrito, salvo uso pessoal não comercial (por exemplo, capturas para divulgação da comunidade).",
        ],
      },
      {
        id: "moderacao",
        title: "6. Moderação e sanções",
        paragraphs: [
          "A equipe pode aplicar advertências, suspensões, remoção de cargos, banimento de servidores Discord ou do mapa Roblox, conforme regulamento interno e gravidade da infração.",
          "Decisões de moderação em jogo ou no Discord não geram direito a reembolso de itens virtuais adquiridos em plataformas de terceiros.",
          "Recursos contra punições devem seguir o canal oficial de tickets ou suporte indicado no Discord.",
        ],
      },
      {
        id: "limitacao",
        title: "7. Limitação de responsabilidade",
        paragraphs: [
          "O site e os serviços comunitários são oferecidos “como estão”, sem garantia de disponibilidade ininterrupta. Interrupções por manutenção, falhas da Discloud, Roblox ou Discord não geram indenização.",
          `${COMPANY_NAME} não se responsabiliza por perdas decorrentes de uso indevido da conta, links externos, ações de outros usuários ou decisões das plataformas terceiras.`,
        ],
      },
      {
        id: "alteracoes",
        title: "8. Alterações e lei aplicável",
        paragraphs: [
          "Estes termos podem ser atualizados; a data e a versão constam em cada página legal e no histórico em /legal/historico. O uso continuado após alterações implica aceitação.",
          "Aplica-se a legislação brasileira. Foro eleito: comarca do domicílio do responsável pela operação do site, salvo disposição legal imperativa em favor do consumidor.",
        ],
      },
    ],
  },
  {
    slug: "privacidade",
    title: "Política de privacidade",
    shortDescription:
      "Como tratamos dados pessoais no site, login Discord e logs administrativos (LGPD).",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      {
        id: "controlador",
        title: "1. Controlador e contato",
        paragraphs: [
          `O controlador dos dados tratados por este site é a administração da rede ${COMPANY_NAME}. Para exercer direitos previstos na Lei nº 13.709/2018 (LGPD), utilize o servidor de suporte oficial no Discord ou o canal indicado na seção Equipe do site.`,
        ],
      },
      {
        id: "dados",
        title: "2. Dados que coletamos",
        paragraphs: [
          "Login Discord (OAuth): identificador numérico do usuário, nome de exibição, avatar e, quando autorizado, permissão para adicioná-lo aos servidores da rede (escopo guilds.join).",
          "Sessão no site: cookie de sessão assinado no servidor para manter login e permissões de painel administrativo.",
          "Logs de segurança e administração (quando configurados): eventos como login, logout, alterações no painel e erros técnicos — sem incluir senha, pois a autenticação é delegada ao Discord.",
          "Dados técnicos: endereço IP, user-agent e horário das requisições, comuns a qualquer servidor web, para segurança e diagnóstico.",
        ],
      },
      {
        id: "finalidade",
        title: "3. Finalidades e bases legais",
        paragraphs: [
          "Autenticação e gestão de acesso ao painel /admin: execução de funcionalidade solicitada e legítimo interesse em proteger o sistema.",
          "Auto-join nos servidores Discord: consentimento manifestado na tela de autorização do Discord.",
          "Exibição de contagem de membros online: dados agregados do widget público do Discord, sem identificação individual no site.",
          "Logs administrativos: legítimo interesse em segurança, auditoria e prevenção a fraudes.",
        ],
      },
      {
        id: "compartilhamento",
        title: "4. Compartilhamento",
        paragraphs: [
          "Dados de login são processados pela Discord Inc. conforme a política deles. Hospedagem do site na Discloud e infraestrutura de nuvem podem processar logs de acesso.",
          "Não vendemos dados pessoais. Compartilhamento com autoridades ocorre apenas quando houver obrigação legal ou ordem judicial válida.",
        ],
      },
      {
        id: "retencao",
        title: "5. Retenção e armazenamento",
        paragraphs: [
          "Sessão: até logout ou expiração do cookie. Registros de administradores (/add-admin) e conteúdo do CMS permanecem no servidor enquanto necessários à operação.",
          "Logs em canais Discord seguem a política de retenção da plataforma Discord e da equipe.",
        ],
      },
      {
        id: "direitos",
        title: "6. Seus direitos (LGPD)",
        paragraphs: [
          "Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação de dados desnecessários, informação sobre compartilhamento e revogação de consentimento, nos limites da lei.",
          "Para revogar o vínculo com o site, use logout e remova a autorização do aplicativo em Configurações do Discord → Aplicativos autorizados.",
        ],
      },
      {
        id: "cookies",
        title: "7. Cookies",
        paragraphs: [
          "Utilizamos apenas cookies estritamente necessários ao funcionamento do site (sessão de login). Detalhes completos, tabela por finalidade e como gerenciar estão em /legal/cookies.",
          "Não utilizamos cookies de publicidade, remarketing ou rastreamento comportamental de terceiros neste site.",
          "Bloquear cookies no navegador impedirá o login e o painel administrativo.",
        ],
      },
      {
        id: "menores",
        title: "8. Crianças e adolescentes",
        paragraphs: [
          "Não coletamos intencionalmente dados além do necessário para usuários que cumprem as regras de idade das plataformas. Orientações para pais e responsáveis: /legal/responsaveis.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Política de cookies",
    shortDescription:
      "Quais cookies usamos (apenas essenciais de sessão), por quê e como desativar.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      {
        id: "o-que-sao",
        title: "1. O que são cookies",
        paragraphs: [
          "Cookies são pequenos arquivos de texto que o navegador armazena quando você visita um site. Servem, por exemplo, para manter você logado entre páginas.",
          `No site ${SITE_URL} da rede ${COMPANY_NAME} usamos cookies de forma mínima e transparente.`,
        ],
      },
      {
        id: "quais-usamos",
        title: "2. Cookies que utilizamos",
        paragraphs: [
          "| Nome / tipo | Categoria | Finalidade | Duração | Obrigatório? |",
          "| Sessão (cookie-session) | Essencial | Manter login Discord OAuth e permissões do painel /admin | Até logout ou expiração configurada no servidor | Sim — sem ele não há login |",
          "Não definimos cookies de analytics (Google Analytics, Meta Pixel, etc.), publicidade ou preferências de marketing.",
        ],
      },
      {
        id: "base-legal",
        title: "3. Base legal (LGPD)",
        paragraphs: [
          "Cookie essencial de sessão: execução de contrato / funcionalidade solicitada por você (acesso autenticado) e legítimo interesse em segurança da conta.",
          "Como não há cookies opcionais de marketing, não exibimos banner de “aceitar cookies” para fins publicitários — apenas informamos nesta política e na Política de Privacidade.",
        ],
      },
      {
        id: "terceiros",
        title: "4. Cookies de terceiros",
        paragraphs: [
          "Ao clicar em convites Discord ou links Roblox, você sai deste site e passa a estar sujeito às políticas de cookies dessas plataformas.",
          "O widget de contagem de membros Discord é carregado via nosso proxy; não armazenamos cookie adicional de rastreamento para isso no seu navegador.",
        ],
      },
      {
        id: "gerenciar",
        title: "5. Como gerenciar ou bloquear",
        paragraphs: [
          "Você pode apagar cookies nas configurações do navegador (Chrome, Firefox, Edge, Safari → Privacidade → Cookies).",
          "Modo anônimo/privado não mantém sessão após fechar a janela — será necessário logar de novo.",
          "Bloquear todos os cookies impede o uso do login no site; isso é esperado.",
          "Para revogar acesso do aplicativo OAuth, use Discord → Configurações → Aplicativos autorizados.",
        ],
      },
      {
        id: "atualizacoes",
        title: "6. Alterações",
        paragraphs: [
          "Mudanças nesta política serão publicadas nesta página e registradas em /legal/historico.",
          "Dúvidas sobre dados pessoais: Política de Privacidade e servidor de suporte oficial.",
        ],
      },
    ],
  },
  {
    slug: "seguranca",
    title: "Termos de segurança",
    shortDescription:
      "Uso aceitável, proteção contra invasões, fraudes e cooperação com investigações legítimas.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      {
        id: "objetivo",
        title: "1. Objetivo",
        paragraphs: [
          "Estes termos complementam os Termos de Uso e descrevem condutas proibidas relacionadas à segurança da informação, integridade do site, dos servidores Discord, das experiências Roblox e dos participantes da comunidade.",
        ],
      },
      {
        id: "proibicoes",
        title: "2. Atividades proibidas",
        paragraphs: [
          "Tentar invadir, derrubar ou sobrecarregar o site, APIs, painel administrativo ou endpoints do bot (incluindo força bruta, DDoS, exploração de vulnerabilidades ou bypass de autenticação).",
          "Engenharia reversa, scraping agressivo ou automação não autorizada que prejudique a disponibilidade do serviço.",
          "Uso de cheats, exploits, injeção de scripts, manipulação de pacotes ou ferramentas de terceiros que concedam vantagem injusta no Roblox ou que comprometam outros jogadores.",
          "Phishing, malware, links maliciosos, sequestro de contas (token grabbers, engenharia social) ou qualquer meio de obter credenciais alheias.",
          "Falsificação de identidade da equipe, do bot oficial ou de canais de suporte; criação de sites ou bots “espelho” sem autorização.",
          "Acesso ou tentativa de acesso a áreas restritas (/admin, APIs administrativas, arquivos data/ no servidor) sem permissão.",
        ],
      },
      {
        id: "conta",
        title: "3. Segurança da sua conta",
        paragraphs: [
          "Mantenha autenticação em dois fatores (2FA) ativa no Discord e na Roblox quando disponível.",
          "Não compartilhe tokens, cookies de sessão, capturas de tela com dados de login ou links de OAuth capturados por terceiros.",
          "Desconfie de “premiações” que exijam senha, código ou instalação de programas.",
        ],
      },
      {
        id: "incidentes",
        title: "4. Reporte de incidentes",
        paragraphs: [
          `Falhas técnicas de segurança no site (painel admin, login, APIs) devem ser reportadas na página dedicada ${SITE_URL}/legal/reporte — sem publicar o exploit em redes sociais, chats públicos ou fóruns.`,
          `Suspeitas de invasão de conta, fraude entre jogadores ou abuso na comunidade: servidor de suporte oficial (${SUPPORT_DISCORD_INVITE_DEFAULT}), com evidências (horário, nick, prints). Não envie senhas nem tokens em canais públicos.`,
        ],
      },
      {
        id: "resposta",
        title: "5. Medidas da equipe",
        paragraphs: [
          "Podemos bloquear IPs, encerrar sessões, revogar permissões de admin, banir contas e preservar registros técnicos para análise interna.",
          "Em caso de indícios de crime cibernético (art. 154-A do Código Penal e legislação correlata), a administração pode colaborar com investigações mediante determinação legal, preservando dados conforme permitido pela LGPD.",
        ],
      },
      {
        id: "sem-garantia",
        title: "6. Limitações",
        paragraphs: [
          "Adotamos boas práticas (HTTPS, secrets no servidor, verificação de assinatura nas interações Discord), mas nenhum sistema é 100% invulnerável.",
          "O usuário é responsável pelo dispositivo e rede que utiliza para acessar o site e as plataformas de terceiros.",
        ],
      },
    ],
  },
  {
    slug: "reporte",
    title: "Reporte de vulnerabilidades",
    shortDescription:
      "Como avisar falhas de segurança do site de forma privada (divulgação responsável). O código não é público no GitHub.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      {
        id: "introducao",
        title: "1. Por que esta página existe",
        paragraphs: [
          `O site ${SITE_URL} e seu back-end são mantidos para a comunidade ${COMPANY_NAME}. O repositório de código **não é divulgado publicamente** no GitHub, portanto não há “Report a vulnerability” aberto na plataforma.`,
          "Se você encontrar uma falha de segurança, use **apenas os canais privados** abaixo. Agradecemos a divulgação responsável.",
        ],
      },
      {
        id: "canais",
        title: "2. Como reportar (canais privados)",
        paragraphs: [
          `**Preferencial — desenvolvedor do site (${SECURITY_REPORT_CONTACT_NAME}):** envie mensagem pelo formulário ou contato em ${SECURITY_REPORT_CONTACT_URL}. Assunto sugerido: “Segurança — site Reuel”.`,
          `**Alternativa — equipe Reuel:** abra ticket ou mensagem privada a um moderador no servidor de suporte oficial (${SUPPORT_DISCORD_INVITE_DEFAULT}). Peça que encaminhem ao responsável técnico sem expor detalhes em canal público.`,
          "**Não faça:** postar exploit em chat geral, TikTok, Twitter/X, issues públicas, pastebins com dados de usuários ou tokens. Isso coloca a comunidade em risco e pode atrasar a correção.",
        ],
      },
      {
        id: "escopo",
        title: "3. O que está no escopo",
        paragraphs: [
          "Bypass de login ou do painel /admin sem permissão.",
          "Acesso ou alteração não autorizada de conteúdo (CMS, APIs /api/admin/*).",
          "Falsificação de requisições ao endpoint /discord/interactions do bot.",
          "XSS, injeção, SSRF ou vazamento de dados além do necessário no OAuth (identify, guilds.join).",
          "Exposição de segredos do servidor (tokens Discord, SESSION_SECRET, webhooks) em respostas HTTP ou arquivos públicos.",
          "Qualquer falha que permita derrubar o site, roubar sessão ou comprometer usuários em massa.",
        ],
      },
      {
        id: "fora-escopo",
        title: "4. Fora do escopo",
        paragraphs: [
          "Bugs da Discloud, Discord ou Roblox — reporte diretamente a essas plataformas.",
          "Conta de usuário hackeada por phishing (oriente a vítima a trocar senha e ativar 2FA).",
          "Discordada com punição de moderação ou balanceamento de jogo.",
        ],
      },
      {
        id: "conteudo",
        title: "5. O que enviar no reporte",
        paragraphs: [
          "Descrição clara do problema e do impacto (o que um atacante conseguiria fazer).",
          "Passos para reproduzir (URL, método HTTP, conta de teste se necessário).",
          "Data/hora aproximada e navegador, se relevante.",
          "Capturas ou vídeo **sem** expor dados pessoais de terceiros.",
          "Sugestão de correção (opcional).",
          "Não inclua senhas reais, tokens completos nem dumps de banco de dados.",
        ],
      },
      {
        id: "prazos",
        title: "6. O que esperar",
        paragraphs: [
          "Confirmação de recebimento: até 7 dias úteis.",
          "Avaliação inicial: até 14 dias úteis.",
          "Correção ou mitigação: o mais rápido possível para falhas críticas; demais conforme gravidade.",
          "Após a correção em produção, podemos publicar um resumo genérico (sem detalhes do exploit), se você concordar.",
        ],
      },
      {
        id: "boa-fe",
        title: "7. Pesquisa em boa fé",
        paragraphs: [
          "Testes razoáveis no site em produção ou em ambiente seu, sem exfiltrar dados de outros usuários, sem spam e sem interromper o serviço de forma desnecessária, serão tratados de boa fé.",
          "Não tentaremos processar você por violar estes termos **somente** por reportar uma vulnerabilidade seguindo esta política.",
        ],
      },
      {
        id: "divulgacao",
        title: "8. Divulgação responsável",
        paragraphs: [
          "Pedimos que aguarde a correção em produção antes de divulgar publicamente detalhes técnicos (prazo sugerido: até 90 dias, ou outro combinado por escrito).",
          "Se a falha já estiver sendo explorada ativamente contra a comunidade, avise imediatamente pelo canal privado para prioridade máxima.",
        ],
      },
      {
        id: "vazamento",
        title: "9. Se você viu um token ou segredo exposto",
        paragraphs: [
          "Não compartilhe o valor em mais lugares. Avise pelo canal privado (item 2).",
          "A equipe deve revogar tokens no Discord Developer Portal, gerar novo SESSION_SECRET e atualizar variáveis na Discloud.",
          `Usuários afetados podem precisar fazer login novamente. Detalhes operacionais ficam com ${DEVELOPER_NAME} e a administração ${COMPANY_NAME}.`,
        ],
      },
    ],
  },
  {
    slug: "compras",
    title: "Termos de compras e itens virtuais",
    shortDescription:
      "Aceite antes da compra, prazos de entrega (1 h a 3 dias), sem reembolso após entrega.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      {
        id: "escopo",
        title: "1. Escopo",
        paragraphs: [
          `Estes termos aplicam-se a transações relacionadas à comunidade ${COMPANY_NAME}: game passes, developer products, benefícios in-game, cargos Discord pagos, doações com contrapartida ou qualquer oferta divulgada oficialmente.`,
          "Somente links e instruções publicados em canais oficiais (site, Discord verificado da filial ou suporte) são válidos.",
        ],
      },
      {
        id: "aceite",
        title: "2. Aceite obrigatório antes da compra",
        paragraphs: [
          "Antes de concluir qualquer pagamento, você deve confirmar — por botão, checkbox ou mensagem explícita no canal de venda — que leu e concorda com estes Termos de Compras, com o prazo de entrega informado para aquele produto específico e com a Política de reembolso abaixo.",
          "Sem essa confirmação, a equipe pode recusar ou cancelar a entrega do benefício.",
          "A confirmação vale para aquela transação; em compras futuras, o aceite deve ser renovado se os termos ou o prazo do produto tiverem mudado.",
        ],
      },
      {
        id: "produtos-prazos",
        title: "3. Produtos e prazos de entrega",
        paragraphs: [
          "O prazo de entrega é sempre comunicado antes do pagamento, por produto. Faixa usual da rede Reuel:",
          "• Benefícios rápidos (cargo Discord, tag, acesso temporário): 1 hora a 24 horas.",
          "• Game passes, itens ou pacotes in-game (RP ou EB): 1 hora a 72 horas (3 dias).",
          "• Patentas, promoções ou pacotes complexos EB: até 72 horas (3 dias), salvo prazo diferente informado por escrito antes da compra.",
          "O prazo começa após confirmação do pagamento pela plataforma (Roblox, etc.) e recebimento do comprovante ou nick correto, o que ocorrer por último.",
          "Em manutenção do mapa ou force majeure, a equipe pode comunicar extensão do prazo; se você não concordar, pode solicitar reembolso conforme seção 5 (desde que a entrega ainda não tenha ocorrido).",
        ],
      },
      {
        id: "natureza",
        title: "4. Natureza dos itens",
        paragraphs: [
          "Itens virtuais não têm valor monetário fora das plataformas, não são transferíveis como dinheiro real e podem ser ajustados por balanceamento ou regulamento interno.",
          "Doações sem contrapartida definida não geram direito a benefício in-game.",
          "Banimento ou punição por violação de regras após entrega não gera reembolso.",
        ],
      },
      {
        id: "reembolso",
        title: "5. Política de reembolso",
        paragraphs: [
          "**Regra geral: não há reembolso após a entrega do benefício.** Considera-se entregue quando o item, pass, patente, cargo ou acesso prometido foi aplicado na conta informada ou confirmado por ticket.",
          "**Exceção única:** reembolso permitido somente se o benefício **não** for entregue dentro do prazo máximo informado antes da compra (entre 1 hora e 3 dias, conforme o produto).",
          "Para solicitar reembolso nessa exceção: abra ticket no suporte oficial dentro de 7 dias após o fim do prazo informado, com comprovante de pagamento, nick Roblox/Discord e data da compra.",
          "Após verificação, o reembolso seguirá o meio disponível (Roblox conforme política da plataforma, ou crédito acordado pela equipe). Não há reembolso por arrependimento, conta errada informada pelo comprador ou incompatibilidade com regras que o comprador deveria conhecer.",
          "Chargeback fraudulento após entrega concluída pode resultar em banimento permanente.",
        ],
      },
      {
        id: "pagamento",
        title: "6. Pagamento",
        paragraphs: [
          "Pagamentos são processados pelas plataformas (Roblox, Discord, etc.). O site Reuel não armazena dados de cartão.",
          "É obrigação do comprador informar nick Roblox e/ou Discord corretos e estar em conformidade com idade e regras da filial.",
        ],
      },
      {
        id: "menores",
        title: "7. Menores",
        paragraphs: [
          "Compras devem contar com autorização do responsável legal quando exigido pela lei ou pelas políticas da Roblox. Ver /legal/responsaveis.",
        ],
      },
      {
        id: "disputas",
        title: "8. Disputas",
        paragraphs: [
          "Questões sobre produto de filial: ticket da filial. Fraude ou site: servidor de suporte central.",
          "Direitos do consumidor previstos em lei aplicam-se quando reconhecidos legalmente, sem prejuízo das regras de entrega e reembolso acima.",
        ],
      },
    ],
  },
  {
    slug: "streaming",
    title: "Streaming e gravação",
    shortDescription:
      "Proibido transmitir ou gravar conteúdo da Reuel sem consentimento prévio da equipe.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      {
        id: "regra",
        title: "1. Regra principal",
        paragraphs: [
          `É **proibido** fazer live, stream, gravação, clip, screenshot comercial ou republicação de conteúdo das experiências Roblox, vozes de jogadores, cenas de RP ou eventos da rede ${COMPANY_NAME} **sem consentimento prévio e expresso** da administração.`,
          "A ausência de resposta ou silêncio da equipe **não** constitui consentimento.",
        ],
      },
      {
        id: "consentimento",
        title: "2. Como obter consentimento",
        paragraphs: [
          `Solicite por ticket ou mensagem oficial no servidor de suporte (${SUPPORT_DISCORD_INVITE_DEFAULT}) ou canal indicado pela filial, **antes** de iniciar transmissão ou gravação.`,
          "Informe: plataforma (Twitch, YouTube, TikTok, etc.), nick, data, duração, se haverá monetização e se outros jogadores aparecerão.",
          "O consentimento pode ser concedido, negado ou revogado a qualquer momento. Condições específicas (créditos, delay, áreas permitidas) devem constar por escrito no ticket.",
        ],
      },
      {
        id: "proibido",
        title: "3. O que é vedado sem autorização",
        paragraphs: [
          "Lives ou VODs de gameplay no mapa RP ou EB mostrando outros participantes sem consentimento deles quando exigível.",
          "Gravação de tickets de suporte, reuniões staff ou canais privados.",
          "Uso da marca Reuel, logos ou material promocional em thumbnails comerciais sem permissão.",
          "Deepfake, edição difamatória ou exposição de dados pessoais (doxxing) retirados de sessões de jogo.",
        ],
      },
      {
        id: "sancoes",
        title: "4. Consequências",
        paragraphs: [
          "Violação pode resultar em remoção de conteúdo (DMCA ou pedido à plataforma), advertência, banimento do mapa e dos Discords, e medidas legais quando cabível.",
          "Jogadores filmados sem consentimento quando a equipe exige autorização coletiva podem reportar pelo suporte.",
        ],
      },
      {
        id: "excecoes",
        title: "5. Exceções limitadas",
        paragraphs: [
          "Capturas pessoais não comerciais, sem rosto/voz de terceiros identificáveis e sem transmissão pública, podem ser toleradas para uso privado — salvo se o regulamento da filial em /regras/rp ou /regras/eb disser o contrário.",
          "Eventos oficiais “liberados para stream” serão anunciados nos canais oficiais com regras próprias.",
        ],
      },
    ],
  },
  {
    slug: "comunicacoes",
    title: "Comunicações oficiais",
    shortDescription:
      "Como a Reuel publica avisos, mudanças de regras e alterações destes termos.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      {
        id: "canais",
        title: "1. Canais oficiais",
        paragraphs: [
          `Comunicações vinculantes ou informativas da ${COMPANY_NAME} podem ser publicadas em:`,
          `• Site ${SITE_URL} (anúncios, páginas /legal, /regras)`,
          `• Servidor de suporte Discord (${SUPPORT_DISCORD_INVITE_DEFAULT}) e servidores oficiais das filiais RP e EB listados no site`,
          "• Menções @everyone ou cargos específicos apenas quando a equipe julgar necessário",
          "Mensagens de contas não verificadas, servidores copiados ou DMs não solicitados **não** são oficiais.",
        ],
      },
      {
        id: "alteracoes-termos",
        title: "2. Alteração de termos e regras",
        paragraphs: [
          "Mudanças nestes documentos legais entram em vigor na data publicada em /legal/historico e no topo de cada página.",
          "Alterações relevantes podem ser destacadas por anúncio no site (posição before-footer ou sticky) ou no Discord oficial.",
          "Continuar usando o site, Discord ou mapas após a vigência implica ciência; para compras, novo aceite explícito conforme Termos de Compras.",
        ],
      },
      {
        id: "anuncios",
        title: "3. Anúncios e eventos",
        paragraphs: [
          "Promoções, reinaugurações, manutenções e convites usam os mesmos canais oficiais. Prazos de entrega de produtos pagos serão sempre repetidos no anúncio de venda.",
        ],
      },
      {
        id: "contato",
        title: "4. Contato e notificações",
        paragraphs: [
          "Notificações sobre sua conta (punição, entrega de produto, dados LGPD) serão feitas preferencialmente por ticket Discord ou, quando aplicável, pelo e-mail vinculado à plataforma de pagamento — não enviamos spam comercial em massa.",
          "Dúvidas sobre comunicações: servidor de suporte ou seção Equipe no site.",
        ],
      },
    ],
  },
  {
    slug: "responsaveis",
    title: "Para responsáveis",
    shortDescription:
      "Orientações para pais e responsáveis: idade mínima (13+ Roblox, 16+ filial RP), compras e segurança.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      {
        id: "intro",
        title: "1. Objetivo",
        paragraphs: [
          `A rede ${COMPANY_NAME} é entretenimento em Roblox e Discord. Esta página resume o que pais, mães e responsáveis legais devem saber antes de autorizar a participação de crianças e adolescentes.`,
        ],
      },
      {
        id: "idade",
        title: "2. Idade mínima",
        paragraphs: [
          "**Roblox e Discord:** exigem cumprimento das idades mínimas das próprias plataformas (em geral, 13 anos ou mais para conta com recursos completos, conforme país e configurações parentais). Consulte as políticas oficiais da Roblox e do Discord.",
          "**Filial RP (Capital do MT BR):** o roleplay pode envolver temas maduros (conflito, economia, facções). A whitelist e o acesso ao mapa podem exigir **16 anos ou mais**, ou autorização documentada do responsável, conforme regras publicadas em /regras/rp e no Discord da filial.",
          "**Filial EB (Exército Brasileiro):** recrutamento e hierarquia seguem regulamento em /regras/eb; idade mínima prática costuma ser 13+ com comportamento compatível, salvo exigência maior em edital de recrutamento.",
          "Menores devem usar contas supervisionadas quando a lei ou o responsável exigir.",
        ],
      },
      {
        id: "supervisao",
        title: "3. Supervisão recomendada",
        paragraphs: [
          "Ative controles parentais na Roblox (limites de chat, gastos, amigos) e 2FA quando o adolescente for apto a usar autenticador.",
          "Converse sobre não compartilhar senha, não aceitar links suspeitos e não comprar Robux sem permissão.",
          "Streaming e gravação na comunidade exigem consentimento da equipe — veja /legal/streaming.",
        ],
      },
      {
        id: "compras-menores",
        title: "4. Compras e Robux",
        paragraphs: [
          "Qualquer compra de passes ou benefícios deve ser autorizada pelo responsável. Antes do pagamento, o comprador confirma aceite dos Termos de Compras e do prazo de entrega (1 h a 3 dias).",
          "Reembolso só se o item não for entregue no prazo informado; após entrega, não há reembolso por arrependimento.",
        ],
      },
      {
        id: "dados",
        title: "5. Dados pessoais (LGPD)",
        paragraphs: [
          "O site pode armazenar ID Discord e sessão de login para whitelist e painel. Responsáveis podem solicitar informações ou exclusão pelo servidor de suporte, com comprovação de tutela.",
          "Detalhes: /legal/privacidade e /legal/cookies.",
        ],
      },
      {
        id: "contato-responsavel",
        title: "6. Contato",
        paragraphs: [
          `Dúvidas ou solicitações em nome de menor: servidor de suporte (${SUPPORT_DISCORD_INVITE_DEFAULT}), ticket privado, identificando-se como responsável legal.`,
        ],
      },
    ],
  },
  {
    slug: "historico",
    title: "Histórico de versões",
    shortDescription:
      "Registro de alterações nos documentos legais do site (transparência e auditoria).",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      {
        id: "como-ler",
        title: "1. Como interpretar",
        paragraphs: [
          "Cada versão agrupa mudanças publicadas em /legal. A data indica quando passou a valer no site.",
          "Em caso de conflito entre versões antigas salvas offline e o texto atual, prevalece o publicado aqui e nas páginas linked.",
          "Versão atual do pacote legal: 1.1.",
        ],
      },
    ],
  },
];

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((d) => d.slug === slug);
}

export function isLegalDocumentSlug(slug: string): slug is LegalDocumentSlug {
  return legalDocuments.some((d) => d.slug === slug);
}
