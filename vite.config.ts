import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/discord-api": {
        target: "https://discord.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/discord-api/, ""),
      },
    },
  },
});
