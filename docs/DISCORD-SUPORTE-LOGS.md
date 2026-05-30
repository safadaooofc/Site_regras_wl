# Servidor de suporte, logs e `/add-admin`

## Servidor central

- **Nome no site:** Servidor Suporte  
- **Convite:** https://discord.gg/bX5Ke9Qq6w  
- **Variáveis:** `VITE_SUPPORT_DISCORD_INVITE`, `DISCORD_SUPPORT_GUILD_ID`

Central da rede Reuel: suporte ao site, filial RP, filial EB e **logs automáticos** do site.

## Configuração (uma vez)

### 1. Bot no servidor de suporte

1. Convide o bot para o servidor de suporte (mesma app OAuth).  
2. Permissões: **Gerenciar canais**, **Enviar mensagens**, **Embed links**, **Gerenciar servidor** (para slash commands de admin).  
3. No `.env` / Discloud:

```env
DISCORD_BOT_TOKEN=...
DISCORD_CLIENT_ID=...
DISCORD_PUBLIC_KEY=...          # Developer Portal → General → Public Key
DISCORD_SUPPORT_GUILD_ID=...    # ID do servidor (Modo desenvolvedor)
VITE_SUPPORT_DISCORD_INVITE=https://discord.gg/bX5Ke9Qq6w
```

### 2. Interações (slash commands)

No [Discord Developer Portal](https://discord.com/developers/applications) → sua app → **General**:

- **Interactions Endpoint URL:**  
  - Produção: `https://SEU-DOMINIO.discloud.app/discord/interactions`  
  - Local: use túnel (ngrok) apontando para `http://localhost:8080/discord/interactions`

Registre os comandos:

```bash
npm run discord:register
```

(O servidor também tenta registrar ao subir.)

### 3. Canais de log (sem duplicar)

No Discord do suporte, como **Administrador**:

```
/setup-logs
```

O bot cria a categoria **📋 Logs · Site Reuel** e os canais (se não existirem) e salva os IDs em `data/discord-channels.json`.  
Nova execução **reutiliza** os mesmos canais — não cria cópias.

| Canal | Conteúdo |
|--------|-----------|
| 🔐-auth | Login, logout, OAuth |
| 👑-admin | `/add-admin`, permissões |
| 📝-cms | Salvar regras, equipe, anúncios |
| ⚠️-erros | Falhas do servidor |
| 📢-geral | Startup e eventos gerais |

## Comandos slash (servidor de suporte)

| Comando | Descrição |
|---------|-----------|
| `/add-admin usuario categoria` | Registra admin do site (`super`, `support`, `rp`, `eb`) |
| `/remove-admin usuario` | Remove da lista |
| `/list-admins` | Lista registrados |
| `/setup-logs` | Cria/garante canais de log |

Quem pode usar: **Administrador** no servidor de suporte ou admin `super`/`support` já registrado.

## Categorias no site

| Categoria | Painel |
|-----------|--------|
| **Site completo** (`super`) | Tudo |
| **Suporte central** (`support`) | Tudo + lista de admins |
| **Filial RP** (`rp`) | Regras RP, equipe RP, anúncios |
| **Filial EB** (`eb`) | Regras EB, equipe EB, anúncios |

Quem só tem Admin no Discord da rede (RP/EB) recebe `super` automaticamente até ser trocado via `/add-admin`.

## Arquivos de dados

| Arquivo | Conteúdo |
|---------|----------|
| `data/discord-channels.json` | IDs categoria + canais de log |
| `data/admins.json` | Usuários de `/add-admin` |
| `data/cms.json` | Conteúdo do site (painel) |

Faça backup na Discloud após mudanças importantes.
