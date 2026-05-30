# Checklist antes de subir na Discloud

## Código do projeto

| Item | Status |
|------|--------|
| `discloud.config` (TYPE=site, BUILD, START) | OK |
| `npm run build` gera `dist/` | OK |
| `npm start` → Express + site + `/discord/interactions` | OK |
| `.discloudignore` exclui `node_modules`, `.env` | OK |
| Conteúdo `.txt` na raiz ou em `src/content/` | OK (build roda sync) |
| Painel admin + CMS + logs Discord | OK |

## O que NÃO está no código (você faz manualmente)

### 1. Painel Discloud — variáveis

Use `discloud.env.example` como lista. **Obrigatório em produção:**

- [ ] `NODE_ENV=production`
- [ ] `BASE_URL=https://reueleberp.discloud.app` (igual ao `ID=` do `discloud.config`)
- [ ] `DISCORD_CLIENT_ID` + `DISCORD_CLIENT_SECRET`
- [ ] `SESSION_SECRET` (string longa aleatória)
- [ ] `DISCORD_BOT_TOKEN` (aba **Bot → Reset Token**, não Client Secret)
- [ ] `DISCORD_PUBLIC_KEY` (aba **General**, ~64 caracteres hex)
- [ ] `DISCORD_SUPPORT_GUILD_ID=1480648105522106484`
- [ ] Todas as `VITE_*` (precisam existir **antes** do build na Discloud)

### 2. Discord Developer Portal

- [ ] OAuth2 Redirect: `https://reueleberp.discloud.app/auth/callback`
- [ ] Interactions URL: `https://reueleberp.discloud.app/discord/interactions`
- [ ] Bot convidado no servidor **suporte** (1480648105522106484)
- [ ] Bot convidado nos servidores **RP** e **EB** (auto-join)

### 3. Depois que o app estiver online

- [ ] No Discord suporte: `/setup-logs`
- [ ] `/add-admin` para quem vai usar o painel
- [ ] Testar login no site e `/admin`

## Avisos

- **`data/`** (cms, admins, canais de log) pode sumir em redeploy — faça backup ou rode `/setup-logs` e `/add-admin` de novo.
- **`regrasrp.txt`** na raiz não entra no sync automático; o build usa `src/content/regrasrp.txt`. Se editar só a raiz, copie ou adicione ao `sync-content.mjs`.
- Não suba `.env` no ZIP (já está no `.discloudignore`).
- Se o token do bot estiver errado, comandos e logs não funcionam — gere novo em **Bot → Reset Token**.
