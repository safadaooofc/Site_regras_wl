# Política de segurança — Site Reuel

Site institucional da **Reuel** ([produção](https://reueleberp.discloud.app)): React + Express, OAuth Discord, painel admin e integrações via bot (HTTP interactions).

Este documento é para **quem tem acesso ao repositório** (deploy, manutenção). O repositório **não é público no GitHub**.

**Reporte público de falhas (pesquisadores / comunidade):** use apenas a página do site — **[Reporte de vulnerabilidades](https://reueleberp.discloud.app/legal/reporte)** (contato privado via portfólio do desenvolvedor ou Discord Suporte). Não abra issues públicas.

Conduta geral de uso: [Termos de segurança](https://reueleberp.discloud.app/legal/seguranca).

Descreve o que consideramos sensível, como tratar reportes e o que fazer se um segredo vazar.

---

## Versões com suporte

| Ambiente | Suporte a correções de segurança |
|----------|----------------------------------|
| **Produção** (`main` / deploy ativo na Discloud) | Sim — correções prioritárias |
| Versões antigas / forks sem deploy | Não |

O projeto está em **manutenção** (sem novas features planejadas). Falhas de segurança na branch principal e no app publicado serão tratadas com prioridade.

---

## O que reportar

Exemplos **dentro do escopo** deste repositório:

- Bypass de autenticação ou do painel `/admin`
- Escrita ou leitura não autorizada em `data/cms.json`, `data/admins.json` ou APIs `/api/admin/*`
- Falsificação de interações Discord (`/discord/interactions`) sem assinatura válida
- Exposição de `DISCORD_CLIENT_SECRET`, `DISCORD_BOT_TOKEN`, `SESSION_SECRET` ou sessões de usuário
- XSS, injeção ou SSRF nas rotas do Express
- Vazamento de dados de usuário via OAuth além do necessário (`identify`, `guilds.join`)

**Fora do escopo** (reportar aos respectivos provedores):

- Vulnerabilidades na plataforma [Discloud](https://discloud.com)
- Bugs ou abusos no [Discord](https://discord.com) ou [Roblox](https://www.roblox.com)
- Contas comprometidas de terceiros (usuário, servidor Discord, etc.)

---

## Como reportar uma vulnerabilidade

**Não** publique exploit, payloads ou tokens em redes sociais, Discord público ou issues.

| Canal | Uso |
|-------|-----|
| **Site (público)** | [reueleberp.discloud.app/legal/reporte](https://reueleberp.discloud.app/legal/reporte) — política e botões de contato |
| **Desenvolvedor** | [kioverdll.discloud.app](https://kioverdll.discloud.app) — mensagem privada (preferencial para falhas técnicas) |
| **Comunidade** | [Servidor de suporte](https://discord.gg/bX5Ke9Qq6w) — ticket/DM a moderação; peça encaminhamento técnico **sem** detalhes em canal geral |

O GitHub **não** é canal oficial de reporte (repositório não anunciado publicamente). Quem mantém o código com acesso privado ao repo pode registrar internamente após receber o reporte pelo site.

Inclua, quando possível:

- Descrição do problema e impacto
- Passos para reproduzir (ambiente: produção ou local)
- Versão/commit ou data do deploy
- Sugestão de mitigação (opcional)

### O que esperar

| Etapa | Prazo orientativo |
|-------|-------------------|
| Confirmação de recebimento | Até 7 dias úteis |
| Avaliação inicial | Até 14 dias úteis |
| Correção ou plano de mitigação | Conforme gravidade (crítico: o mais rápido possível) |

Vulnerabilidades válidas serão corrigidas no código e, quando aplicável, documentadas de forma resumida após o deploy (sem expor o exploit).

Relatórios em boa fé não serão alvo de ação legal por testes limitados ao seu próprio ambiente ou ao site com autorização implícita desta política.

---

## Segredos e dados sensíveis

### Nunca commitar no Git

| Item | Motivo |
|------|--------|
| `.env`, `.env.local`, `.env.production` | Contêm secrets de runtime |
| `DISCORD_CLIENT_SECRET` | OAuth |
| `DISCORD_BOT_TOKEN` | Bot + auto-join + logs |
| `SESSION_SECRET` | Assinatura de cookies de sessão |
| `DISCORD_LOG_WEBHOOK_URL` | Pode postar em canais |
| `data/cms.json`, `data/admins.json`, `data/discord-channels.json` | Conteúdo editável / IDs de canais |

Arquivos de exemplo (`.env.example`, `discloud.env.example`) devem usar **apenas placeholders**, nunca valores reais.

### Onde configurar em produção

- Painel da **Discloud** (variáveis de ambiente) — ver `discloud.env.example`
- **Discord Developer Portal:** redirect `https://reueleberp.discloud.app/auth/callback` e interactions `https://reueleberp.discloud.app/discord/interactions`

### Prefixo `VITE_`

Variáveis `VITE_*` são embutidas no bundle do front-end no build. **Não** coloque secrets com prefixo `VITE_`.

### Se um segredo vazou

1. **Revogue imediatamente** no [Discord Developer Portal](https://discord.com/developers/applications): *Reset* em **Client Secret** e **Bot Token**.
2. Gere novo `SESSION_SECRET` (usuários precisarão logar de novo).
3. Atualize o painel Discloud e qualquer `.env` local.
4. Se o webhook de log vazou, apague e recrie o webhook no Discord.
5. Revise o histórico do Git; se o token já foi publicado, considere o segredo **comprometido** mesmo após remoção do arquivo.

---

## Superfície de ataque (referência)

| Rota / área | Proteção esperada |
|-------------|-------------------|
| `/admin`, `/api/admin/*` | Sessão + papel admin (Discord ou `data/admins.json`) |
| `/discord/interactions` | Verificação de assinatura Ed25519 (`DISCORD_PUBLIC_KEY`) |
| `/api/content` | Somente leitura pública |
| `/auth/*` | OAuth2 state + cookies `httpOnly` / `secure` em produção |
| `data/` no servidor | Fora do `dist/`; não servido como estático |

Mantenha o bot apenas nos servidores necessários (suporte, RP, EB) com permissões mínimas.

---

## Boas práticas para quem faz deploy

- Não inclua `.env` no ZIP enviado à Discloud (`.discloudignore` já ajuda).
- Faça backup cifrado ou offline de `data/*.json` antes de redeploy.
- Limite `DISCORD_ADMIN_USER_IDS` a contas realmente necessárias.
- Use `npm audit` periodicamente e atualize dependências com CVE conhecidos.

Mais contexto operacional: [README.md](README.md), [docs/PROJETO-STATUS.md](docs/PROJETO-STATUS.md).

---

## Divulgação responsável

Pedimos que não divulgue publicamente detalhes da falha até haver correção em produção ou prazo combinado com o mantenedor (em geral até 90 dias, salvo acordo diferente).

Agradecimentos podem ser mencionados no changelog ou neste arquivo, se o reporter concordar.
