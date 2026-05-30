import {
  addSiteAdmin,
  ADMIN_ROLE_LABELS,
  ADMIN_ROLES,
  findSiteAdmin,
  listSiteAdmins,
  removeSiteAdmin,
} from "./admin-registry.mjs";
import { getSupportGuildId } from "./discord-channels.mjs";
import { logAdmin, logError } from "./discord-logs.mjs";
import { canManageSiteAdminsDiscord } from "./discord-admin.mjs";

const INTERACTION_PONG = 1;
const INTERACTION_APPLICATION_COMMAND = 2;

function botHeaders() {
  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  return {
    Authorization: `Bot ${token}`,
    "Content-Type": "application/json",
  };
}

export function getApplicationId() {
  return process.env.DISCORD_CLIENT_ID?.trim() || "";
}

export async function registerSupportGuildCommands() {
  const appId = getApplicationId();
  const guildId = getSupportGuildId();
  const token = process.env.DISCORD_BOT_TOKEN?.trim();

  if (!appId || !guildId || !token) {
    console.warn("[discord-bot] Comandos não registrados: CLIENT_ID, SUPPORT_GUILD_ID ou BOT_TOKEN");
    return false;
  }

  const commands = [
    {
      name: "add-admin",
      description: "Concede acesso ao painel do site Reuel",
      default_member_permissions: "8",
      options: [
        {
          name: "usuario",
          description: "Membro do Discord",
          type: 6,
          required: true,
        },
        {
          name: "categoria",
          description: "Área de administração no site",
          type: 3,
          required: true,
          choices: [
            { name: "Suporte central", value: "support" },
            { name: "Site completo", value: "super" },
            { name: "Filial RP", value: "rp" },
            { name: "Filial EB", value: "eb" },
          ],
        },
      ],
    },
    {
      name: "remove-admin",
      description: "Remove acesso ao painel do site",
      default_member_permissions: "8",
      options: [
        {
          name: "usuario",
          description: "Membro a remover",
          type: 6,
          required: true,
        },
      ],
    },
    {
      name: "list-admins",
      description: "Lista admins do site registrados pelo bot",
      default_member_permissions: "8",
    },
    {
      name: "setup-logs",
      description: "Cria/atualiza canais de log do site (servidor suporte)",
      default_member_permissions: "8",
    },
  ];

  const res = await fetch(
    `https://discord.com/api/v10/applications/${appId}/guilds/${guildId}/commands`,
    {
      method: "PUT",
      headers: botHeaders(),
      body: JSON.stringify(commands),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.warn("[discord-bot] Falha ao registrar comandos:", err);
    return false;
  }

  console.log("[discord-bot] Comandos slash registrados no servidor de suporte");
  return true;
}

function interactionReply(data, status = 200) {
  return { status, data };
}

function canRunAdminCommands(actorId, guildId) {
  if (guildId !== getSupportGuildId()) {
    return { ok: false, message: "Este comando só funciona no **servidor de suporte** central." };
  }
  return { ok: true };
}

export async function handleDiscordInteraction(body) {
  if (body.type === INTERACTION_PONG) {
    return interactionReply({ type: INTERACTION_PONG });
  }

  if (body.type !== INTERACTION_APPLICATION_COMMAND) {
    return interactionReply({ type: 4, data: { content: "Comando não suportado.", flags: 64 } });
  }

  const command = body.data?.name;
  const guildId = body.guild_id;
  const actor = body.member?.user ?? body.user;
  const actorId = actor?.id;

  if (!actorId) {
    return interactionReply({ type: 4, data: { content: "Usuário não identificado.", flags: 64 } });
  }

  const guildCheck = canRunAdminCommands(actorId, guildId);
  if (!guildCheck.ok) {
    return interactionReply({ type: 4, data: { content: guildCheck.message, flags: 64 } });
  }

  const options = body.data?.options ?? [];
  const opt = (name) => options.find((o) => o.name === name)?.value;

  try {
    if (command === "setup-logs") {
      const { ensureLogChannels } = await import("./discord-channels.mjs");
      const result = await ensureLogChannels();
      if (!result.ok) {
        return interactionReply({
          type: 4,
          data: {
            content: "Configure `DISCORD_SUPPORT_GUILD_ID` e `DISCORD_BOT_TOKEN` no servidor do site.",
            flags: 64,
          },
        });
      }
      await logAdmin("Canais de log configurados", `Por <@${actorId}>`, [
        { name: "Categoria", value: result.registry?.categoryName ?? "—", inline: true },
        { name: "Criados agora", value: result.created ? "Sim" : "Não (já existiam)", inline: true },
      ]);
      return interactionReply({
        type: 4,
        data: {
          content: result.created
            ? "✅ Canais de log criados e salvos em `data/discord-channels.json`."
            : "✅ Canais de log já existiam — IDs reutilizados (sem duplicar).",
        },
      });
    }

    if (!(await canManageSiteAdminsDiscord(actorId))) {
      return interactionReply({
        type: 4,
        data: {
          content:
            "Sem permissão. Você precisa: estar em `DISCORD_ADMIN_USER_IDS`, ser **Administrador** no Discord (suporte ou filial), ou já ser admin `super`/`support` registrado.",
          flags: 64,
        },
      });
    }

    if (command === "add-admin") {
      const target = options.find((o) => o.name === "usuario")?.value;
      const role = opt("categoria");
      if (!target || !ADMIN_ROLES.includes(role)) {
        return interactionReply({ type: 4, data: { content: "Parâmetros inválidos.", flags: 64 } });
      }

      const resolved = body.data?.resolved?.users?.[target];
      addSiteAdmin({
        id: target,
        username: resolved?.username ?? null,
        globalName: resolved?.global_name ?? null,
        role,
        addedBy: actorId,
      });

      await logAdmin("Admin adicionado via Discord", `<@${target}>`, [
        { name: "Categoria", value: ADMIN_ROLE_LABELS[role] ?? role, inline: true },
        { name: "Por", value: `<@${actorId}>`, inline: true },
      ]);

      return interactionReply({
        type: 4,
        data: {
          content: `✅ <@${target}> agora é admin do site (**${ADMIN_ROLE_LABELS[role]}**).\nPeça para entrar em ${process.env.BASE_URL || "o site"}/admin após login.`,
        },
      });
    }

    if (command === "remove-admin") {
      const target = options.find((o) => o.name === "usuario")?.value;
      if (!target) {
        return interactionReply({ type: 4, data: { content: "Informe o usuário.", flags: 64 } });
      }
      const removed = removeSiteAdmin(target);
      if (removed) {
        await logAdmin("Admin removido", `<@${target}>`, [{ name: "Por", value: `<@${actorId}>` }]);
      }
      return interactionReply({
        type: 4,
        data: {
          content: removed
            ? `✅ <@${target}> removido do painel.`
            : `⚠️ <@${target}> não estava na lista de admins do site.`,
        },
      });
    }

    if (command === "list-admins") {
      const users = listSiteAdmins();
      if (users.length === 0) {
        return interactionReply({
          type: 4,
          data: { content: "Nenhum admin registrado via `/add-admin` ainda." },
        });
      }
      const lines = users.map(
        (u) =>
          `• <@${u.id}> — **${ADMIN_ROLE_LABELS[u.role] ?? u.role}** (${u.username ?? "?"})`
      );
      return interactionReply({
        type: 4,
        data: { content: `**Admins do site**\n${lines.join("\n")}`.slice(0, 2000) },
      });
    }

    return interactionReply({ type: 4, data: { content: "Comando desconhecido.", flags: 64 } });
  } catch (err) {
    console.error("[discord-bot]", err);
    await logError("Erro em comando Discord", String(err?.message ?? err));
    return interactionReply({
      type: 4,
      data: { content: "Erro interno ao processar o comando.", flags: 64 },
    });
  }
}
