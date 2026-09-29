import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solid()],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:3001",
      "/health": "http://127.0.0.1:3001",
    },
  },
  test: {
    environment: "happy-dom",
    environmentOptions: {
      happyDOM: {
        settings: {
          fetch: {
            // The dev app is same-origin through the Vite proxy.
            // This test process calls the API on another port.
            disableSameOriginPolicy: true,
          },
        },
      },
    },
    setupFiles: ["./src/test/setup.ts"],
  },
});
