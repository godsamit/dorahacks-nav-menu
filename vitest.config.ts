import { defineConfig } from "vitest/config";
import viteConfig from './vite.config';

export default defineConfig({
  ...viteConfig,
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: ["**/*.test.jsx"],
  },
});
