# Painel administrativo

> **Status:** painel em produção em [https://reueleberp.discloud.app/admin](https://reueleberp.discloud.app/admin). Projeto **praticamente encerrado** — uso contínuo para editar conteúdo (anúncios, regras, equipe). Ver [PROJETO-STATUS.md](PROJETO-STATUS.md).

## Quem tem acesso

1. **Registrado via Discord** — `/add-admin` no [servidor de suporte](https://discord.gg/bX5Ke9Qq6w) (categoria `super`, `support`, `rp` ou `eb`).  
2. **Administrador** no servidor de suporte → acesso `support`.  
3. **Administrador** em RP/EB → acesso `super` até ser ajustado com `/add-admin`.  
4. **Override** no `.env`: `DISCORD_ADMIN_USER_IDS=id1,id2`

Ver também: **[DISCORD-SUPORTE-LOGS.md](DISCORD-SUPORTE-LOGS.md)** (logs + comandos).

## URL

`/admin` — link **Painel** no menu quando você é admin.

## O que dá para fazer

| Aba | Função |
|-----|--------|
| **Anúncios** | Banners na página inicial (rede, RP ou EB) |
| **Regras RP** | Categorias e seções editáveis |
| **Regras EB** | Idem para o Exército Brasileiro |
| **Equipe** | Cargos e membros por filial |

**Salvar e publicar** grava em `data/cms.json` no servidor. O site público lê `/api/content`.

**Importar .txt** recarrega a partir de `src/content/*.txt` (útil após editar arquivos na raiz ou reset).

## Requisitos

1. `DISCORD_BOT_TOKEN` configurado (mesmo bot do auto-join).
2. Bot presente nos servidores RP e EB.
3. Login no site com conta que seja **Administrador** no Discord.

## Discloud

- Defina `DISCORD_BOT_TOKEN` e demais secrets no painel.
- A pasta `data/` pode ser recriada a cada deploy — faça backup de `cms.json` ou use **Importar .txt** + edições no painel após deploy.
- `BASE_URL` de produção deve ser a URL pública do site.

## API (referência)

| Método | Rota | Auth |
|--------|------|------|
| GET | `/api/content` | Público |
| GET | `/api/admin/cms` | Admin |
| PUT | `/api/admin/cms` | Admin |
| POST | `/api/admin/cms/import` | Admin |
