import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 8844,
    strictPort: true
  },
  preview: {
    host: "127.0.0.1",
    port: 8845,
    strictPort: true
  },
  build: {
    sourcemap: true
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts"
  }
});
