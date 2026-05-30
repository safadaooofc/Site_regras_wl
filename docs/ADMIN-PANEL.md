# Painel administrativo

## Quem tem acesso

Usuário logado com Discord que tenha permissão **Administrador** em **pelo menos um** servidor da rede Reuel (RP ou EB), verificado pelo bot (`DISCORD_BOT_TOKEN`).

Override opcional no `.env`:

```env
DISCORD_ADMIN_USER_IDS=seu_id_discord,outro_id
```

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
