# Status do projeto — Reuel (site institucional)

## Situação atual

| Item | Detalhe |
|------|---------|
| **URL em produção** | [https://reueleberp.discloud.app](https://reueleberp.discloud.app) |
| **Hospedagem** | [Discloud](https://discloud.com) — app `reueleberp` (`TYPE=site`) |
| **Fase do projeto** | **Praticamente encerrado** — entrega principal concluída e publicada |
| **Próximos passos** | Apenas manutenção: texto de regras, equipe, anúncios e admins via painel ou Discord |

O site está **no ar** e operacional. Não há roadmap ativo de novas funcionalidades; mudanças esperadas são de conteúdo (CMS) ou correções pontuais.

---

## O que foi entregue

### Site público

- Home institucional da **Reuel** com filiais **Capital do MT BR (RP)** e **Exército Brasileiro (EB)**
- Páginas de regras: `/regras/rp` e `/regras/eb` (texto parseado de `.txt` + edição pelo CMS)
- Seções: sobre, filiais, Discord, equipe, galeria, CTAs
- Contadores de membros online (widget Discord via proxy no Express/Vite)
- Link Roblox da filial EB (fixo em código); RP aguardando reinauguração do mapa
- **Anúncios** na home com posição, cor/tema e ordem configuráveis
- **Servidor Suporte** central (convite e guild ID em `community.ts` / `.env`)
- **Rodapé** com créditos ao desenvolvedor **Kiover** (portfólio + GitHub)
- **Páginas legais** (`/legal` v1.1): termos, privacidade, cookies, segurança, reporte, compras (reembolso só se não entregar no prazo), streaming (sem consentimento = proibido), comunicações, responsáveis (13+/16+ RP), histórico de versões

### Back-end e deploy

- **Express** servindo SPA (`dist/`), API, OAuth e interactions do bot no mesmo processo
- Deploy na **Discloud** sem Docker (`discloud.config` com `npm install`, `npm run build`, `npm start`)
- Dev local: `npm run dev` (Vite `5173` + API `8080` com proxy)
- Proxy anti-CORS para widget Discord (`/api/discord/guilds/...`)

### Autenticação e Discord

- Login **Discord OAuth2** com sessão (`cookie-session`)
- **Auto-join** nos servidores RP e EB após login (`guilds.join` + bot)
- **Slash commands** no servidor de suporte: `/add-admin`, `/remove-admin`, `/list-admins`, `/setup-logs`
- **Logs** em canais dedicados (auth, admin, CMS, erros, geral) — HTTP interactions, bot pode aparecer “offline” (esperado)
- Permissão de `/add-admin` alinhada a admins Discord + lista `DISCORD_ADMIN_USER_IDS`
- Scripts: `npm run discord:diagnose`, `npm run discord:register`
- Opcional: `DISCORD_LOG_WEBHOOK_URL` como backup de logs

### Painel administrativo (`/admin`)

- CMS em `data/cms.json`: anúncios, regras RP/EB, equipe
- Permissões por categoria (`super`, `support`, `rp`, `eb`)
- Importar conteúdo a partir de `src/content/*.txt`
- Botão para testar envio de log no Discord

### Documentação no repositório

| Arquivo | Conteúdo |
|---------|----------|
| [README.md](../README.md) | Visão geral, stack, scripts, variáveis |
| [DISCLOUD-DEPLOY.md](DISCLOUD-DEPLOY.md) | Deploy passo a passo |
| [CHECKLIST-DISCLOUD.md](CHECKLIST-DISCLOUD.md) | Checklist antes/depois do deploy |
| [ADMIN-PANEL.md](ADMIN-PANEL.md) | Uso do painel `/admin` |
| [DISCORD-AUTO-JOIN.md](DISCORD-AUTO-JOIN.md) | OAuth + entrada nos servidores |
| [DISCORD-SUPORTE-LOGS.md](DISCORD-SUPORTE-LOGS.md) | Suporte central, logs, comandos |
| `discloud.env.example` | Variáveis para o painel Discloud |

---

## Checklist pós-entrega (já feito em produção)

- [x] Site publicado em `https://reueleberp.discloud.app`
- [x] Build React + servidor Node na Discloud
- [x] OAuth e redirect de produção configurados
- [x] Interactions endpoint para slash commands
- [x] Painel admin e API de conteúdo
- [x] Integração Discord (login, auto-join, logs, admins)

Itens que a **equipe Reuel** mantém no dia a dia (fora do código):

- Conteúdo no painel ou backup de `data/cms.json`
- `/setup-logs` e `/add-admin` após redeploy se `data/` for perdido
- Atualização de convites/IDs no painel Discloud se mudar servidor Discord

---

## Créditos

| Papel | |
|-------|---|
| **Cliente / marca** | Reuel — filiais RP e EB |
| **Desenvolvimento do site** | [Kiover](https://kioverdll.discloud.app) · [GitHub](https://github.com/safadaooofc) |

---

## Referência rápida — produção

```
Site:              https://reueleberp.discloud.app
OAuth callback:    https://reueleberp.discloud.app/auth/callback
Interactions:      https://reueleberp.discloud.app/discord/interactions
Health (bot token): https://reueleberp.discloud.app/api/health/discord
Painel admin:      https://reueleberp.discloud.app/admin
```

Servidor suporte (guild): `1480648105522106484` · convite padrão: `https://discord.gg/bX5Ke9Qq6w`
