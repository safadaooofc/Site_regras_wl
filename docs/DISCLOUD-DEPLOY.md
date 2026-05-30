# Deploy na Discloud (site + bot juntos)

## Precisa de Docker?

**Não.** Na Discloud com `TYPE=site` você sobe **um único app Node** (`server/index.js`). Esse processo já faz:

- Site React (arquivos em `dist/`)
- Login Discord (OAuth)
- API do painel admin
- **Comandos do bot** (`/add-admin`, `/setup-logs`, …) pela rota HTTP `/discord/interactions`
- **Logs** nos canais do servidor de suporte

Não há um “bot separado” rodando 24h em WebSocket. O Discord **chama seu site** quando alguém usa um comando slash. Por isso site + bot funcionam no mesmo `npm start`.

O arquivo `discloud.config` do projeto já está pronto para isso.

---

## URL do seu app

Com `ID=reueleberp` no `discloud.config`:

| Uso | URL |
|-----|-----|
| Site | https://reueleberp.discloud.app |
| OAuth callback | https://reueleberp.discloud.app/auth/callback |
| Interações Discord (slash) | https://reueleberp.discloud.app/discord/interactions |

---

## O que é `DISCORD_PUBLIC_KEY`?

É uma **chave pública** da sua aplicação no Discord, usada só para provar que os pedidos em `/discord/interactions` vêm mesmo do Discord (segurança).

**Não é:**

- Client ID (`1510108076445925437` — número curto)
- Client Secret
- Token do bot

**É:**

- Uma string **longa em hexadecimal** (~64 caracteres), por exemplo:  
  `a1b2c3d4e5f6....` (só exemplo)

### Onde copiar

1. Abra https://discord.com/developers/applications  
2. Selecione **a mesma aplicação** do site (Client ID do OAuth)  
3. Menu **General** (Informações gerais)  
4. Campo **PUBLIC KEY** → **Copy**  
5. Cole no painel da Discloud como `DISCORD_PUBLIC_KEY`

Sem essa chave, `/add-admin` e outros comandos **não funcionam** (Discord recebe erro de assinatura).

---

## Variáveis na Discloud (painel do app)

Configure **todas** no painel da Discloud (não envie `.env` no ZIP — está no `.discloudignore`).

### Produção (obrigatório)

```env
NODE_ENV=production
BASE_URL=https://reueleberp.discloud.app

DISCORD_CLIENT_ID=1510108076445925437
DISCORD_CLIENT_SECRET=...
SESSION_SECRET=...longo e aleatório...

DISCORD_BOT_TOKEN=...token da aba BOT (Reset Token)...
DISCORD_PUBLIC_KEY=...64 caracteres da aba General...

DISCORD_SUPPORT_GUILD_ID=1480648105522106484
```

### Build do front (Vite — necessárias no build)

```env
VITE_DISCORD_INVITE=https://discord.gg/nDz7grbuvB
VITE_DISCORD_SERVER_ID=1489492393819504692
VITE_EB_DISCORD_INVITE=https://discord.gg/3A4szCrrpw
VITE_EB_DISCORD_SERVER_ID=1426225171689111594
VITE_SUPPORT_DISCORD_INVITE=https://discord.gg/bX5Ke9Qq6w
```

### Opcional

```env
DISCORD_ADMIN_USER_IDS=id1,id2
DISCORD_AUTO_JOIN_ENABLED=1
```

---

## Discord Developer Portal (checklist)

### OAuth2 → Redirects

Adicione:

```
https://reueleberp.discloud.app/auth/callback
```

(Pode manter `http://localhost:5173/auth/callback` para testes locais.)

### General → Interactions Endpoint URL

```
https://reueleberp.discloud.app/discord/interactions
```

Salve. O Discord valida se a URL responde (o app precisa estar **online** na Discloud).

### Bot

1. Aba **Bot** → **Reset Token** → copie para `DISCORD_BOT_TOKEN` na Discloud  
2. Ative **SERVER MEMBERS INTENT** se precisar checar cargos (recomendado)  
3. Convide o bot para:
   - Servidor **suporte** (`1480648105522106484`)
   - Servidores **RP** e **EB** (auto-join e logs)

---

## Passo a passo Discloud

1. `npm run build` local (opcional, para testar)  
2. Faça upload do projeto (ZIP) **sem** `node_modules` e **sem** `.env`  
3. Coloque as variáveis no **painel** da Discloud  
4. Inicie o app — o `BUILD` roda `npm install && npm run build`  
5. No Discord do servidor de suporte: `/setup-logs`  
6. `/add-admin` para dar acesso ao painel  
7. Teste o site: https://reueleberp.discloud.app  

Os comandos slash são registrados automaticamente quando o servidor sobe (se `DISCORD_BOT_TOKEN` e `DISCORD_SUPPORT_GUILD_ID` estiverem certos).

---

## Token do bot — erro comum

O **Bot Token** vem só da aba **Bot → Reset Token**.

Não use:

- Client Secret (aba OAuth2)  
- O mesmo valor do Client ID  
- Token de usuário

Formato típico: algo como `MTxxxxx.xxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxx`

---

## Dados que persistem (`data/`)

| Arquivo | Conteúdo |
|---------|----------|
| `data/cms.json` | Regras, anúncios, equipe |
| `data/admins.json` | Quem usou `/add-admin` |
| `data/discord-channels.json` | IDs dos canais de log |

Na Discloud, após **redeploy**, essa pasta pode ser apagada. Faça backup ou rode `/setup-logs` e `/add-admin` de novo se necessário.

---

## Docker (só se for outro servidor)

Este projeto **não precisa** de Docker na Discloud. Se no futuro hospedar em VPS com Docker, um `Dockerfile` simples seria:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV=production PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
```

Na Discloud, use apenas `discloud.config` + painel de variáveis.
