# Entrada automática nos Discords ao logar

> **Status:** funcionalidade **ativa em produção** ([reueleberp.discloud.app](https://reueleberp.discloud.app)). Projeto em fase de **manutenção**. Ver [PROJETO-STATUS.md](PROJETO-STATUS.md).

Quando `DISCORD_BOT_TOKEN` está configurado, após o login OAuth o servidor chama a API do Discord para **adicionar o usuário** aos servidores da rede Reuel (RP + EB).

## Configuração (uma vez)

### 1. Bot na mesma aplicação OAuth

1. [Discord Developer Portal](https://discord.com/developers/applications) → sua aplicação do site.
2. **Bot** → **Reset Token** → copie para `DISCORD_BOT_TOKEN` no `.env` e no painel Discloud.
3. **Não** exponha o token no front-end.

### 2. Convidar o bot para os dois servidores

O bot precisa estar **nos dois** servidores (Capital MT BR e Exército Brasileiro), com permissão **Criar convite** (requisito da API `Add Guild Member`).

URL de convite (substitua `CLIENT_ID`):

```
https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=1&scope=bot
```

`permissions=1` = Create Instant Invite. Ajuste se precisar de mais permissões para o bot no dia a dia.

### 3. Variáveis no `.env`

```env
DISCORD_BOT_TOKEN=...
# Usa VITE_DISCORD_SERVER_ID e VITE_EB_DISCORD_SERVER_ID por padrão
# Ou lista explícita:
# DISCORD_AUTO_JOIN_GUILD_IDS=1489492393819504692,1426225171689111594
```

### 4. OAuth

O login pede o scope **`guilds.join`** quando o bot está configurado. O usuário autoriza “adicionar você aos servidores” na tela do Discord.

Redirect URI continua igual (`BASE_URL/auth/callback`).

## Comportamento

| Situação | Resultado |
|----------|-----------|
| Usuário novo no servidor | Entra (HTTP 201) |
| Já estava no servidor | Ignorado (HTTP 204) |
| Bot sem permissão / banido | Falha logada; login no site **ainda funciona** |
| Sem `DISCORD_BOT_TOKEN` | Só login `identify`, sem auto-join |

## Produção (Discloud)

Defina no painel: `DISCORD_BOT_TOKEN`, `DISCORD_CLIENT_*`, `SESSION_SECRET`, `BASE_URL=https://seu-dominio.discloud.app`.

## Arquivos

- `server/discord-auto-join.mjs` — lógica de join
- `server/index.js` — scope OAuth e callback
