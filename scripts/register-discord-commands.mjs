import { loadEnvFile } from "./load-env.mjs";
import { registerSupportGuildCommands } from "../server/discord-bot.mjs";

loadEnvFile();

const ok = await registerSupportGuildCommands();
process.exit(ok ? 0 : 1);
