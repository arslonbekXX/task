import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  // Vite 8 resolves the `@/*` alias from tsconfig.json natively.
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    // TanStack Start must come before the React plugin.
    tanstackStart(),
    nitro(),
    viteReact(),
    tailwindcss(),
  ],
});
