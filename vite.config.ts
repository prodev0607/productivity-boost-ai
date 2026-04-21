import { defineConfig, loadEnv, type ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import aiAssistantHandler from "./api/ai-assistant";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || env.OPENAI_API_KEY;

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      {
        name: "dev-ai-assistant-api",
        configureServer(server: ViteDevServer) {
          server.middlewares.use("/api/ai-assistant", async (req: IncomingMessage, res: ServerResponse) => {
            await aiAssistantHandler(req, res);
          });
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
  };
});
